import os

import pdfplumber

import pytesseract

from PIL import Image


SUPPORTED_EXTENSIONS = [
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".txt"
]


def extract_text(file_path: str):

    extension = os.path.splitext(
        file_path
    )[1].lower()

    print(
        "OCR FILE:",
        file_path
    )

    print(
        "FILE TYPE:",
        extension
    )

    if extension not in SUPPORTED_EXTENSIONS:

        raise ValueError(
            f"Unsupported file type: {extension}"
        )

    if extension == ".pdf":

        return extract_pdf(file_path)

    if extension in [
        ".png",
        ".jpg",
        ".jpeg"
    ]:

        return extract_image(file_path)

    if extension == ".txt":

        return extract_txt(file_path)

    return ""


def extract_pdf(file_path: str):

    text = ""

    try:

        with pdfplumber.open(file_path) as pdf:

            print(
                "PDF PAGES:",
                len(pdf.pages)
            )

            for page_number, page in enumerate(pdf.pages):

                try:

                    page_text = page.extract_text()

                    if page_text:

                        text += (
                            page_text
                            + "\n"
                        )

                except Exception as error:

                    print(
                        "PDF PAGE ERROR:",
                        page_number + 1,
                        str(error)
                    )

        if text.strip():

            print(
                "PDF TEXT EXTRACTION SUCCESS"
            )

            return text

        print(
            "PDF CONTAINS NO EXTRACTABLE TEXT"
        )

        return ""

    except Exception as error:

        print(
            "PDF OCR ERROR:",
            str(error)
        )

        return ""


def extract_image(file_path: str):

    try:

        image = Image.open(
            file_path
        )

        text = pytesseract.image_to_string(
            image
        )

        print(
            "IMAGE OCR CHARACTERS:",
            len(text)
        )

        return text

    except Exception as error:

        print(
            "IMAGE OCR ERROR:",
            str(error)
        )

        return ""


def extract_txt(file_path: str):

    try:

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            text = file.read()

            print(
                "TXT CHARACTERS:",
                len(text)
            )

            return text

    except Exception as error:

        print(
            "TXT READ ERROR:",
            str(error)
        )

        return ""