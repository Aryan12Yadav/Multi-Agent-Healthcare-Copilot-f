from appss.workers.report_embedding_worker import (
    ReportEmbeddingWorker
)


ReportEmbeddingWorker().process(
    1,
    """
    Hemoglobin 13.2

    Platelet 250000

    WBC 7000
    """
)

print(
    "DONE"
)