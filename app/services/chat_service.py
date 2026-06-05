from app.models.chat_message import ChatMessage

from app.repositories.chat_repository import (
    ChatRepository
)

from app.services.report_chat_service import (
    ReportChatService
)

from app.chat.services.medical_chat_service import (
    MedicalChatService
)


class ChatService:

    def __init__(
        self,
        repository: ChatRepository,
        report_chat_service: ReportChatService
    ):
        self.repository = repository

        self.report_chat_service = (
            report_chat_service
        )

        self.medical_chat_service = (
            MedicalChatService()
        )

    def get_history(
        self,
        user_id: int
    ):

        return (
            self.repository.get_history(
                user_id
            )
        )

    def save_message(
        self,
        user_id: int,
        role: str,
        message: str
    ):

        chat_message = ChatMessage(
            user_id=user_id,
            role=role,
            message=message
        )

        return (
            self.repository.create(
                chat_message
            )
        )

    def process_chat(
        self,
        user_id: int,
        question: str,
        report_id: int | None = None
    ) -> str:

        self.save_message(
            user_id=user_id,
            role="user",
            message=question
        )

        if report_id:

            response = (
                self.report_chat_service
                .ask_question(
                    report_id=report_id,
                    question=question
                )
            )

            answer = response["answer"]

        else:

            answer = (
                self.medical_chat_service
                .ask(
                    question
                )
            )

        self.save_message(
            user_id=user_id,
            role="assistant",
            message=answer
        )

        return answer