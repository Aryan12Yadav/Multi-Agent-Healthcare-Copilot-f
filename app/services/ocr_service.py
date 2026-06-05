import os

import pdfplumber
import pytesseract

from PIL import Image

try:
    from paddleocr import PaddleOCR
except Exception:
    PaddleOCR = None


class OCRService:

    def __init__(self):

        self.paddle = None

        if PaddleOCR:

            try:

                self.paddle = PaddleOCR(
                    use_angle_cls=True,
                    lang="en"
                )

            except Exception:

                self.paddle = None

    def extract_text(
        self,
        file_path: str
    ) -> str:

        extension = (
            os.path.splitext(
                file_path
            )[1]
            .lower()
        )

        if extension == ".pdf":

            return self._extract_pdf_text(
                file_path
            )

        if extension in [
            ".png",
            ".jpg",
            ".jpeg"
        ]:

            return self._extract_image_text(
                file_path
            )

        return ""

    def _extract_pdf_text(
        self,
        file_path: str
    ) -> str:

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
                            page_text
                            + "\n"
                        )

        except Exception:

            return ""

        return extracted_text

    def _extract_image_text(
        self,
        file_path: str
    ) -> str:

        paddle_text = (
            self._extract_using_paddle(
                file_path
            )
        )

        if len(
            paddle_text.strip()
        ) > 20:

            return paddle_text

        return self._extract_using_tesseract(
            file_path
        )

    def _extract_using_tesseract(
        self,
        file_path: str
    ) -> str:

        try:

            image = Image.open(
                file_path
            )

            return (
                pytesseract
                .image_to_string(
                    image
                )
            )

        except Exception:

            return ""

    def _extract_using_paddle(
        self,
        file_path: str
    ) -> str:

        if not self.paddle:

            return ""

        try:

            result = self.paddle.ocr(
                file_path,
                cls=True
            )

            text = ""

            for page in result:

                for line in page:

                    text += (
                        line[1][0]
                        + "\n"
                    )

            return text

        except Exception:

            return ""

    def is_empty(
        self,
        text: str
    ) -> bool:

        if not text:
            return True

        if len(
            text.strip()
        ) < 20:
            return True

        return False