from fastapi import APIRouter

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


@router.post("")
def ask_report(request: ReportChatRequest):

    return ReportChatService().ask(
        request.report_id,
        request.question
    )