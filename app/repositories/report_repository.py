
from sqlalchemy.orm import Session

from app.models.report import Report
from app.models.patient_profile import (
    PatientProfile
)


class ReportRepository:

    def __init__(self, db):

        self.db = db

    def create_report(self, report):

        self.db.add(report)

        self.db.commit()

        self.db.refresh(report)

        return report

    def get_reports(self, patient_id):

        return (
            self.db.query(Report)
            .filter(
                Report.patient_id == patient_id
            )
            .all()
        )

    def get_report(self, report_id):

        return (
            self.db.query(Report)
            .filter(
                Report.id == report_id
            )
            .first()
        )

    def delete_report(self, report_id):

        report = self.get_report(
            report_id
        )

        if not report:

            return False

        self.db.delete(
            report
        )

        self.db.commit()

        return True

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

    def update_status(self, report_id, status):

        report = self.get_report(
            report_id
        )

        if not report:

            return None

        report.processing_status = status

        self.db.commit()

        self.db.refresh(
            report
        )

        return report

    def get_report_count(self, patient_id):

        return (
            self.db.query(Report)
            .filter(
                Report.patient_id == patient_id
            )
            .count()
        )

    def get_recent_reports(self, patient_id):

        return (
            self.db.query(Report)
            .filter(
                Report.patient_id == patient_id
            )
            .order_by(
                Report.id.desc()
            )
            .limit(5)
            .all()
        )

