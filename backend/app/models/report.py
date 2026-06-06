from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class Report(Base):

    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    file_name: Mapped[str] = mapped_column(String(500))

    local_path: Mapped[str] = mapped_column(String(1000))

    s3_url: Mapped[str] = mapped_column(String(1000), nullable=True)

    document_type: Mapped[str] = mapped_column(String(100), nullable=True)

    document_category: Mapped[str] = mapped_column(String(100), nullable=True)

    health_score: Mapped[int] = mapped_column(Integer, default=0)

    risk_level: Mapped[str] = mapped_column(String(50), nullable=True)

    is_medical_report: Mapped[bool] = mapped_column(default=False)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    local_path: Mapped[str] = mapped_column(String(1000), nullable=True)

    document_category: Mapped[str] = mapped_column(String(100), nullable=True)

    risk_level: Mapped[str] = mapped_column(String(50), nullable=True)

    is_medical_report: Mapped[bool] = mapped_column(default=False)

    analysis_json: Mapped[str] = mapped_column(Text, nullable=True)