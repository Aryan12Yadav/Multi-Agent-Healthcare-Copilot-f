"""
report_analysis_service.py

Coordinates complete
medical report analysis.
"""

from app.llm.providers.deepseek_provider import (
    DeepSeekProvider
)

from app.medical.extractors.universal_report_extractor import (
    UniversalReportExtractor
)


class ReportAnalysisService:
    """
    Report Analysis Service
    """

    def __init__(self):

        self.provider = (
            DeepSeekProvider()
        )

        self.extractor = (
            UniversalReportExtractor(
                self.provider
            )
        )

    def analyze_text(self, report_text):

        return (
            self.extractor.extract(
                report_text
            )
        )