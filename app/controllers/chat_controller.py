"""
chat_controller.py
"""


class ChatController:

    def __init__(self, service):

        self.service = service

    def get_history(self, user_id):

        return self.service.get_history(user_id)

    def save_user_message(self, user_id, message):

        return self.service.save_user_message(
            user_id,
            message
        )

    def save_ai_message(self, user_id, message):

        return self.service.save_ai_message(
            user_id,
            message
        )
    
    def chat(self, user_id, question, report_id=None):

        return self.service.process_chat(
            user_id,
            question,
            report_id
        )