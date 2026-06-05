from sqlalchemy.orm import Session

from app.models.ocr_text import OCRText


class OCRRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def create(
        self,
        ocr_text: OCRText
    ) -> OCRText:

        self.db.add(
            ocr_text
        )

        self.db.commit()

        self.db.refresh(
            ocr_text
        )

        return ocr_text

    def get_by_report_id(
        self,
        report_id: int
    ) -> OCRText | None:

        return (
            self.db.query(
                OCRText
            )
            .filter(
                OCRText.report_id == report_id
            )
            .first()
        )

    def create_or_update(
        self,
        report_id: int,
        raw_text: str,
        engine_name: str
    ) -> OCRText:

        existing = (
            self.get_by_report_id(
                report_id
            )
        )

        if existing:

            existing.raw_text = (
                raw_text
            )

            existing.ocr_engine = (
                engine_name
            )

            existing.ocr_status = (
                "completed"
            )

            self.db.commit()

            self.db.refresh(
                existing
            )

            return existing

        ocr_record = OCRText(
            report_id=report_id,
            raw_text=raw_text,
            ocr_engine=engine_name,
            ocr_status="completed"
        )

        return self.create(
            ocr_record
        )

    def update_status(
        self,
        report_id: int,
        status_value: str
    ) -> OCRText | None:

        record = (
            self.get_by_report_id(
                report_id
            )
        )

        if not record:
            return None

        record.ocr_status = (
            status_value
        )

        self.db.commit()

        self.db.refresh(
            record
        )

        return record