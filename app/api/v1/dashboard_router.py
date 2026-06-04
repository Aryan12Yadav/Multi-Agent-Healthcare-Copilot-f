"""
dashboard_router.py

Dashboard APIs.
"""

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.dashboard_service import DashboardService

from app.repositories.report_repository import ReportRepository

from app.repositories.medical_finding_repository import MedicalFindingRepository


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/metrics")
def get_metrics(db: Session = Depends(get_db)):

    report_repository = ReportRepository(db)

    analysis_repository = MedicalFindingRepository(db)

    service = DashboardService(
        report_repository,
        analysis_repository
    )

    return service.get_dashboard_metrics()