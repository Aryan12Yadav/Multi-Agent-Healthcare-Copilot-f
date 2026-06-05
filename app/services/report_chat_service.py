import json

from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)


class ReportChatService:

    def __init__(
        self,
        repository: MedicalFindingRepository
    ):
        self.repository = repository

        self.provider = (
            DeepSeekProvider()
        )

    def ask_question(
        self,
        report_id: int,
        question: str
    ) -> dict:

        finding = (
            self.repository
            .get_by_report_id(
                report_id
            )
        )

        if not finding:

            return {
                "report_id": report_id,
                "question": question,
                "answer": (
                    "No analysis found for "
                    "the selected report."
                )
            }

        analysis_json = json.dumps(
            finding.finding_json,
            indent=2,
            ensure_ascii=False
        )

        prompt = f"""
You are MedSphere AI.

Use ONLY the provided report analysis.

Never invent values.

If information is missing,
say that the report does not
contain that information.

REPORT ANALYSIS

{analysis_json}

HEALTH SCORE

{finding.health_score}

RISK LEVEL

{finding.risk_level}

QUESTION

{question}

Provide:

1. Direct Answer
2. Explanation
3. Medical Significance

Return a professional response.
"""

        answer = (
            self.provider.generate(
                prompt
            )
        )

        return {
            "report_id": report_id,
            "question": question,
            "answer": answer
        }