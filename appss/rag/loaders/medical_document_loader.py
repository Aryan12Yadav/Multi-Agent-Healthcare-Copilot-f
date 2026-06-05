from pathlib import Path


class MedicalDocumentLoader:

    def load_documents(self, folder_path):

        documents = []

        folder = Path(folder_path)

        for file in folder.glob("*.txt"):

            content = file.read_text(
                encoding="utf-8"
            )

            documents.append(
                {
                    "file_name": file.name,
                    "content": content
                }
            )

        return documents