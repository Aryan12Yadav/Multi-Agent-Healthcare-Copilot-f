from app.chat.services.medical_chat_service import (
    MedicalChatService
)

from app.services.report_chat_service import (
    ReportChatService
)


class SupervisorService:

    def __init__(self):

        self.medical_chat = MedicalChatService()

        self.report_chat = ReportChatService()

    def ask(self, question, report_id=None):

        keywords = [
            "hemoglobin",
            "platelet",
            "wbc",
            "rbc",
            "cbc",
            "thyroid",
            "cholesterol",
            "report"
        ]

        question_lower = question.lower()

        is_report_question = any(
            keyword in question_lower
            for keyword in keywords
        )

        if is_report_question and report_id:

            return self.report_chat.ask(
                report_id,
                question
            )

        return {
            "response": self.medical_chat.ask(
                question
            )
        }