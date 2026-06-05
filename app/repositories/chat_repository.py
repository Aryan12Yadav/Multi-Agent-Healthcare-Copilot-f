from sqlalchemy.orm import Session

from app.models.chat_message import ChatMessage


class ChatRepository:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        message: ChatMessage
    ) -> ChatMessage:

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    def get_history(
        self,
        user_id: int
    ) -> list[ChatMessage]:

        return (
            self.db.query(ChatMessage)
            .filter(
                ChatMessage.user_id == user_id
            )
            .order_by(
                ChatMessage.created_at.asc()
            )
            .all()
        )

    def get_chat_count(
        self,
        user_id: int
    ) -> int:

        return (
            self.db.query(ChatMessage)
            .filter(
                ChatMessage.user_id == user_id
            )
            .count()
        )

    def get_recent_messages(
        self,
        user_id: int,
        limit: int = 20
    ) -> list[ChatMessage]:

        return (
            self.db.query(ChatMessage)
            .filter(
                ChatMessage.user_id == user_id
            )
            .order_by(
                ChatMessage.id.desc()
            )
            .limit(limit)
            .all()
        )