from fastapi import APIRouter

router = APIRouter(
    prefix="/hospital",
    tags=["Hospital"]
)


@router.get("/nearby")
def nearby_hospitals(city: str):

    return {
        "city": city,
        "message": "Hospital agent placeholder"
    }