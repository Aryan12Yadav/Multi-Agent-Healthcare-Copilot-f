from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.ai.analysis import generate_health_trend


router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("")
def dashboard(db: Session = Depends(get_db)):

    reports = db.query(Report).all()

    findings = db.query(MedicalFinding).order_by(MedicalFinding.created_at).all()

    total_reports = len(reports)

    medical_reports = len([
        item
        for item in findings
        if item.is_medical_report
    ])

    average_health_score = 0

    if findings:

        average_health_score = int(
            sum(item.health_score for item in findings)
            / len(findings)
        )

    latest_health_score = 0

    if findings:

        latest_health_score = findings[-1].health_score

    high_risk_reports = len([
        item
        for item in findings
        if item.risk_level == "High"
    ])

    return {
        "total_reports": total_reports,
        "medical_reports": medical_reports,
        "average_health_score": average_health_score,
        "latest_health_score": latest_health_score,
        "high_risk_reports": high_risk_reports
    }


@router.get("/health-trends")
def health_trends(db: Session = Depends(get_db)):

    findings = db.query(MedicalFinding).order_by(MedicalFinding.created_at).all()

    scores = [
        item.health_score
        for item in findings
    ]

    return generate_health_trend(scores)


@router.get("/alerts")
def alerts(db: Session = Depends(get_db)):

    findings = db.query(MedicalFinding).all()

    alerts = []

    for item in findings:

        if item.risk_level == "High":

            alerts.append({
                "report_id": item.report_id,
                "message": "High risk report detected"
            })

    return {
        "count": len(alerts),
        "alerts": alerts
    }