from appss.repositories.medical_finding_repository import MedicalFindingRepository


class ReportComparisonService:

    def __init__(self, repository):

        self.repository = repository

    def compare(self, report_a, report_b):

        findings_a = self.repository.get_by_report(
            report_a
        )

        findings_b = self.repository.get_by_report(
            report_b
        )

        return {
            "report_a": findings_a,
            "report_b": findings_b
        }