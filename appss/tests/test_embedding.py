from appss.rag.embeddings.nvidia_embedding import NvidiaEmbedding

vector = NvidiaEmbedding().embed_query(
    "What is diabetes?"
)

print(len(vector))
print(vector)