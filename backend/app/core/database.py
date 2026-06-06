from pymongo import MongoClient

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import POSTGRES_URL
from app.core.config import MONGO_URL
from app.core.config import MONGO_DATABASE


engine = create_engine(
    POSTGRES_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


mongo_client = None

mongo_db = None


if MONGO_URL:

    try:

        mongo_client = MongoClient(
            MONGO_URL,
            serverSelectionTimeoutMS=5000
        )

        mongo_db = mongo_client[
            MONGO_DATABASE
        ]

    except Exception as error:

        print(
            "MongoDB Connection Error:",
            str(error)
        )


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


def get_mongo_db():

    return mongo_db