from app.llm.providers.deepseek_provider import DeepSeekProvider

from app.medical.prompts.report_analysis_prompt import REPORT_ANALYSIS_PROMPT

from app.utils.json_parser import JsonParser

class DocumentIntelligenceService:


    def __init__(self):

        self.provider = DeepSeekProvider()

    def analyze_document(self, report_text):

        prompt = REPORT_ANALYSIS_PROMPT.replace(
            "{report_text}",
            report_text
        )

        response = self.provider.generate(
            prompt
        )

        analysis = JsonParser.parse(
            response
        )

        if not isinstance(
            analysis,
            dict
        ):

            analysis = {
                "document_category": "other",
                "document_type": "unknown",
                "is_medical_report": False,
                "confidence": 0.0,
                "summary": str(response),
                "detailed_analysis": str(response)
            }

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
            "confidence",
            0.0
        )

        analysis.setdefault(
            "patient_information",
            {}
        )

        analysis.setdefault(
            "medical_entities",
            []
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
            "normal_findings",
            []
        )

        analysis.setdefault(
            "recommendations",
            []
        )

        analysis.setdefault(
            "followup_questions",
            []
        )

        analysis.setdefault(
            "key_observations",
            []
        )

        analysis.setdefault(
            "important_values",
            []
        )

        analysis.setdefault(
            "doctor_notes",
            []
        )

        analysis.setdefault(
            "summary",
            ""
        )

        analysis.setdefault(
            "detailed_analysis",
            ""
        )

        analysis.setdefault(
            "plain_english_explanation",
            ""
        )

        return analysis

