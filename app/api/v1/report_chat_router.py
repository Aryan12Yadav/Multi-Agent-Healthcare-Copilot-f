from fastapi import APIRouter

from app.schemas.report_chat_schema import  ReportChatRequest



router = APIRouter(
    prefix="/report-chat",
    tags=["Report Chat"]
)


@router.post("")
def report_chat(
    request: ReportChatRequest
):

    return {
        "message":
        "Report chat endpoint ready"
    }