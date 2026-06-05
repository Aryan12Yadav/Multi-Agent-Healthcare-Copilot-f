"""
report.py

Stores uploaded medical report metadata.

This table acts as the central entity
for report processing, OCR extraction,
medical analysis, trend generation and
future AI workflows.

Every uploaded report must have a
corresponding database record.
"""

from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from appss.database.base import Base


class Report(Base):
    """
    Report Model

    Represents a medical report uploaded
    by a patient.

    OCR, findings, embeddings and AI
    analysis will be linked to this entity.
    """

    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patient_profiles.id")
    )

    report_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    report_type: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    original_file_name: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    stored_file_name: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    file_path: Mapped[str] = mapped_column(
        String(1000),
        nullable=False
    )

    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    mime_type: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    processing_status: Mapped[str] = mapped_column(
        String(100),
        default="uploaded"
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )