"""
chat_repository.py
"""

from app.models.chat_message import ChatMessage


class ChatRepository:

    def __init__(self, db):

        self.db = db

    def create_message(self, message):

        self.db.add(message)

        self.db.commit()

        self.db.refresh(message)

        return message

    def get_messages(self, user_id):

        return (
            self.db.query(ChatMessage)
            .filter(ChatMessage.user_id == user_id)
            .order_by(ChatMessage.id.asc())
            .all()
        )