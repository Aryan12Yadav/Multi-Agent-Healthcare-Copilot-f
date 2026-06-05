
import os
import uuid

from pathlib import Path

from appss.models.report import Report


class ReportService:

    def __init__(self, repository):

        self.repository = repository

    def upload_report(self, file, patient_id):

        storage_directory = Path("storage/reports")

        storage_directory.mkdir(
            parents=True,
            exist_ok=True
        )

        extension = os.path.splitext(
            file.filename
        )[1]

        stored_file_name = (
            f"{uuid.uuid4()}{extension}"
        )

        file_path = (
            storage_directory /
            stored_file_name
        )

        with open(file_path, "wb") as buffer:

            buffer.write(
                file.file.read()
            )

        report = Report(
            patient_id=patient_id,
            report_name=file.filename,
            report_type="unknown",
            original_file_name=file.filename,
            stored_file_name=stored_file_name,
            file_path=str(file_path),
            file_size=os.path.getsize(file_path),
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

        report = self.repository.get_report(
            report_id
        )

        if report:

            try:

                if (
                    report.file_path and
                    os.path.exists(
                        report.file_path
                    )
                ):

                    os.remove(
                        report.file_path
                    )

            except Exception:

                pass

        return self.repository.delete_report(
            report_id
        )

