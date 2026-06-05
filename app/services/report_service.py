import os
import uuid

from pathlib import Path

from fastapi import UploadFile

from app.core.config import settings
from app.models.report import Report
from app.repositories.report_repository import (
    ReportRepository
)


class ReportService:

    def __init__(
        self,
        repository: ReportRepository
    ):
        self.repository = repository

    def upload_report(
        self,
        file: UploadFile,
        user_id: int
    ) -> Report:

        upload_directory = Path(
            settings.UPLOAD_DIRECTORY
        )

        upload_directory.mkdir(
            parents=True,
            exist_ok=True
        )

        extension = (
            os.path.splitext(
                file.filename
            )[1]
            .lower()
        )

        stored_name = (
            f"{uuid.uuid4()}{extension}"
        )

        file_path = (
            upload_directory
            / stored_name
        )

        with open(
            file_path,
            "wb"
        ) as output_file:

            output_file.write(
                file.file.read()
            )

        report = Report(
            user_id=user_id,
            report_name=file.filename,
            report_type="unknown",
            original_file_name=file.filename,
            stored_file_name=stored_name,
            file_path=str(file_path),
            file_size=os.path.getsize(
                file_path
            ),
            mime_type=file.content_type,
            processing_status="uploaded"
        )

        return (
            self.repository.create(
                report
            )
        )

    def get_user_reports(
        self,
        user_id: int
    ):

        return (
            self.repository
            .get_user_reports(
                user_id
            )
        )

    def get_report(
        self,
        report_id: int
    ):

        return (
            self.repository
            .get_by_id(
                report_id
            )
        )

    def delete_report(
        self,
        report_id: int
    ) -> bool:

        report = (
            self.repository
            .get_by_id(
                report_id
            )
        )

        if not report:
            return False

        try:

            if (
                report.file_path
                and
                os.path.exists(
                    report.file_path
                )
            ):

                os.remove(
                    report.file_path
                )

        except Exception:
            pass

        return (
            self.repository
            .delete(
                report
            )
        )