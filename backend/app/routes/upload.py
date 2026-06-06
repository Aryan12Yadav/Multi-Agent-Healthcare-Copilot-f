from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile
from fastapi import HTTPException

import os
import shutil

from sqlalchemy.orm import Session

from app.core.database import get_db
from app.storage.s3 import upload_file
from app.ocr.extractor import extract_text
from app.ai.analysis import analyze_document

from app.models.report import Report
from app.models.medical_finding import MedicalFinding


router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("")
def upload_report(file: UploadFile = File(...), db: Session = Depends(get_db)):

    try:

        file_path = save_temp_file(file)

        file.file.seek(0)

        s3_url = upload_file(file)

        report = Report(
            user_id=1,
            file_name=file.filename,
            local_path=file_path,
            s3_url=s3_url
        )

        db.add(report)
        db.commit()
        db.refresh(report)

        report_text = extract_text(file_path)

        print("=" * 100)
        print("OCR CHARACTERS:", len(report_text))
        print("=" * 100)
        print(report_text[:3000])
        print("=" * 100)

        report.extracted_text = report_text
        report.ocr_characters = len(report_text)

        db.commit()

        if len(report_text.strip()) < 20:

            return {
                "success": False,
                "report_id": report.id,
                "message": "OCR extraction failed",
                "ocr_characters": len(report_text),
                "ocr_preview": report_text
            }

        result = analyze_document(report_text)

        report.document_type = result.get("document_type")
        report.document_category = result.get("document_category")
        report.health_score = result.get("health_score", 0)
        report.risk_level = result.get("risk_level")
        report.is_medical_report = result.get("is_medical_report", False)
        report.analysis_json = str(result)

        db.commit()

        if result.get("is_medical_report"):

            finding = MedicalFinding(
                report_id=report.id,
                document_category=result.get("document_category") or "Unknown",
                document_type=result.get("document_type") or "Unknown",
                summary=result.get("summary", ""),
                health_score=result.get("health_score", 0),
                risk_level=result.get("risk_level") or "Unknown",
                is_medical_report=True,
                finding_json=str(result)
            )

            db.add(finding)
            db.commit()

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

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


def save_temp_file(file: UploadFile):

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path