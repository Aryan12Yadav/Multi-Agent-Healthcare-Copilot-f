from pydantic import BaseModel


class ChatRequest(BaseModel):

    question: str

    report_id: int | None = None


class ChatResponse(BaseModel):

    response: str