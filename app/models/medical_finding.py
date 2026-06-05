
from datetime import datetime

from sqlalchemy import (
    String,
    JSON,
    DateTime,
    ForeignKey,
    Boolean,
    Integer
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.database.base import Base


class MedicalFinding(Base):

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

    document_category: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    document_type: Mapped[str] = mapped_column(
        String(200),
        nullable=True
    )

    is_medical_report: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    health_score: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    risk_level: Mapped[str] = mapped_column(
        String(50),
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

