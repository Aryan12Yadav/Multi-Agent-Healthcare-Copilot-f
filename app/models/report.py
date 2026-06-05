from datetime import datetime

from sqlalchemy import (
    String,
    Integer,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.database.base import Base


class Report(Base):

    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    report_name: Mapped[str] = mapped_column(
        String(255)
    )

    report_type: Mapped[str] = mapped_column(
        String(100),
        nullable=True
    )

    original_file_name: Mapped[str] = mapped_column(
        String(500)
    )

    stored_file_name: Mapped[str] = mapped_column(
        String(500)
    )

    file_path: Mapped[str] = mapped_column(
        String(1000)
    )

    file_size: Mapped[int] = mapped_column(
        Integer
    )

    mime_type: Mapped[str] = mapped_column(
        String(255)
    )

    processing_status: Mapped[str] = mapped_column(
        String(100),
        default="uploaded"
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship(
        "User",
        back_populates="reports"
    )