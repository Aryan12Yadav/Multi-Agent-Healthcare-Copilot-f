from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class MedicalFinding(Base):

    __tablename__ = "medical_findings"

    id: Mapped[int] = mapped_column(primary_key=True)

    report_id: Mapped[int] = mapped_column(ForeignKey("reports.id"))

    document_category: Mapped[str] = mapped_column(String(100))

    document_type: Mapped[str] = mapped_column(String(200))

    is_medical_report: Mapped[bool] = mapped_column(Boolean, default=False)

    health_score: Mapped[int] = mapped_column(Integer, default=0)

    risk_level: Mapped[str] = mapped_column(String(50))

    summary: Mapped[str] = mapped_column(Text)

    finding_json: Mapped[str] = mapped_column(Text)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)