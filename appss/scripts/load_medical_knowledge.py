from appss.rag.ingestion.medical_ingestion_service import (
    MedicalIngestionService
)


if __name__ == "__main__":

    MedicalIngestionService(). ingest(
        "knowledge_base"
    )