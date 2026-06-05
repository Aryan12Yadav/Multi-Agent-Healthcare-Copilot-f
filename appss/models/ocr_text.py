"""
ocr_text.py

Stores OCR extracted text
for uploaded reports.

One report can have one OCR record.

Future AI analysis,
trend engine and RAG
will use this table.
"""

from datetime import datetime

from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from appss.database.base import Base


class OCRText(Base):
    """
    OCR Text Model

    Stores raw extracted text
    generated from OCR engine.
    """

    __tablename__ = "ocr_texts"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    report_id: Mapped[int] = mapped_column(
        ForeignKey("reports.id"),
        unique=True
    )

    raw_text: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    ocr_engine: Mapped[str] = mapped_column(
        String(100),
        default="paddleocr"
    )

    ocr_status: Mapped[str] = mapped_column(
        String(100),
        default="pending"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )