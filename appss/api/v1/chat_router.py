"""
chat_router.py
"""

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from appss.database.session import get_db

from appss.repositories.chat_repository import ChatRepository

from appss.services.chat_service import ChatService

from appss.controllers.chat_controller import ChatController

from appss.schemas.chat_schema import ChatRequest


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

    controller = get_controller(
        db
    )

    answer = controller.chat(
        1,
        payload.question,
        payload.report_id
    )

    return {
        "response": answer
    }

