from app.agents.report_agent.report_agent import ReportAgent
from app.agents.medical_agent.medical_agent import MedicalAgent

from app.agents.supervisor.router import SupervisorRouter


class SupervisorService:

    def __init__(self):

        self.router = SupervisorRouter()

        self.report_agent = ReportAgent()

        self.medical_agent = MedicalAgent()

    def ask(self, question, report_id=None):

        route = self.router.route(
            question
        )

        if route == "report":

            return self.report_agent.execute(
                report_id,
                question
            )

        return self.medical_agent.execute(
            question
        )