"""
Medical Chat Service
"""

from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)

from app.chat.builders.context_builder import (
    ContextBuilder
)

from app.chat.prompts.medical_chat_prompt import (
    MEDICAL_CHAT_PROMPT
)


class MedicalChatService:
    """
    Medical Chat Service
    """

    def __init__(self):

        self.provider = (
            DeepSeekProvider()
        )

        self.builder = (
            ContextBuilder()
        )

    def ask(
        self,
        question,
        report_data=None
    ):

        context = (
            self.builder.build(
                question=question,
                report_data=report_data
            )
        )

        prompt = (
            MEDICAL_CHAT_PROMPT
            .replace(
                "{context}",
                str(context)
            )
            .replace(
                "{question}",
                question
            )
        )

        return (
            self.provider.generate(
                prompt
            )
        )