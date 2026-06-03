"""
deepseek_provider.py

Production DeepSeek Provider
"""

from openai import OpenAI

from app.core.config import settings


class DeepSeekProvider:
    """
    DeepSeek Provider

    Centralized LLM access layer.
    """

    def __init__(self):

        self.client = OpenAI(
            api_key=settings.DEEPSEEK_API_KEY,
            base_url="https://api.deepseek.com"
        )

    def generate(self, prompt):

        response = (
            self.client.chat.completions.create(
                model=settings.DEEPSEEK_MODEL,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.2
            )
        )

        return (
            response
            .choices[0]
            .message
            .content
        )