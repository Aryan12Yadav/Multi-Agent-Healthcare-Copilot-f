"""
exceptions.py

Custom application exceptions.
"""


class FileValidationException(Exception):
    """
    Raised when uploaded file
    fails validation checks.
    """

    pass


class UnsupportedFileException(Exception):
    """
    Raised when unsupported
    file type is uploaded.
    """

    pass