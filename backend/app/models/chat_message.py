from datetime import datetime

from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.database import Base


class ChatMessage(Base):

    __tablename__ = "chat_messages"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    question: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    answer: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )