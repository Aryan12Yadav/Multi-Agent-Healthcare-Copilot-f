from sqlalchemy.orm import Session

from app.models.medical_finding import (
    MedicalFinding
)


class MedicalFindingRepository:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def create_or_update(
        self,
        finding: MedicalFinding
    ):

        existing = (
            self.get_by_report_id(
                finding.report_id
            )
        )

        if existing:

            existing.report_type = (
                finding.report_type
            )

            existing.document_category = (
                finding.document_category
            )

            existing.document_type = (
                finding.document_type
            )

            existing.is_medical_report = (
                finding.is_medical_report
            )

            existing.health_score = (
                finding.health_score
            )

            existing.risk_level = (
                finding.risk_level
            )

            existing.summary = (
                finding.summary
            )

            existing.finding_json = (
                finding.finding_json
            )

            self.db.commit()

            self.db.refresh(
                existing
            )

            return existing

        self.db.add(
            finding
        )

        self.db.commit()

        self.db.refresh(
            finding
        )

        return finding

    def get_by_report_id(
        self,
        report_id: int
    ):

        return (
            self.db.query(
                MedicalFinding
            )
            .filter(
                MedicalFinding.report_id
                == report_id
            )
            .first()
        )

    def get_analysis_count(
        self
    ) -> int:

        return (
            self.db.query(
                MedicalFinding
            )
            .count()
        )

    def get_average_health_score(
        self
    ) -> int:

        findings = (
            self.db.query(
                MedicalFinding
            )
            .all()
        )

        scores = [
            item.health_score
            for item in findings
            if item.is_medical_report
        ]

        if not scores:
            return 0

        return int(
            sum(scores)
            / len(scores)
        )