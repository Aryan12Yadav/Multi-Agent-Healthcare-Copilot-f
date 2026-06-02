"""
report_service.py

Handles report related
business operations.
"""

import os
import uuid

from pathlib import Path

from app.models.report import Report

from app.core.constants import (
    ALLOWED_REPORT_EXTENSIONS
)


class ReportService:
    """
    Report Service

    Responsible for report validation,
    storage and database operations.
    """

    def __init__(self, repository):

        self.repository = repository

    def validate_file(self, file):

        extension = (
            Path(
                file.filename
            ).suffix.lower()
        )

        if extension not in ALLOWED_REPORT_EXTENSIONS:

            raise ValueError(
                "Unsupported file type."
            )

        return True

    def generate_storage_path(self, original_name):

        extension = (
            Path(
                original_name
            ).suffix
        )

        generated_name = (
            f"{uuid.uuid4()}"
            f"{extension}"
        )

        return generated_name

    def save_report_file(self, file):

        return self.generate_storage_path(
            file.filename
        )

    def upload_report(self, file, patient_id):

        self.validate_file(file)

        generated_name = (
            self.save_report_file(file)
        )

        upload_directory = (
            "storage/reports"
        )

        os.makedirs(
            upload_directory,
            exist_ok=True
        )

        file_path = (
            f"{upload_directory}/"
            f"{generated_name}"
        )

        with open(
            file_path,
            "wb"
        ) as report_file:

            report_file.write(
                file.file.read()
            )
        print("PATIENT ID:", patient_id)
        report = Report(
            patient_id=patient_id,
            report_name=file.filename,
            report_type="unknown",
            original_file_name=file.filename,
            stored_file_name=generated_name,
            file_path=file_path,
            file_size=os.path.getsize(
                file_path
            ),
            mime_type=file.content_type,
            processing_status="uploaded"
        )

        return self.repository.create_report(
            report
        )