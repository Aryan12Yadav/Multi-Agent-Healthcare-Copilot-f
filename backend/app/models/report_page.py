from sqlalchemy import Text
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class ReportPage(Base):

    __tablename__ = "report_pages"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    report_id: Mapped[int] = mapped_column(
        ForeignKey("reports.id")
    )

    page_number: Mapped[int] = mapped_column(
        Integer
    )

    page_text: Mapped[str] = mapped_column(
        Text
    )