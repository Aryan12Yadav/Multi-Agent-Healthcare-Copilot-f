"""
ocr_service.py

OCR business logic.
"""

from app.models.ocr_text import OCRText

from app.workers.report_embedding_worker import (
    ReportEmbeddingWorker
)


class OCRService:
    """
    OCR Service
    """

    def __init__(self, repository):

        self.repository = repository

    def create_pending_record(self, report_id):

        existing = (
            self.repository
            .get_by_report_id(
                report_id
            )
        )

        if existing:

            return existing

        record = OCRText(
            report_id=report_id,
            raw_text="",
            ocr_status="pending"
        )

        return (
            self.repository
            .create_record(
                record
            )
        )