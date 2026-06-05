from sqlalchemy.orm import Session

from app.models.report import Report


class ReportRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def create(
        self,
        report: Report
    ) -> Report:

        self.db.add(
            report
        )

        self.db.commit()

        self.db.refresh(
            report
        )

        return report

    def get_by_id(
        self,
        report_id: int
    ) -> Report | None:

        return (
            self.db.query(
                Report
            )
            .filter(
                Report.id == report_id
            )
            .first()
        )

    def get_user_reports(
        self,
        user_id: int
    ):

        return (
            self.db.query(
                Report
            )
            .filter(
                Report.user_id == user_id
            )
            .order_by(
                Report.id.desc()
            )
            .all()
        )

    def delete(
        self,
        report: Report
    ) -> bool:

        self.db.delete(
            report
        )

        self.db.commit()

        return True

    def get_report_count(
        self,
        user_id: int
    ) -> int:

        return (
            self.db.query(
                Report
            )
            .filter(
                Report.user_id == user_id
            )
            .count()
        )

    def get_recent_reports(
        self,
        user_id: int,
        limit: int = 5
    ):

        return (
            self.db.query(
                Report
            )
            .filter(
                Report.user_id == user_id
            )
            .order_by(
                Report.id.desc()
            )
            .limit(
                limit
            )
            .all()
        )