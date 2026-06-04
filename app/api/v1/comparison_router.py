from fastapi import APIRouter

from app.services.report_comparison_service import (
    ReportComparisonService
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

router = APIRouter(
    prefix="/comparison",
    tags=["Comparison"]
)


@router.get("")
def compare_reports(report_a: int, report_b: int):

    service = ReportComparisonService(
        MedicalFindingRepository(None)
    )

    return service.compare(
        report_a,
        report_b
    )