from langchain_text_splitters import RecursiveCharacterTextSplitter


class TextChunker:

    def chunk_text(self, text):

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=150
        )

        return splitter.split_text(text)