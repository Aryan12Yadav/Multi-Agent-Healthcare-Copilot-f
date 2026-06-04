from fastapi import APIRouter

router = APIRouter(
    prefix="/pharmacy",
    tags=["Pharmacy"]
)


@router.get("/search")
def search_medicine(name: str):

    return {
        "medicine": name,
        "message": "Pharmacy agent placeholder"
    }