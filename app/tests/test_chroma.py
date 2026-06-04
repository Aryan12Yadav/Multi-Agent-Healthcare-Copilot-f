import chromadb


client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_collection(
    "medical_reports"
)

print(
    collection.count()
)