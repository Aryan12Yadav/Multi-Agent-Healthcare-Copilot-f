from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
)

from app.controllers.chat_controller import (
    ChatController
)

from app.repositories.chat_repository import (
    ChatRepository
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from app.schemas.chat_schema import (
    ChatRequest
)

from app.services.chat_service import (
    ChatService
)

from app.services.report_chat_service import (
    ReportChatService
)


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


def get_controller(
    db: Session
) -> ChatController:

    chat_repository = (
        ChatRepository(
            db
        )
    )

    medical_repository = (
        MedicalFindingRepository(
            db
        )
    )

    report_chat_service = (
        ReportChatService(
            medical_repository
        )
    )

    chat_service = (
        ChatService(
            repository=chat_repository,
            report_chat_service=report_chat_service
        )
    )

    return ChatController(
        chat_service
    )


@router.get(
    "/history"
)
def get_history(
    db: Session = Depends(
        get_db
    )
):

    controller = (
        get_controller(
            db
        )
    )

    return (
        controller.get_history(
            user_id=1
        )
    )


@router.post("")
def chat(
    payload: ChatRequest,
    db: Session = Depends(
        get_db
    )
):

    controller = (
        get_controller(
            db
        )
    )

    answer = (
        controller.chat(
            user_id=1,
            question=payload.question,
            report_id=payload.report_id
        )
    )

    return {
        "success": True,
        "response": answer
    }