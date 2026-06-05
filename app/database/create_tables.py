from app.database.base import Base
from app.database.session import engine

# Import all models
from app.models.user import User
from app.models.report import Report
from app.models.chat_message import ChatMessage
from app.models.medical_finding import MedicalFinding


def create_tables():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    create_tables()
    print("Tables created successfully")