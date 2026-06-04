from app.repositories.report_repository import (
    ReportRepository
)

from app.repositories.chat_repository import (
    ChatRepository
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)


class DashboardService:

    def __init__(
        self,
        report_repository,
        chat_repository,
        medical_repository
    ):

        self.report_repository = report_repository

        self.chat_repository = chat_repository

        self.medical_repository = medical_repository

    def get_metrics(self, patient_id):

        report_count = self.report_repository.get_report_count(
            patient_id
        )

        chat_count = self.chat_repository.get_chat_count(
            patient_id
        )

        chat_count = 0

        health_score = 89
        
        analysis_count = self.medical_repository.get_analysis_count()

        health_score = max(
            0,
            100 - analysis_count
        )

        recent_reports = self.report_repository.get_recent_reports(
            patient_id
        )

        return {
            "report_count": report_count,
            "chat_count": chat_count,
            "analysis_count": analysis_count,
            "health_score": health_score,
            "recent_reports": recent_reports
        }