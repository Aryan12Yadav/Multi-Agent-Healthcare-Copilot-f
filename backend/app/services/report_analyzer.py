from app.ai.analysis import analyze_document

from app.services.document_router import DocumentRouter


class ReportAnalyzer:

    @staticmethod
    def analyze(text: str, classification: dict):

        pipeline = DocumentRouter.route(
            classification
        )

        if pipeline == "laboratory":

            return analyze_document(text)

        if pipeline == "prescription":

            return analyze_document(text)

        if pipeline == "radiology":

            return {
                "supported": False,
                "message": "Radiology vision model required"
            }

        return analyze_document(text)