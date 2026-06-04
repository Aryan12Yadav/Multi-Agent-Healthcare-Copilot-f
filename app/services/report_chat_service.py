from app.rag.retrievers.report_retriever import (
    ReportRetriever
)

from app.chat.prompts.report_chat_prompt import (
    REPORT_CHAT_PROMPT
)

from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)


class ReportChatService:

    def __init__(self):

        self.retriever = ReportRetriever()

        self.llm = DeepSeekProvider()

    def ask(self, report_id, question):

        context = self.retriever.retrieve(
            report_id,
            question
        )

        prompt = REPORT_CHAT_PROMPT.format(
            context=context,
            question=question
        )

        response = self.llm.generate(
            prompt
        )

        return {
            "context": context,
            "response": response
        }