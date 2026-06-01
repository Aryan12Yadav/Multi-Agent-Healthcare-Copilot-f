"""
doctor_profile.py

Doctor specific information.

Used when platform supports
doctor dashboard access.
"""

from sqlalchemy import String
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class DoctorProfile(Base):
    """
    Doctor Profile

    Stores doctor metadata.
    """

    __tablename__ = "doctor_profiles"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
    )

    specialization: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )

    license_number: Mapped[str] = mapped_column(
        String(255),
        nullable=True
    )