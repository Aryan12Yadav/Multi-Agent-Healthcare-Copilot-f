from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile
from fastapi import HTTPException
import json
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

# from app.services.chunk_service import ChunkService

from app.routes.auth import get_current_user


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("")
def upload_report(
    token: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:

        current_user = get_current_user(
            token,
            db
        )

        allowed_extensions = [
            ".pdf",
            ".png",
            ".jpg",
            ".jpeg",
            ".txt"
        ]

        extension = os.path.splitext(
            file.filename
        )[1].lower()

        if extension not in allowed_extensions:

            raise ValueError(
                f"Unsupported file format: {extension}"
            )

        file_path = save_temp_file(file)

        print("STEP 1 - FILE SAVED")

        file.file.seek(0)

        s3_url = upload_file(file)

        print("STEP 2 - S3 UPLOADED")

        report = Report(
            user_id=current_user.id,
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

        result = analyze_document(
            report_text
        )

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

        report.patient_name = result.get(
            "patient_name"
        )

        report.person_name = result.get(
            "person_name"
        )

        report.age = result.get(
            "age"
        )

        report.gender = result.get(
            "gender"
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

        report.structured_report = result.get(
            "structured_report"
        )

        report.abnormal_findings = json.dumps(
            result.get(
                "abnormal_findings",
                []
            )
        )

        report.critical_findings = json.dumps(
            result.get(
                "critical_findings",
                []
            )
        )

        report.recommendations = json.dumps(
            result.get(
                "recommendations",
                []
            )
        )

        report.analysis_json = json.dumps(
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

                    document_category=
                    result.get(
                        "document_category"
                    ) or "Unknown",

                    document_type=
                    result.get(
                        "document_type"
                    ) or "Unknown",

                    patient_name=
                    result.get(
                        "patient_name"
                    ) or "",

                    person_name=
                    result.get(
                        "person_name"
                    ) or "",

                    age=
                    result.get(
                        "age"
                    ) or "",

                    gender=
                    result.get(
                        "gender"
                    ) or "",

                    summary=
                    result.get(
                        "summary"
                    ) or "Analysis summary unavailable",

                    structured_report=
                    result.get(
                        "structured_report"
                    ) or "",

                    abnormal_findings=str(
                        result.get(
                            "abnormal_findings",
                            []
                        )
                    ),

                    critical_findings=str(
                        result.get(
                            "critical_findings",
                            []
                        )
                    ),

                    recommendations=str(
                        result.get(
                            "recommendations",
                            []
                        )
                    ),

                    health_score=
                    result.get(
                        "health_score",
                        0
                    ),

                    risk_level=
                    result.get(
                        "risk_level"
                    ) or "Unknown",

                    is_medical_report=True,

                    finding_json=str(
                        result
                    )
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