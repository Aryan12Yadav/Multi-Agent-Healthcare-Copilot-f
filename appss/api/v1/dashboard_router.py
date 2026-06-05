from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from appss.database.session import get_db

from appss.repositories.report_repository import (
    ReportRepository
)

from appss.repositories.chat_repository import (
    ChatRepository
)

from appss.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from appss.services.dashboard_service import (
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