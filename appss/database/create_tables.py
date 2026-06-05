"""
create_tables.py

Initial database table creation.

Used only before Alembic
migration workflow is introduced.
"""

from appss.database.base import Base

from appss.database.session import engine

import appss.models


def create_tables():

    Base.metadata.create_all(
        bind=engine
    )


if __name__ == "__main__":

    create_tables()