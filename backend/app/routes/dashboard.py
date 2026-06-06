from fastapi import APIRouter

from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.ai.analysis import generate_health_trend
from app.ai.analysis import generate_health_insights


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
def dashboard(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    findings = db.query(MedicalFinding).order_by(
        MedicalFinding.created_at
    ).all()

    average_health_score = 0

    if findings:

        average_health_score = int(
            sum(item.health_score for item in findings)
            / len(findings)
        )

    latest_health_score = (
        findings[-1].health_score
        if findings
        else 0
    )

    return {
        "total_reports": len(reports),
        "medical_reports": len([
            item
            for item in findings
            if item.is_medical_report
        ]),
        "average_health_score": average_health_score,
        "latest_health_score": latest_health_score,
        "trend": generate_health_trend(findings),
        "insights": generate_health_insights(findings)
    }