
from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from appss.database.session import (
    get_db
)

from appss.schemas.report_chat_schema import (
    ReportChatRequest
)

from appss.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from appss.services.report_chat_service import (
    ReportChatService
)

from appss.controllers.report_chat_controller import (
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

