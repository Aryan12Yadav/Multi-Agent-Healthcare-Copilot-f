from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile
from fastapi import HTTPException

import os
import shutil
import traceback

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.storage.s3 import upload_file

from app.ocr.extractor import extract_text

from app.ai.analysis import analyze_document

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.services.chunk_service import ChunkService


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("")
def upload_report(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        file_path = save_temp_file(file)

        print("STEP 1 - FILE SAVED")

        file.file.seek(0)

        s3_url = upload_file(file)

        print("STEP 2 - S3 UPLOADED")

        report = Report(
            user_id=1,
            file_name=file.filename,
            local_path=file_path,
            s3_url=s3_url
        )

        db.add(report)

        db.commit()

        db.refresh(report)

        print("STEP 3 - REPORT CREATED")

        report_text = extract_text(
            file_path
        )

        print("STEP 4 - OCR COMPLETE")

        print("=" * 100)
        print("OCR CHARACTERS:", len(report_text))
        print("=" * 100)
        print(report_text[:3000])
        print("=" * 100)

        report.extracted_text = report_text

        report.ocr_characters = len(
            report_text
        )

        db.commit()

        if len(report_text.strip()) < 20:

            report.document_type = (
                "Unknown Image"
            )

            report.document_category = (
                "Unknown"
            )

            report.analysis_json = (
                "Limited Analysis"
            )

            db.commit()

            return {
                "success": True,
                "report_id": report.id,
                "ocr_characters": len(report_text),
                "document_type": "Unknown Image",
                "document_category": "Unknown",
                "analysis_status": "Limited",
                "message": "No readable text found. This may be a scan, MRI, CT Scan, X-Ray, Ultrasound or another image-based document.",
                "recommendation": "This platform currently analyzes text-based medical content. For radiology images or scans, please consult a qualified radiologist or specialist."
            }

        print(
            "STEP 5 - BEFORE ANALYSIS"
        )

        chunks = ChunkService.split_text(
            report_text
        )

        chunk_results = []

        for chunk in chunks:

            try:

                result = analyze_document(
                    chunk
                )

                chunk_results.append(
                    result
                )

            except Exception as error:

                print(
                    "CHUNK ANALYSIS ERROR:",
                    str(error)
                )

        if not chunk_results:

            raise Exception(
                "No chunk analysis generated"
            )

        result = chunk_results[0]

        print(
            "STEP 6 - AFTER ANALYSIS"
        )

        print(result)

        report.document_type = result.get(
            "document_type"
        )

        report.document_category = result.get(
            "document_category"
        )

        report.health_score = result.get(
            "health_score",
            0
        )

        report.risk_level = result.get(
            "risk_level"
        )

        report.is_medical_report = result.get(
            "is_medical_report",
            False
        )

        report.analysis_json = str(
            result
        )

        db.commit()

        print(
            "STEP 7 - REPORT UPDATED"
        )

        if result.get(
            "is_medical_report"
        ):

            finding = MedicalFinding(
                report_id=report.id,
                document_category=result.get(
                    "document_category"
                ) or "Unknown",
                document_type=result.get(
                    "document_type"
                ) or "Unknown",
                summary=result.get(
                    "summary",
                    ""
                ),
                health_score=result.get(
                    "health_score",
                    0
                ),
                risk_level=result.get(
                    "risk_level"
                ) or "Unknown",
                is_medical_report=True,
                finding_json=str(result)
            )

            db.add(finding)

            db.commit()

            print(
                "STEP 8 - FINDING SAVED"
            )

        return {
            "success": True,
            "report_id": report.id,
            "ocr_characters": len(report_text),
            "ocr_preview": report_text[:500],
            "document_type": result.get("document_type"),
            "document_category": result.get("document_category"),
            "is_medical_report": result.get("is_medical_report"),
            "health_score": result.get("health_score"),
            "risk_level": result.get("risk_level"),
            "summary": result.get("summary")
        }

    except ValueError as error:

        return {
            "success": False,
            "message": str(error),
            "supported_formats": [
                ".pdf",
                ".png",
                ".jpg",
                ".jpeg",
                ".txt"
            ]
        }

    except Exception as error:

        print("=" * 100)

        print("UPLOAD ERROR")

        print("=" * 100)

        traceback.print_exc()

        print("=" * 100)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


def save_temp_file(file: UploadFile):

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    file_path = os.path.join(
        "uploads",
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return file_path