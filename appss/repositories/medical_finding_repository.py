
from appss.models.medical_finding import (
    MedicalFinding
)


class MedicalFindingRepository:

    def __init__(self, db):

        self.db = db

    def create_finding(
        self,
        finding
    ):

        existing = (
            self.db.query(
                MedicalFinding
            )
            .filter(
                MedicalFinding.report_id
                == finding.report_id
            )
            .first()
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
        report_id
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

    def get_by_id(
        self,
        finding_id
    ):

        return (
            self.db.query(
                MedicalFinding
            )
            .filter(
                MedicalFinding.id
                == finding_id
            )
            .first()
        )

    def get_analysis_count(
        self
    ):

        return (
            self.db.query(
                MedicalFinding
            )
            .count()
        )

    def update_finding(
        self,
        report_id,
        data
    ):

        finding = (
            self.get_by_report_id(
                report_id
            )
        )

        if not finding:

            return None

        for key, value in data.items():

            if hasattr(
                finding,
                key
            ):

                setattr(
                    finding,
                    key,
                    value
                )

        self.db.commit()

        self.db.refresh(
            finding
        )

        return finding

    def delete_finding(
        self,
        report_id
    ):

        finding = (
            self.get_by_report_id(
                report_id
            )
        )

        if not finding:

            return False

        self.db.delete(
            finding
        )

        self.db.commit()

        return True

    def get_recent_findings(
        self,
        limit=10
    ):

        return (
            self.db.query(
                MedicalFinding
            )
            .order_by(
                MedicalFinding.id.desc()
            )
            .limit(limit)
            .all()
        )

    def get_average_health_score(
        self
    ):

        findings = (
            self.db.query(
                MedicalFinding
            )
            .all()
        )

        medical_findings = [

            item.health_score

            for item in findings

            if item.is_medical_report

        ]

        if not medical_findings:

            return 0

        return int(

            sum(
                medical_findings
            )

            /

            len(
                medical_findings
            )

        )

