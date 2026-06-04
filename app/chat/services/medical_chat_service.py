from app.rag.retrievers.medical_retriever import (
    MedicalRetriever
)

from app.chat.prompts.medical_chat_prompt import (
    MEDICAL_CHAT_PROMPT
)

from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)


class MedicalChatService:

    def __init__(self):

        self.retriever = MedicalRetriever()

        self.llm = DeepSeekProvider()

    def ask(self, question):

        context = self.retriever.retrieve(
            question
        )

        prompt = MEDICAL_CHAT_PROMPT.format(
            context=context,
            question=question
        )

        return self.llm.generate(
            prompt
        )