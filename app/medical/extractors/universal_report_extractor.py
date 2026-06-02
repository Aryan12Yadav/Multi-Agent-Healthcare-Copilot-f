"""
Universal Report Extractor

Converts OCR text
into structured JSON.
"""

import json


class UniversalReportExtractor:
    """
    Universal Report Extractor
    """

    def __init__(self, llm_service):

        self.llm_service = llm_service

    def extract(self, prompt):

        response = (
            self.llm_service.generate(
                prompt
            )
        )

        return json.loads(response)
    















    