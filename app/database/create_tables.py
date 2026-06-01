"""
create_tables.py

Initial database table creation.

Used only before Alembic
migration workflow is introduced.
"""

from app.database.base import Base

from app.database.session import engine

import app.models


def create_tables():

    Base.metadata.create_all(
        bind=engine
    )


if __name__ == "__main__":

    create_tables()