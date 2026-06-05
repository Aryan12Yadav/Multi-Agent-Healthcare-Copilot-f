"""
Model imports.

Ensures SQLAlchemy
discovers all models.
"""

from appss.models.role import Role
from appss.models.user import User
from appss.models.patient_profile import PatientProfile
from appss.models.doctor_profile import DoctorProfile
from appss.models.report import Report
from appss.models.ocr_text import OCRText
from appss.models.medical_finding import MedicalFinding
from appss.models.chat_message import ChatMessage


