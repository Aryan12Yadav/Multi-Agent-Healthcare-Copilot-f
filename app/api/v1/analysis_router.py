"""
analysis_router.py

Report analysis endpoints.
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"]
)


@router.get("/health")
def health():

    return {
        "message":
        "Analysis service ready"
    }