from app.services.report_chat_service import (
    ReportChatService
)


class ReportChatController:

    def __init__(
        self,
        service: ReportChatService
    ):
        self.service = service

    def ask_question(
        self,
        report_id: int,
        question: str
    ):

        return (
            self.service.ask_question(
                report_id=report_id,
                question=question
            )
        )