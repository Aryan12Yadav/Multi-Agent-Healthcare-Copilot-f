"""
medical_finding_repository.py

Database operations
for medical findings.
"""

from app.models.medical_finding import (
    MedicalFinding
)


class MedicalFindingRepository:
    """
    Medical Finding Repository
    """

    def __init__(self, db):

        self.db = db

    def create_finding(self, finding):

        self.db.add(finding)

        self.db.commit()

        self.db.refresh(finding)

        return finding

    def get_by_report_id(self, report_id):

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

"""
Medical Finding Repository
"""


class MedicalFindingRepository:

    def __init__(self, db):

        self.db = db

    def get_analysis_count(self):

        from app.models.medical_finding import MedicalFinding

        return (
            self.db.query(
                MedicalFinding
            )
            .count()
        )