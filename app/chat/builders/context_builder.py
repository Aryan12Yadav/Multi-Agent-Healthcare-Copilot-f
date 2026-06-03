"""
Context Builder

Creates context for
medical conversations.
"""


class ContextBuilder:
    """
    Context Builder
    """

    def build(
        self,
        question,
        report_data=None,
        history=None
    ):

        context = {}

        context["question"] = question

        context["report_data"] = (
            report_data
        )

        context["history"] = history

        return context