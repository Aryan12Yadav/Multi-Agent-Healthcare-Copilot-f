
class ReportChatController:

    def __init__(self, service):

        self.service = service

    def ask_question(
        self,
        report_id,
        question
    ):

        return self.service.ask_question(
            report_id,
            question
        )
