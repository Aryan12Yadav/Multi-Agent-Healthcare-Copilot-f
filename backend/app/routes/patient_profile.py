from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.medical_finding import MedicalFinding
from app.models.patient_profile import PatientProfile

from app.ai.analysis import build_patient_profile


router = APIRouter(prefix="/patient-profile", tags=["Patient Profile"])


@router.get("")
def patient_profile(db: Session = Depends(get_db)):

    findings = db.query(MedicalFinding).all()

    report_text = ""

    for item in findings:

        report_text += item.summary + "\n"

    profile = build_patient_profile(report_text)

    return {
        "success": True,
        "profile": profile
    }