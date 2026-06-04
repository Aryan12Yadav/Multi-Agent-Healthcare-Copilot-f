from app.models.ocr_text import OCRText

from app.workers.report_embedding_worker import (
    ReportEmbeddingWorker
)


class OCRService:

    def __init__(self, repository):

        self.repository = repository

    def create_pending_record(self, report_id):

        existing = self.repository.get_by_report_id(
            report_id
        )

        if existing:

            return existing

        record = OCRText(
            report_id=report_id,
            raw_text="",
            ocr_status="pending"
        )

        return self.repository.create_record(
            record
        )

    def save_extracted_text(
        self,
        report_id,
        extracted_text
    ):

        record = self.repository.get_by_report_id(
            report_id
        )

        if not record:

            return None

        record.raw_text = extracted_text

        record.ocr_status = "completed"

        self.repository.update_record(
            record
        )

        ReportEmbeddingWorker().process(
            report_id,
            extracted_text
        )

        return record