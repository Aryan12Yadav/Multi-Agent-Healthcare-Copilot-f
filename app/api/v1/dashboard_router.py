from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.report_repository import (
    ReportRepository
)

from app.repositories.chat_repository import (
    ChatRepository
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from app.services.dashboard_service import (
    DashboardService
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def dashboard(db: Session = Depends(get_db)):

    service = DashboardService(
        ReportRepository(db),
        ChatRepository(db),
        MedicalFindingRepository(db)
    )

    return service.get_metrics(
        1
    )