from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding
from app.models.patient_profile import PatientProfile

from app.ai.analysis import build_patient_profile

from app.routes.auth import get_current_user


router = APIRouter(
    prefix="/patient-profile",
    tags=["Patient Profile"]
)


@router.get("")
def patient_profile(
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    reports = (
        db.query(Report)
        .filter(
            Report.user_id == current_user.id
        )
        .all()
    )

    report_ids = [
        report.id
        for report in reports
    ]

    findings = (
        db.query(MedicalFinding)
        .filter(
            MedicalFinding.report_id.in_(
                report_ids
            )
        )
        .all()
    )

    report_text = ""

    for item in findings:

        report_text += (
            item.summary
            + "\n"
        )

    profile = build_patient_profile(
        report_text
    )

    return {
        "success": True,
        "profile": profile
    }