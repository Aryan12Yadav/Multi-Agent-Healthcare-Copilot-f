from appss.rag.retrievers.medical_retriever import (
    MedicalRetriever
)

from appss.chat.prompts.medical_chat_prompt import (
    MEDICAL_CHAT_PROMPT
)

from appss.llm.providers.deepseek_provider import (
    DeepSeekProvider
)


class MedicalChatService:

    def __init__(self):

        self.retriever = MedicalRetriever()

        self.llm = DeepSeekProvider()

    def ask(
        self,
        question
    ):

        try:

            context = self.retriever.retrieve(
                question
            )

        except Exception as error:

            print(
                "Retriever Error:",
                str(error)
            )

            context = ""

        try:

            prompt = MEDICAL_CHAT_PROMPT.format(
                context=context,
                question=question
            )

        except Exception as error:

            print(
                "Prompt Error:",
                str(error)
            )

            prompt = f"""
Question:
{question}

Answer as a helpful medical assistant.
"""

        try:

            response = self.llm.generate(
                prompt
            )

            if response:

                return response

        except Exception as error:

            print(
                "LLM Error:",
                str(error)
            )

        return (
            "I am currently unable to generate "
            "a medical response. Please try again "
            "after a few moments."
        )