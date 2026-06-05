from fastapi import APIRouter

router = APIRouter(
    prefix="/ocr",
    tags=["OCR"]
)


@router.get("/health")
def health():

    return {
        "message": "OCR Ready"
    }