from app.chat.services.medical_chat_service import MedicalChatService


class MedicalAgent:

    def __init__(self):

        self.service = MedicalChatService()

    def execute(self, question):

        return self.service.ask(
            question
        )