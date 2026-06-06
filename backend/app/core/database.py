from pymongo import MongoClient

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from app.core.config import POSTGRES_URL
from app.core.config import MONGO_URL
from app.core.config import MONGO_DATABASE


engine = create_engine(
    POSTGRES_URL,
    pool_pre_ping=True
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

    mongo_client = MongoClient(
        MONGO_URL
    )

    mongo_db = mongo_client[
        MONGO_DATABASE
    ]


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()


def get_mongo_db():

    return mongo_db