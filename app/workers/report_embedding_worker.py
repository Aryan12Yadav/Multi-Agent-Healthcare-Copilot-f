from app.rag.chunkers.text_chunker import TextChunker
from app.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from app.rag.vector_store.chroma_store import ChromaStore


class ReportEmbeddingWorker:

    def process(self, report_id, text):

        chunks = TextChunker().chunk_text(
            text
        )

        embeddings = NvidiaEmbedding().embed_passages(
            chunks
        )

        ChromaStore().add_chunks(
            report_id,
            chunks,
            embeddings
        )