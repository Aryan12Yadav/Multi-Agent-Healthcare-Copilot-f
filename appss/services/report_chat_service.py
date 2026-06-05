
import json

from appss.llm.providers.deepseek_provider import (
    DeepSeekProvider
)


class ReportChatService:

    def __init__(
        self,
        repository
    ):

        self.repository = repository

        self.provider = (
            DeepSeekProvider()
        )

    def ask_question(
        self,
        report_id,
        question
    ):

        finding = (
            self.repository.get_by_report_id(
                report_id
            )
        )

        if not finding:

            return {
                "report_id": report_id,
                "question": question,
                "answer": (
                    "No analysis found "
                    "for this report."
                )
            }

        analysis_json = json.dumps(
            finding.finding_json,
            indent=2,
            ensure_ascii=False
        )

        prompt = f"""
You are MedSphere AI.

You are an expert healthcare assistant.

You have access to a complete
AI-generated report analysis.

Use ONLY information present
inside the report analysis.

Do not invent values.

Do not hallucinate.

If information is unavailable,
say clearly that the report
does not contain that information.

==================================
REPORT ANALYSIS
==================================

{analysis_json}

 HEALTH SCORE
 
{finding.health_score}

 
RISK LEVEL
 

{finding.risk_level}

 
USER QUESTION
 

{question}

 
INSTRUCTIONS
 

1. Answer professionally.

2. Explain medical terms
   in simple language.

3. Reference findings when relevant.

4. Reference recommendations
   when relevant.

5. Reference follow-up advice
   when relevant.

6. If document is not medical,
   explain the document instead.

7. Keep response structured.

8. If user asks for food,
   exercise, precautions or
   lifestyle guidance, provide
   practical advice based on
   available report findings.

Generate the best possible answer.
"""

        answer = (
            self.provider.generate(
                prompt
            )
        )

        return {

            "report_id":
                report_id,

            "question":
                question,

            "answer":
                answer
        }

