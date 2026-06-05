from appss.rag.chunkers.text_chunker import TextChunker
from appss.rag.embeddings.nvidia_embedding import NvidiaEmbedding
from appss.rag.vector_store.chroma_store import ChromaStore


class ReportEmbeddingWorker:

    def process(self, report_id, text):

        if not text:

            return

        chunks = TextChunker().chunk_text(
            text
        )

        if not chunks:

            return

        embeddings = NvidiaEmbedding().embed_passages(
            chunks
        )

        ChromaStore().add_chunks(
            report_id,
            chunks,
            embeddings
        )

        print(
            f"Embedded {len(chunks)} chunks for report {report_id}"
        )