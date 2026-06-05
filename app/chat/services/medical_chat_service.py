from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)


class MedicalChatService:

    def __init__(self):

        self.llm = DeepSeekProvider()

    def ask(
        self,
        question: str
    ) -> str:

        prompt = f"""
You are MedSphere AI.

Rules:

1. Never diagnose.
2. Never claim certainty.
3. Explain in simple language.
4. Suggest consulting a doctor when needed.

Question:

{question}
"""

        return self.llm.generate(
            prompt
        )