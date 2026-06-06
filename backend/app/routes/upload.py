import json
import tempfile

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.storage.s3 import upload_file

from app.ocr.extractor import extract_text

from app.ai.medical_content_classifier import classify_medical_content

from app.ai.universal_medical_analyzer import analyze_medical_content

from app.ai.doctor_summary import generate_doctor_summary

from app.utils.health_score import calculate_health_score


router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("")
def upload_report(file: UploadFile = File(...), db: Session = Depends(get_db)):

    try:

        temp_file = tempfile.NamedTemporaryFile(delete=False)

        temp_file.write(file.file.read())

        temp_file.close()

        local_path = temp_file.name

        s3_url = upload_file(file)

        content = extract_text(local_path)

        classification = classify_medical_content(content)

        report = Report(
            user_id=1,
            file_name=file.filename,
            local_path=local_path,
            s3_url=s3_url,
            document_category=classification.get("domain"),
            document_type=classification.get("content_type")
        )

        db.add(report)

        db.commit()

        db.refresh(report)

        if not classification.get("is_medical", False):

            report.health_score = 0

            report.risk_level = "Not Medical"

            report.is_medical_report = False

            db.commit()

            return {
                "success": True,
                "report_id": report.id,
                "is_medical": False,
                "domain": classification.get("domain"),
                "message": "Medical analysis not applicable."
            }

        analysis = analyze_medical_content(
            content=content,
            content_type=classification.get("content_type")
        )

        score = calculate_health_score({
            "is_medical_report": True,
            "abnormal_findings": analysis.get("abnormal_findings", [])
        })

        doctor_summary = generate_doctor_summary(
            document_text=content,
            analysis=analysis
        )

        report.health_score = score["health_score"]

        report.risk_level = score["risk_level"]

        report.is_medical_report = True

        report.analysis_json = json.dumps(analysis)

        finding = MedicalFinding(
            report_id=report.id,
            document_category=classification.get("domain"),
            document_type=classification.get("content_type"),
            is_medical_report=True,
            health_score=score["health_score"],
            risk_level=score["risk_level"],
            summary=analysis.get("summary"),
            finding_json=json.dumps(analysis)
        )

        db.add(finding)

        db.commit()

        return {
            "success": True,
            "report_id": report.id,
            "health_score": score["health_score"],
            "risk_level": score["risk_level"],
            "analysis": analysis,
            "doctor_summary": doctor_summary
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )