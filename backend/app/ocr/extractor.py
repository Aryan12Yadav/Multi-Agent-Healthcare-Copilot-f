import os

import pdfplumber

import pytesseract

from PIL import Image


def extract_text(file_path: str):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        return extract_pdf(file_path)

    if extension in [".png", ".jpg", ".jpeg"]:

        return extract_image(file_path)

    if extension == ".txt":

        return extract_txt(file_path)

    return ""


def extract_pdf(file_path: str):

    text = ""

    try:

        with pdfplumber.open(file_path) as pdf:

            for page in pdf.pages:

                page_text = page.extract_text()

                if page_text:

                    text += page_text + "\n"

        if text.strip():

            return text

    except Exception:

        pass

    return ""


def extract_image(file_path: str):

    try:

        image = Image.open(file_path)

        return pytesseract.image_to_string(image)

    except Exception:

        return ""


def extract_txt(file_path: str):

    try:

        with open(file_path, "r", encoding="utf-8") as file:

            return file.read()

    except Exception:

        return ""