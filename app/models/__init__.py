"""
Model imports.

Ensures SQLAlchemy
discovers all models.
"""

from app.models.role import Role
from app.models.user import User
from app.models.patient_profile import PatientProfile
from app.models.doctor_profile import DoctorProfile
from app.models.report import Report
from app.models.ocr_text import OCRText
from app.models.medical_finding import MedicalFinding


