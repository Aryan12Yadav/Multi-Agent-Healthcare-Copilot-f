from appss.rag.embeddings.nvidia_embedding import (
    NvidiaEmbedding
)

from appss.rag.vector_store.medical_knowledge_store import (
    MedicalKnowledgeStore
)


class MedicalRetriever:

    def __init__(self):

        self.embedding = NvidiaEmbedding()

        self.store = MedicalKnowledgeStore()

    def retrieve(
        self,
        question
    ):

        try:

            vector = self.embedding.embed_query(
                question
            )

            result = self.store.search(
                vector
            )

            documents = result.get(
                "documents",
                []
            )

            if not documents:

                return ""

            if not documents[0]:

                return ""

            return "\n".join(
                documents[0]
            )

        except Exception as error:

            print(
                "Retriever Error:",
                str(error)
            )

            return ""