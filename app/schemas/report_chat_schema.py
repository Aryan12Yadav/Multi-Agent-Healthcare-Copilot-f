from pydantic import BaseModel

class ReportChatRequest(BaseModel):

    report_id: int

    question: str