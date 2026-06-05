from appss.services.report_chat_service import ReportChatService


class ReportAgent:

    def __init__(self):

        self.service = ReportChatService()

    def execute(self, report_id, question):

        return self.service.ask(
            report_id,
            question
        )