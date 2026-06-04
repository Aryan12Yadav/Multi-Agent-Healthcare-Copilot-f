class SupervisorRouter:

    def route(self, question):

        question = question.lower()

        report_keywords = [
            "report",
            "blood",
            "mri",
            "xray",
            "scan",
            "hemoglobin",
            "platelet",
            "thyroid"
        ]

        for keyword in report_keywords:

            if keyword in question:

                return "report"

        return "medical"