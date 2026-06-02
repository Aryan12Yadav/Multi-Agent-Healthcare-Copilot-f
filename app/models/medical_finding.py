"""
medical_finding.py

Stores AI generated
medical analysis results.
"""

from datetime import datetime

from sqlalchemy import (
    String,
    JSON,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.database.base import Base


class MedicalFinding(Base):
    """
    Medical Finding Model

    Stores structured analysis
    generated from OCR text.
    """

    __tablename__ = "medical_findings"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    report_id: Mapped[int] = mapped_column(
        ForeignKey("reports.id"),
        unique=True
    )

    report_type: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    summary: Mapped[str] = mapped_column(
        String,
        nullable=True
    )

    finding_json: Mapped[dict] = mapped_column(
        JSON,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )