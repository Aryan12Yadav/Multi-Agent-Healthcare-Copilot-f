"""
constants.py

Central location for application constants.

Keeping constants here avoids magic strings
throughout the codebase and improves maintainability.
"""


class Roles:
    """
    Supported user roles.

    These values are used by authentication,
    authorization and RBAC checks.
    """

    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"


class ReportTypes:
    """
    Supported medical report types.

    Future report categories should be added here.
    """

    CBC = "cbc"
    LFT = "lft"
    KFT = "kft"
    THYROID = "thyroid"
    MRI = "mri"
    CT = "ct"
    XRAY = "xray"
    ECG = "ecg"
    ULTRASOUND = "ultrasound"
    PRESCRIPTION = "prescription"


# File upload related constants

ALLOWED_REPORT_EXTENSIONS = [
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
]

ALLOWED_REPORT_MIME_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpeg",
]

MAX_REPORT_SIZE_MB = 20


# Report processing statuses

REPORT_STATUS_UPLOADED = "uploaded"
REPORT_STATUS_OCR_PENDING = "ocr_pending"
REPORT_STATUS_PROCESSING = "processing"
REPORT_STATUS_FAILED = "failed"

