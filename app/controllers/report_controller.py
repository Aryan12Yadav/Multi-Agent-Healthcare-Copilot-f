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