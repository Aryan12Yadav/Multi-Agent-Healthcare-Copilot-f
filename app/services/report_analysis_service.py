
import json

from app.models.medical_finding import MedicalFinding

from app.services.document_intelligence_service import (
    DocumentIntelligenceService
)

from app.services.health_score_service import (
    HealthScoreService
)


class ReportAnalysisService:

    def __init__(self, repository):

        self.repository = repository

        self.document_service = (
            DocumentIntelligenceService()
        )

        self.health_service = (
            HealthScoreService()
        )

    def analyze_report(
        self,
        report_id,
        report_text
    ):

        analysis = (
            self.document_service
            .analyze_document(
                report_text
            )
        )

        score_data = (
            self.health_service
            .calculate(
                analysis
            )
        )

        analysis[
            "health_score"
        ] = score_data[
            "health_score"
        ]

        analysis[
            "risk_level"
        ] = score_data[
            "risk_level"
        ]

        analysis[
            "score_breakdown"
        ] = score_data[
            "score_breakdown"
        ]

        finding = MedicalFinding(

            report_id=report_id,

            document_category=
            analysis.get(
                "document_category",
                "other"
            ),

            document_type=
            analysis.get(
                "document_type",
                "unknown"
            ),

            is_medical_report=
            analysis.get(
                "is_medical_report",
                False
            ),

            health_score=
            analysis.get(
                "health_score",
                0
            ),

            risk_level=
            analysis.get(
                "risk_level",
                "Unknown"
            ),

            report_type=
            analysis.get(
                "document_type",
                "unknown"
            ),

            summary=
            analysis.get(
                "summary",
                ""
            ),

            finding_json=analysis
        )

        return (
            self.repository
            .create_finding(
                finding
            )
        )

    def get_analysis(
        self,
        report_id
    ):

        finding = (
            self.repository
            .get_by_report_id(
                report_id
            )
        )

        if not finding:

            return None

        return {

            "report_id":
                finding.report_id,

            "document_category":
                finding.document_category,

            "document_type":
                finding.document_type,

            "is_medical_report":
                finding.is_medical_report,

            "health_score":
                finding.health_score,

            "risk_level":
                finding.risk_level,

            "summary":
                finding.summary,

            "analysis":
                finding.finding_json
        }

