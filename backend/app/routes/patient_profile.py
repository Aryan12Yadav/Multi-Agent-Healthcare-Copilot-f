from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.patient_profile import PatientProfile


router = APIRouter(prefix="/patient-profile", tags=["Patient Profile"])


@router.get("")
def get_profile(db: Session = Depends(get_db)):

    profile = db.query(PatientProfile).filter(PatientProfile.user_id == 1).first()

    return profile


@router.post("")
def save_profile(age: str, gender: str, blood_group: str, allergies: str, chronic_conditions: str, medications: str, emergency_contact: str, db: Session = Depends(get_db)):

    profile = db.query(PatientProfile).filter(PatientProfile.user_id == 1).first()

    if not profile:

        profile = PatientProfile(
            user_id=1,
            age=age,
            gender=gender,
            blood_group=blood_group,
            allergies=allergies,
            chronic_conditions=chronic_conditions,
            medications=medications,
            emergency_contact=emergency_contact
        )

        db.add(profile)

    else:

        profile.age = age
        profile.gender = gender
        profile.blood_group = blood_group
        profile.allergies = allergies
        profile.chronic_conditions = chronic_conditions
        profile.medications = medications
        profile.emergency_contact = emergency_contact

    db.commit()

    return {"success": True}