import json

from app.models.medical_finding import MedicalFinding

from app.llm.providers.deepseek_provider import DeepSeekProvider

from app.medical.prompts.report_analysis_prompt import REPORT_ANALYSIS_PROMPT

from app.utils.json_parser import JsonParser

class ReportAnalysisService:

    def __init__(self, repository):

        self.repository = repository

        self.provider = DeepSeekProvider()


    def analyze_report(self, report_id, report_text):

        prompt = REPORT_ANALYSIS_PROMPT.replace(
            "{report_text}",
            report_text
        )

        response = self.provider.generate(prompt)

        try:

            result = json.loads(response)

        except Exception:

            result = {
                "report_type": "Unknown",
                "summary": response
            }

        finding = MedicalFinding(
            report_id=report_id,
            report_type=result.get(
                "report_type",
                "Unknown"
            ),
            summary=result.get(
                "summary",
                ""
            ),
            finding_json=result
        )

        return self.repository.create_finding(finding)