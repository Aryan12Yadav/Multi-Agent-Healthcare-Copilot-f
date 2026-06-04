from app.rag.loaders.medical_document_loader import MedicalDocumentLoader
from app.rag.chunkers.text_chunker import TextChunker
from app.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from app.rag.vector_store.medical_knowledge_store import MedicalKnowledgeStore


class MedicalIngestionService:

    def ingest(self, folder_path):

        documents = MedicalDocumentLoader().load_documents(
            folder_path
        )

        store = MedicalKnowledgeStore()

        embedding = NvidiaEmbedding()

        chunker = TextChunker()

        counter = 0

        for document in documents:

            chunks = chunker.chunk_text(
                document["content"]
            )

            vectors = embedding.embed(
                chunks
            )

            ids = []

            for _ in chunks:

                ids.append(
                    f"medical_{counter}"
                )

                counter += 1

            store.add_documents(
                ids,
                chunks,
                vectors
            )