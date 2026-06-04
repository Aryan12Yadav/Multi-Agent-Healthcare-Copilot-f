from app.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from app.rag.vector_store.medical_knowledge_store import MedicalKnowledgeStore


class MedicalRetriever:

    def __init__(self):

        self.embedding = NvidiaEmbedding()

        self.store = MedicalKnowledgeStore()

    def retrieve(self, question):

        vector = self.embedding.embed_query(
            [question]
        )[0]

        result = self.store.search(
            vector
        )

        return "\n".join(
            result["documents"][0]
        )