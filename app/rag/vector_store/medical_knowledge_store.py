import chromadb


class MedicalKnowledgeStore:

    def __init__(self):

        client = chromadb.PersistentClient(
            path="chroma_db"
        )

        self.collection = client.get_or_create_collection(
            name="medical_knowledge"
        )

    def add_documents(self, ids, texts, embeddings):

        self.collection.add(
            ids=ids,
            documents=texts,
            embeddings=embeddings
        )

    def search(self, embedding):

        return self.collection.query(
            query_embeddings=[embedding],
            n_results=5
        )