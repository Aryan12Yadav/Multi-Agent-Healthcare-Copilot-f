"""
chat_router.py
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.chat_repository import ChatRepository

from app.services.chat_service import ChatService

from app.controllers.chat_controller import ChatController

from app.chat.services.medical_chat_service import MedicalChatService

from app.schemas.chat_schema import ChatRequest


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


def get_controller(db):

    repository = ChatRepository(db)

    service = ChatService(repository)

    return ChatController(service)


@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    controller = get_controller(db)

    return controller.get_history(1)




@router.post("")
def chat(payload: ChatRequest, db: Session = Depends(get_db)):

    repository = ChatRepository(db)

    service = ChatService(repository)

    llm_service = MedicalChatService()

    answer = llm_service.ask(
        payload.question
    )

    service.save_conversation(
        1,
        payload.question,
        answer
    )

    return {
        "response": answer
    }



