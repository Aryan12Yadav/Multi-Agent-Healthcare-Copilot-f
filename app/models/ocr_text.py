from datetime import datetime

from sqlalchemy import Text
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class OCRText(Base):

    __tablename__ = "ocr_texts"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    report_id: Mapped[int] = mapped_column(
        ForeignKey("reports.id", ondelete="CASCADE"),
        unique=True,
        nullable=False
    )

    raw_text: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    ocr_engine: Mapped[str] = mapped_column(
        String(100),
        default="hybrid"
    )

    ocr_status: Mapped[str] = mapped_column(
        String(100),
        default="pending"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    report = relationship(
        "Report",
        back_populates="ocr_text"
    )