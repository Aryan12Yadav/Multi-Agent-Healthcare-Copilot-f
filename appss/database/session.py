"""
session.py

Database engine and session configuration.

Provides reusable database sessions
throughout the application.
"""

from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker

from appss.core.config import settings


DATABASE_URL = (
    f"postgresql://"
    f"{settings.POSTGRES_USER}:"
    f"{settings.POSTGRES_PASSWORD}@"
    f"{settings.POSTGRES_HOST}:"
    f"{settings.POSTGRES_PORT}/"
    f"{settings.POSTGRES_DB}"
)


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)


def get_db():
    """
    Dependency used by FastAPI.

    Provides database session
    and ensures proper cleanup.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()