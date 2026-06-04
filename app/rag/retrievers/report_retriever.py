from app.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from app.rag.vector_store.chroma_store import ChromaStore


class ReportRetriever:

    def __init__(self):

        self.embedding = NvidiaEmbedding()

        self.store = ChromaStore()

    def retrieve(self, report_id, question):

        query_embedding = self.embedding.embed_query(
            question
        )

        result = self.store.search(
            report_id,
            query_embedding
        )

        documents = result["documents"][0]

        return "\n".join(
            documents
        )