"""
base.py

Contains the declarative SQLAlchemy base.

All ORM models must inherit from this base.
"""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Root SQLAlchemy model base.

    Every database model extends this class.
    """

    pass