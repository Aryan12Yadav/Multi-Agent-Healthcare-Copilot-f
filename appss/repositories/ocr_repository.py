"""
ocr_repository.py

Database operations
for OCR records.
"""

from appss.models.ocr_text import OCRText


class OCRRepository:
    """
    OCR Repository
    """

    def __init__(self, db):

        self.db = db

    def create_record(self, record):

        self.db.add(record)

        self.db.commit()

        self.db.refresh(record)

        return record

    def get_by_report_id(self, report_id):

        return (
            self.db.query(OCRText)
            .filter(
                OCRText.report_id == report_id
            )
            .first()
        )

    def update_text(self, report_id, text):

        record = (
            self.get_by_report_id(
                report_id
            )
        )

        if not record:

            return None

        record.raw_text = text

        record.ocr_status = "completed"

        self.db.commit()

        self.db.refresh(record)

        return record
    

  