"""
NVIDIA LLM Provider

Handles all communication
with NVIDIA hosted models.
"""

from openai import OpenAI

from app.core.config import settings


class DeepSeekProvider:
    """
    NVIDIA Provider
    """

    def __init__(self):

        self.client = OpenAI(
            base_url=settings.NVIDIA_BASE_URL,
            api_key=settings.NVIDIA_API_KEY
        )

    def generate(self, prompt):

        response = self.client.chat.completions.create(
            model=settings.NVIDIA_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
            max_tokens=1500
        )

        return response.choices[0].message.content