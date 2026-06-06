from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Text
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

    local_path: Mapped[str] = mapped_column(String(1000), nullable=True)

    s3_url: Mapped[str] = mapped_column(String(1000))

    document_type: Mapped[str] = mapped_column(String(200), nullable=True)

    document_category: Mapped[str] = mapped_column(String(200), nullable=True)

    health_score: Mapped[int] = mapped_column(Integer, default=0)

    risk_level: Mapped[str] = mapped_column(String(50), nullable=True)

    is_medical_report: Mapped[bool] = mapped_column(default=False)

    extracted_text: Mapped[str] = mapped_column(Text, nullable=True)

    ocr_characters: Mapped[int] = mapped_column(Integer, default=0)

    analysis_json: Mapped[str] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)