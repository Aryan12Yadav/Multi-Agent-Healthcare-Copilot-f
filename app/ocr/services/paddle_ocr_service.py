"""
Paddle OCR Service

Responsible for extracting
text from medical reports.
"""

from paddleocr import PaddleOCR


class PaddleOCRService:
    """
    OCR Engine Wrapper
    """

    def __init__(self):

        self.ocr = PaddleOCR(
            use_angle_cls=True,
            lang="en"
        )

    def extract_text(self, image_path):

        result = self.ocr.ocr(
            image_path,
            cls=True
        )

        extracted_text = ""

        for page in result:

            for line in page:

                extracted_text += (
                    line[1][0] + "\n"
                )

        return extracted_text