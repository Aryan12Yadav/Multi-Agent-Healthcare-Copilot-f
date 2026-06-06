import json


def safe_json_loads(content: str):

    try:

        return json.loads(content)

    except Exception:

        return {}