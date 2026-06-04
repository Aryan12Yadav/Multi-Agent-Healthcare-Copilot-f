"""
dashboard_service.py

Dashboard business logic.
"""


class DashboardService:

    def __init__(self, report_repository, analysis_repository):

        self.report_repository = report_repository

        self.analysis_repository = analysis_repository

    def get_dashboard_metrics(self):

        return {

            "report_count":
            self.report_repository.get_report_count(),

            "analysis_count":
            self.analysis_repository.get_analysis_count(),

            "chat_count":
            0,

            "health_score":
            85
        }