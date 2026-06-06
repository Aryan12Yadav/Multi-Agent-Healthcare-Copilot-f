class DocumentRouter:

    @staticmethod
    def route(classification: dict):

        document_type = classification.get(
            "document_type",
            ""
        ).lower()

        if "mri" in document_type:

            return "radiology"

        if "ct" in document_type:

            return "radiology"

        if "xray" in document_type:

            return "radiology"

        if "prescription" in document_type:

            return "prescription"

        if "blood" in document_type:

            return "laboratory"

        if "lab" in document_type:

            return "laboratory"

        return "general_medical"