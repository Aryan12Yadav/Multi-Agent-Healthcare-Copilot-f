from app.models.chat_message import ChatMessage


class ConversationMemoryService:

    def __init__(self, repository):

        self.repository = repository

    def save(self, user_id, role, message):

        chat = ChatMessage(
            user_id=user_id,
            role=role,
            message=message
        )

        return self.repository.create(
            chat
        )

    def history(self, user_id):

        return self.repository.get_history(
            user_id
        )