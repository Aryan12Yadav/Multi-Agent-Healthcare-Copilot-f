"""
Report Chat Service

Allows users to chat
with uploaded reports.

"""

from app.chat.services.medical_chat_service import (
    MedicalChatService
)

from app.chat.builders.report_context_builder import (
    ReportContextBuilder
)


class ReportChatService:
    """
    Report Chat Service
    """

    def __init__(self):

        self.chat_service = (
            MedicalChatService()
        )

        self.builder = (
            ReportContextBuilder()
        )

    def ask(
        self,
        question,
        report,
        ocr_text,
        findings
    ):

        context = (
            self.builder.build(
                report,
                ocr_text,
                findings
            )
        )

        return (
            self.chat_service.ask(
                question,
                context
            )
        )