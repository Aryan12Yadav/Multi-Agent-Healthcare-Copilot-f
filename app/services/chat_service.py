"""
chat_service.py
"""

from app.models.chat_message import ChatMessage


class ChatService:

    def __init__(self, repository):

        self.repository = repository

    def save_user_message(self, user_id, message):

        chat = ChatMessage(
            user_id=user_id,
            role="user",
            message=message
        )

        return self.repository.create_message(chat)

    def save_ai_message(self, user_id, message):

        chat = ChatMessage(
            user_id=user_id,
            role="assistant",
            message=message
        )

        return self.repository.create_message(chat)

    def get_history(self, user_id):

        return self.repository.get_messages(user_id)
    
    def save_conversation(self, user_id, question, answer):

        self.save_user_message(user_id, question)

        self.save_ai_message(user_id, answer)


def save_conversation(self, user_id, question, answer):

    self.save_user_message(user_id, question)

    self.save_ai_message(user_id, answer)
