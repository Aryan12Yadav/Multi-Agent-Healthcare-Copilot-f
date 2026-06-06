import json

from openai import OpenAI

from app.core.config import DEEPSEEK_API_KEY
from app.core.config import DEEPSEEK_BASE_URL
from app.core.config import DEEPSEEK_MODEL


client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)


def ask_llm(prompt: str):

    response = client.chat.completions.create(
        model=DEEPSEEK_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
        max_tokens=4000
    )

    return response.choices[0].message.content


def safe_json_loads(text: str):

    try:

        return json.loads(text)

    except Exception:

        return {}