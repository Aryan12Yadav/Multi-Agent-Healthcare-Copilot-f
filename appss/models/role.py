"""
role.py

Defines system roles available
inside MedSphere AI.

Roles are used by RBAC
(Role Based Access Control).
"""

from sqlalchemy import String

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from appss.database.base import Base


class Role(Base):
    """
    Role Model

    Stores available user roles.

    Examples:
    - patient
    - doctor
    - admin
    """

    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    name: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False
    )