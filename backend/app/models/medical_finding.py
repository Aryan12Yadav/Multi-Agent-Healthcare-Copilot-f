from datetime import datetime

from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class MedicalFinding(Base):

    __tablename__ = "medical_findings"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    report_id: Mapped[int] = mapped_column(
        ForeignKey("reports.id"),
        nullable=False,
        index=True
    )

    document_category: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    document_type: Mapped[str] = mapped_column(
        String(200),
        nullable=True
    )

    patient_name: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    person_name: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    age: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    gender: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    summary: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    structured_report: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    abnormal_findings: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    critical_findings: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    recommendations: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    health_score: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    risk_level: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    is_medical_report: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    finding_json: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )