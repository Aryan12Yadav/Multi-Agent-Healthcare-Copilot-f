import pdfplumber


class PageProcessor:

    @staticmethod
    def extract_pages(file_path: str):

        pages = []

        with pdfplumber.open(file_path) as pdf:

            for index, page in enumerate(pdf.pages):

                text = page.extract_text()

                pages.append({
                    "page_number": index + 1,
                    "page_text": text or ""
                })

        return pages