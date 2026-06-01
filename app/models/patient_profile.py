"""
patient_profile.py

Patient specific information.

Medical data should never be
stored inside User table.
"""

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class PatientProfile(Base):
    """
    Patient Profile

    Stores healthcare
    related patient data.
    """

    __tablename__ = "patient_profiles"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
    )

    age: Mapped[int] = mapped_column(
        Integer,
        nullable=True
    )

    gender: Mapped[str] = mapped_column(
        String(50),
        nullable=True
    )

    blood_group: Mapped[str] = mapped_column(
        String(20),
        nullable=True
    )