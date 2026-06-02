"""
report_repository.py

Handles all database operations
related to reports.

Repository layer should contain
database queries only.
"""

from sqlalchemy.orm import Session

from app.models.report import Report
from app.models.patient_profile import (
        PatientProfile
    )


class ReportRepository:
    """
    Report Repository

    Responsible for report related
    database interactions.
    """

    def __init__(self, db):
        self.db = db

    def create_report(self, report):

        self.db.add(report)
        print(report.patient_id)
        self.db.commit()

        self.db.refresh(report)

        return report

    def get_report_by_id(self, report_id):

        return (
            self.db.query(Report)
            .filter(
                Report.id == report_id
            )
            .first()
        )

    def get_reports_by_patient(self, patient_id):

        return (
            self.db.query(Report)
            .filter(
                Report.patient_id == patient_id
            )
            .all()
        )
    def get_patient_by_user_id(self, user_id):

     

        return (
            self.db.query(
                PatientProfile
            )
            .filter(
                PatientProfile.user_id == user_id
            )
            .first()
        )



