
"""
report_controller.py

Controller layer for reports.
"""


class ReportController:
    """
    Report Controller

    Handles communication
    between router and service.
    """

    def __init__(self, service):

        self.service = service

    def upload_report(self, file, patient_id):

        return self.service.upload_report(
            file,
            patient_id
        )

    def get_reports(self, patient_id):

        return self.service.get_reports(
            patient_id
        )

    def get_report(self, report_id):

        return self.service.get_report(
            report_id
        )

    def delete_report(self, report_id):

        return self.service.delete_report(
            report_id
        )

