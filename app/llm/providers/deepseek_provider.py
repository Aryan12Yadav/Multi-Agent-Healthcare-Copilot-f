from openai import OpenAI

from app.core.config import (
    settings
)


class DeepSeekProvider:

    def __init__(self):

        self.client = OpenAI(
            base_url=settings.NVIDIA_BASE_URL,
            api_key=settings.NVIDIA_API_KEY
        )

        self.model = (
            settings.NVIDIA_MODEL
        )

    def generate(
        self,
        prompt: str
    ) -> str:

        try:

            response = (
                self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    temperature=0.2,
                    max_tokens=1500
                )
            )

            return (
                response
                .choices[0]
                .message
                .content
            )

        except Exception as error:

            print(
                "DeepSeek Error:",
                str(error)
            )

            return (
                "Unable to generate response."
            )