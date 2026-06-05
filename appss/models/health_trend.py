from datetime import datetime

from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String
from sqlalchemy import DateTime

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from appss.database.base import Base


class HealthTrend(Base):

    __tablename__ = "health_trends"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    patient_id: Mapped[int] = mapped_column(
        Integer
    )

    parameter_name: Mapped[str] = mapped_column(
        String(255)
    )

    value: Mapped[float] = mapped_column(
        Float
    )

    report_id: Mapped[int] = mapped_column(
        Integer
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )