import os

import pandas as pd

import pdfplumber

import docx

import pytesseract

from PIL import Image


def extract_text(file_path: str):

    extension = os.path.splitext(file_path)[1].lower()

    if extension == ".pdf":

        return extract_pdf(file_path)

    if extension == ".docx":

        return extract_docx(file_path)

    if extension == ".txt":

        return extract_txt(file_path)

    if extension == ".csv":

        return extract_csv(file_path)

    if extension == ".xlsx":

        return extract_excel(file_path)

    if extension in [".png", ".jpg", ".jpeg"]:

        return extract_image(file_path)

    return ""


def extract_pdf(file_path: str):

    text = ""

    try:

        with pdfplumber.open(file_path) as pdf:

            for page in pdf.pages:

                page_text = page.extract_text()

                if page_text:

                    text += page_text + "\n"

    except Exception:

        pass

    return text


def extract_docx(file_path: str):

    try:

        document = docx.Document(file_path)

        return "\n".join([
            paragraph.text
            for paragraph in document.paragraphs
        ])

    except Exception:

        return ""


def extract_txt(file_path: str):

    try:

        with open(file_path, "r", encoding="utf-8") as file:

            return file.read()

    except Exception:

        return ""


def extract_csv(file_path: str):

    try:

        dataframe = pd.read_csv(file_path)

        return dataframe.to_string()

    except Exception:

        return ""


def extract_excel(file_path: str):

    try:

        dataframe = pd.read_excel(file_path)

        return dataframe.to_string()

    except Exception:

        return ""


def extract_image(file_path: str):

    try:

        image = Image.open(file_path)

        return pytesseract.image_to_string(image)

    except Exception:

        return ""