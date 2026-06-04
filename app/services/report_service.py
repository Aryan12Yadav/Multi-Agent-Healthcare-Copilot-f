import os
import uuid

from app.models.report import Report


class ReportService:

    def __init__(self, repository):

        self.repository = repository

    def upload_report(self, file, patient_id):

        extension = os.path.splitext(
            file.filename
        )[1]

        stored_name = (
            f"{uuid.uuid4()}{extension}"
        )

        upload_path = (
            f"storage/reports/{stored_name}"
        )

        with open(upload_path, "wb") as buffer:

            buffer.write(
                file.file.read()
            )

        report = Report(
            patient_id=patient_id,
            report_name=file.filename,
            report_type="unknown",
            original_file_name=file.filename,
            stored_file_name=stored_name,
            file_path=upload_path,
            file_size=os.path.getsize(
                upload_path
            ),
            mime_type=file.content_type,
            processing_status="uploaded"
        )

        return self.repository.create_report(
            report
        )

    def get_reports(self, patient_id):

        return self.repository.get_reports(
            patient_id
        )

    def get_report(self, report_id):

        return self.repository.get_report(
            report_id
        )

    def delete_report(self, report_id):

        return self.repository.delete_report(
            report_id
        )