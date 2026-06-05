from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
)

from app.controllers.report_chat_controller import (
    ReportChatController
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from app.schemas.report_chat_schema import (
    ReportChatRequest
)

from app.services.report_chat_service import (
    ReportChatService
)


router = APIRouter(
    prefix="/report-chat",
    tags=["Report Chat"]
)


def get_controller(
    db: Session
) -> ReportChatController:

    repository = (
        MedicalFindingRepository(
            db
        )
    )

    service = (
        ReportChatService(
            repository
        )
    )

    return (
        ReportChatController(
            service
        )
    )


@router.post("")
def ask_report_question(
    payload: ReportChatRequest,
    db: Session = Depends(
        get_db
    )
):

    try:

        controller = (
            get_controller(
                db
            )
        )

        return (
            controller.ask_question(
                report_id=payload.report_id,
                question=payload.question
            )
        )

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )