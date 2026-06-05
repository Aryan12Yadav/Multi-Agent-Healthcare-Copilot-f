from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)

from app.utils.json_parser import (
    JsonParser
)


class DocumentIntelligenceService:

    def __init__(self):

        self.provider = DeepSeekProvider()

    def analyze_document(
        self,
        report_text: str
    ) -> dict:

        prompt = f"""
You are MedSphere AI.

Analyze the uploaded document.

Tasks:

1. Detect document category.
2. Detect document type.
3. Detect if document is a medical report.
4. Extract patient information.
5. Extract diagnoses.
6. Extract medications.
7. Extract abnormal findings.
8. Extract critical findings.
9. Extract recommendations.
10. Generate summary.

Return VALID JSON only.

Document:

{report_text}
"""

        response = (
            self.provider.generate(
                prompt
            )
        )

        analysis = (
            JsonParser.parse(
                response
            )
        )

        if not isinstance(
            analysis,
            dict
        ):

            analysis = {}

        analysis.setdefault(
            "document_category",
            "other"
        )

        analysis.setdefault(
            "document_type",
            "unknown"
        )

        analysis.setdefault(
            "is_medical_report",
            False
        )

        analysis.setdefault(
            "patient_information",
            {}
        )

        analysis.setdefault(
            "diagnoses",
            []
        )

        analysis.setdefault(
            "medications",
            []
        )

        analysis.setdefault(
            "abnormal_findings",
            []
        )

        analysis.setdefault(
            "critical_findings",
            []
        )

        analysis.setdefault(
            "recommendations",
            []
        )

        analysis.setdefault(
            "summary",
            ""
        )

        return analysis