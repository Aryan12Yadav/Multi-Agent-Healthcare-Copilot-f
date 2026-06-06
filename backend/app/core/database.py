from pymongo import MongoClient

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

from app.core.config import POSTGRES_URL
from app.core.config import MONGO_URL


engine = create_engine(POSTGRES_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

mongo_client = MongoClient(MONGO_URL)

mongo_db = mongo_client["medsphere"]


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()