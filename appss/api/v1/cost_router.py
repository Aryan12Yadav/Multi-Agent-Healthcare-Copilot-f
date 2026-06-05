from fastapi import APIRouter

router = APIRouter(
    prefix="/cost",
    tags=["Cost"]
)


@router.get("")
def estimate_cost(disease: str):

    return {
        "disease": disease,
        "message": "Estimated treatment cost"
    }