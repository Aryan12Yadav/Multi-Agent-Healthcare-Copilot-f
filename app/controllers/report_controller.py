from app.services.report_service import (
    ReportService
)


class ReportController:

    def __init__(
        self,
        service: ReportService
    ):
        self.service = service

    def upload_report(
        self,
        file,
        user_id: int
    ):

        return (
            self.service.upload_report(
                file=file,
                user_id=user_id
            )
        )

    def get_reports(
        self,
        user_id: int
    ):

        return (
            self.service.get_user_reports(
                user_id
            )
        )

    def get_report(
        self,
        report_id: int
    ):

        return (
            self.service.get_report(
                report_id
            )
        )

    def delete_report(
        self,
        report_id: int
    ):

        return (
            self.service.delete_report(
                report_id
            )
        )