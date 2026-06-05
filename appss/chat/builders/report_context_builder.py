"""
Report Context Builder

Builds report specific
context for chat.
"""


class ReportContextBuilder:
    
    """
    Report Context Builder
    """

    def build(
        self,
        report,
        ocr_text,
        findings
    ):

        return {

            "report": report,

            "ocr_text": ocr_text,

            "findings": findings
        }