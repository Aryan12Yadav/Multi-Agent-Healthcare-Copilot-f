
import os

import pdfplumber

import pytesseract

from PIL import Image


class OCRService:

    def __init__(self):

        pass

    def extract_text(
        self,
        file_path
    ):

        extension = os.path.splitext(
            file_path
        )[1].lower()

        if extension == ".pdf":

            return self.extract_pdf_text(
                file_path
            )

        if extension in [
            ".png",
            ".jpg",
            ".jpeg"
        ]:

            return self.extract_image_text(
                file_path
            )

        return ""

    def extract_pdf_text(
        self,
        file_path
    ):

        extracted_text = ""

        try:

            with pdfplumber.open(
                file_path
            ) as pdf:

                for page in pdf.pages:

                    page_text = (
                        page.extract_text()
                    )

                    if page_text:

                        extracted_text += (
                            page_text + "\n"
                        )

        except Exception as error:

            print(
                "PDF OCR Error:",
                str(error)
            )

        return extracted_text

    def extract_image_text(
        self,
        file_path
    ):

        try:

            image = Image.open(
                file_path
            )

            text = pytesseract.image_to_string(
                image
            )

            return text

        except Exception as error:

            print(
                "Image OCR Error:",
                str(error)
            )

            return ""

    def is_empty_text(
        self,
        text
    ):

        if not text:

            return True

        if len(
            text.strip()
        ) < 20:

            return True

        return False

