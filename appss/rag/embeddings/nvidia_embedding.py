import requests

from appss.core.config import settings


class NvidiaEmbedding:

    def embed_query(self, query):

        response = requests.post(
            f"{settings.EMBEDDING_BASE_URL}/embeddings",
            headers={
                "Authorization": f"Bearer {settings.EMBEDDING_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": settings.EMBEDDING_MODEL,
                "input": [query],
                "input_type": "query"
            },
            timeout=60
        )

        print(
            "EMBED STATUS:",
            response.status_code
        )

        print(
            "EMBED RESPONSE:",
            response.text
        )

        response.raise_for_status()

        data = response.json()

        return data["data"][0]["embedding"]

    def embed_passages(self, texts):

        response = requests.post(
            f"{settings.EMBEDDING_BASE_URL}/embeddings",
            headers={
                "Authorization": f"Bearer {settings.EMBEDDING_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": settings.EMBEDDING_MODEL,
                "input": texts,
                "input_type": "passage"
            },
            timeout=60
        )

        print(
            "PASSAGE STATUS:",
            response.status_code
        )

        print(
            "PASSAGE RESPONSE:",
            response.text
        )

        response.raise_for_status()

        data = response.json()

        return [
            item["embedding"]
            for item in data["data"]
        ]