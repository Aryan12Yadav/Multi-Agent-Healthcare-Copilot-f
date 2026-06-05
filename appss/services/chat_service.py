from appss.models.chat_message import ChatMessage

from appss.services.supervisor_service import (
    SupervisorService
)


class ChatService:

    def __init__(self, repository):

        self.repository = repository

    def save_user_message(
        self,
        user_id,
        message
    ):

        chat = ChatMessage(
            user_id=user_id,
            role="user",
            message=message
        )

        return self.repository.create(
            chat
        )

    def save_ai_message(
        self,
        user_id,
        message
    ):

        chat = ChatMessage(
            user_id=user_id,
            role="assistant",
            message=message
        )

        return self.repository.create(
            chat
        )

    def get_history(
        self,
        user_id
    ):

        return self.repository.get_history(
            user_id
        )

    def save_conversation(
        self,
        user_id,
        question,
        answer
    ):

        self.save_user_message(
            user_id,
            question
        )

        self.save_ai_message(
            user_id,
            answer
        )

    def process_chat(
        self,
        user_id,
        question,
        report_id=None
    ):

        response = SupervisorService().ask(
            question,
            report_id
        )

        answer = (
            response["response"]
            if isinstance(response, dict)
            else response
        )

        self.save_conversation(
            user_id,
            question,
            answer
        )

        return answer