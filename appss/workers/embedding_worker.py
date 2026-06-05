from appss.rag.chunkers.text_chunker import TextChunker
from appss.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from appss.rag.vector_store.chroma_store import ChromaStore


class EmbeddingWorker:

    def process_report(self, report_id, text):

        chunks = TextChunker().chunk_text(text)

        embeddings = NvidiaEmbedding().embed(
            chunks
        )

        ChromaStore().add_chunks(
            report_id,
            chunks,
            embeddings
        )