import chromadb


class ChromaStore:

    def __init__(self):

        client = chromadb.PersistentClient(
            path="chroma_db"
        )

        self.collection = client.get_or_create_collection(
            name="medical_reports"
        )

    def add_chunks(self, report_id, chunks, embeddings):

        ids = [
            f"report_{report_id}_{index}"
            for index in range(len(chunks))
        ]

        metadatas = [
            {
                "report_id": str(report_id)
            }
            for _ in chunks
        ]

        self.collection.add(
            ids=ids,
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadatas
        )

    def search(self, report_id, query_embedding):

        result = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=5,
            where={
                "report_id": str(report_id)
            }
        )

        return result