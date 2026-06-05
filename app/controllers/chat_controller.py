from app.services.chat_service import (
    ChatService
)


class ChatController:

    def __init__(
        self,
        service: ChatService
    ):
        self.service = service

    def get_history(
        self,
        user_id: int
    ):

        return (
            self.service.get_history(
                user_id
            )
        )

    def chat(
        self,
        user_id: int,
        question: str,
        report_id: int | None = None
    ):

        return (
            self.service.process_chat(
                user_id=user_id,
                question=question,
                report_id=report_id
            )
        )