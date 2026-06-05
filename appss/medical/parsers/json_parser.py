"""
JSON Parser

Extract JSON from
LLM responses.
"""

import json
import re


class JsonParser:

    @staticmethod
    def parse(text):

        try:

            return json.loads(text)

        except Exception:

            match = re.search(
                r"\{.*\}",
                text,
                re.DOTALL
            )

            if not match:

                return {
                    "raw_response": text
                }

            try:

                return json.loads(
                    match.group()
                )

            except Exception:

                return {
                    "raw_response": text
                }