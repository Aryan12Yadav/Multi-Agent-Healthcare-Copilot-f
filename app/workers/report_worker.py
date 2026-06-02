"""
Report Worker

Responsible for processing
uploaded reports.
"""

from app.repositories.report_repository import (
    ReportRepository
)

from app.repositories.ocr_repository import (
    OCRRepository
)

from app.services.ocr_service import (
    OCRService
)

from app.ocr.services.paddle_ocr_service import (
    PaddleOCRService
)


class ReportWorker:
    """
    Report Processing Worker
    """

    def __init__(self, db):

        self.db = db

        self.report_repository = (
            ReportRepository(db)
        )

        self.ocr_repository = (
            OCRRepository(db)
        )

        self.ocr_service = (
            OCRService(
                self.ocr_repository
            )
        )

        self.paddle_service = (
            PaddleOCRService()
        )

    def process_report(self, report_id):

        report = (
            self.report_repository
            .get_report_by_id(
                report_id
            )
        )

        if not report:

            raise ValueError(
                "Report not found."
            )

        text = (
            self.paddle_service
            .extract_text(
                report.file_path
            )
        )

        self.ocr_service.update_text(
            report_id,
            text
        )

        return text