from appss.rag.embeddings.nvidia_embedding import NvidiaEmbedding

embedding = NvidiaEmbedding()

result = embedding.embed_query(
    "What is diabetes?"
)

print(
    len(result)
)