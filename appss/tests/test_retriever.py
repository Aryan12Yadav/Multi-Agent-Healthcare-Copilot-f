from appss.rag.retrievers.report_retriever import (
    ReportRetriever
)


context = ReportRetriever().retrieve(
    1,
    "What is hemoglobin?"
)

print(
    context
)