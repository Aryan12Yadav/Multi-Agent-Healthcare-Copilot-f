"""
deepseek_provider.py

Wrapper around DeepSeek API.

All LLM communication
must go through this layer.

"""

import json

class DeepSeekProvider:
    """
    DeepSeek Provider

    Handles communication
    with DeepSeek models.
    """

    def __init__(self):

        pass

    def generate(self, prompt):

        """
        Temporary mock response.

        Replace with actual
        API integration later.
        """

        return json.dumps(
            {
                "report_type": "Unknown",
                "patient_friendly_summary":
                "Analysis pending.",
                "findings": [],
                "measurements": [],
                "abnormalities": [],
                "recommendations": []
            }
        )