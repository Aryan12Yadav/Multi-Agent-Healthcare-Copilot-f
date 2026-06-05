from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
)

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
def get_dashboard(
    db: Session = Depends(
        get_db
    )
):

    report_repository = (
        ReportRepository(
            db
        )
    )

    chat_repository = (
        ChatRepository(
            db
        )
    )

    medical_repository = (
        MedicalFindingRepository(
            db
        )
    )

    service = DashboardService(
        report_repository=report_repository,
        chat_repository=chat_repository,
        medical_repository=medical_repository
    )

    return service.get_dashboard(
        user_id=1
    )