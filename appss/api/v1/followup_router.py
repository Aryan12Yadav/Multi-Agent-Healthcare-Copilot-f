from fastapi import APIRouter

router = APIRouter(
    prefix="/followup",
    tags=["Follow Up"]
)


@router.get("/{report_id}")
def followup(report_id: int):

    return {
        "report_id": report_id,
        "message": "Follow-up recommendations"
    }