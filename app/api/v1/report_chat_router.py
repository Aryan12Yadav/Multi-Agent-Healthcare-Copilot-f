
from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
)

from app.schemas.report_chat_schema import (
    ReportChatRequest
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from app.services.report_chat_service import (
    ReportChatService
)

from app.controllers.report_chat_controller import (
    ReportChatController
)


router = APIRouter(
    prefix="/report-chat",
    tags=["Report Chat"]
)


def get_controller(db):

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

    return ReportChatController(
        service
    )


@router.post("")
def ask_report(
    request: ReportChatRequest,
    db: Session = Depends(get_db)
):

    controller = get_controller(
        db
    )

    return controller.ask_question(
        request.report_id,
        request.question
    )

