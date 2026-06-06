class ChunkService:

    @staticmethod
    def split_text(text: str, chunk_size: int = 4000):

        if not text:

            return []

        chunks = []

        start = 0

        while start < len(text):

            chunks.append(
                text[start:start + chunk_size]
            )

            start += chunk_size

        return chunks