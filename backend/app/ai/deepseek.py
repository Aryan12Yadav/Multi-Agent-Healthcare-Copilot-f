from openai import OpenAI

from app.core.config import DEEPSEEK_API_KEY


client = OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url="https://integrate.api.nvidia.com/v1"
)


def ask_llm(prompt: str):

    response = client.chat.completions.create(
        model="meta/llama-3.3-70b-instruct",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1,
        max_tokens=4000
    )

    return response.choices[0].message.content