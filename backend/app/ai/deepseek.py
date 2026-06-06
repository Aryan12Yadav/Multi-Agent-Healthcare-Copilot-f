import json
import re

from openai import OpenAI

from app.core.config import DEEPSEEK_API_KEY
from app.core.config import DEEPSEEK_BASE_URL
from app.core.config import DEEPSEEK_MODEL


client = OpenAI(
    api_key=DEEPSEEK_API_KEY,
    base_url=DEEPSEEK_BASE_URL
)


def ask_llm(prompt: str):

    try:

        response = client.chat.completions.create(
            model=DEEPSEEK_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.1,
            max_tokens=4000
        )

        content = response.choices[0].message.content

        if not content:

            return "{}"

        return content

    except Exception as error:

        print(
            "DEEPSEEK ERROR:",
            str(error)
        )

        return "{}"


def extract_json(text: str):

    if not text:

        return "{}"

    text = text.strip()

    text = text.replace(
        "```json",
        ""
    )

    text = text.replace(
        "```",
        ""
    )

    match = re.search(
        r"\{.*\}",
        text,
        re.DOTALL
    )

    if match:

        return match.group()

    return "{}"


def safe_json_loads(text: str):

    try:

        return json.loads(text)

    except Exception:

        pass

    try:

        cleaned_json = extract_json(
            text
        )

        return json.loads(
            cleaned_json
        )

    except Exception as error:

        print(
            "JSON PARSE ERROR:",
            str(error)
        )

        return {}