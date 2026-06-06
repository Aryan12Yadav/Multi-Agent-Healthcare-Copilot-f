from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class PatientProfile(Base):

    __tablename__ = "patient_profiles"

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    age: Mapped[str] = mapped_column(String(20), nullable=True)

    gender: Mapped[str] = mapped_column(String(20), nullable=True)

    blood_group: Mapped[str] = mapped_column(String(20), nullable=True)

    allergies: Mapped[str] = mapped_column(Text, nullable=True)

    chronic_conditions: Mapped[str] = mapped_column(Text, nullable=True)

    medications: Mapped[str] = mapped_column(Text, nullable=True)

    emergency_contact: Mapped[str] = mapped_column(String(100), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)