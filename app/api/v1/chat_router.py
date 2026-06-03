from fastapi import APIRouter

from app.schemas.chat_schema import (
    ChatRequest
)

from app.chat.services.medical_chat_service import (
    MedicalChatService
)

router = APIRouter(
    prefix="/chat",
    tags=["Medical Chat"]
)


@router.post("")
def chat(request: ChatRequest):

    service = (
        MedicalChatService()
    )

    response = (
        service.ask(
            request.question
        )
    )

    return {
        "response": response
    }