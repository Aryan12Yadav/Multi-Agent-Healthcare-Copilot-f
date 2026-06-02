"""
report_router.py

Report upload endpoints.
"""

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.report_repository import (
    ReportRepository
)

from app.services.report_service import (
    ReportService
)

from app.controllers.report_controller import (
    ReportController
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_controller(db):

    repository = (
        ReportRepository(db)
    )

    service = (
        ReportService(repository)
    )

    return ReportController(
        service
    )


@router.post("/upload")
def upload_report(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    controller = (
        get_controller(db)
    )

    report = (
        controller.upload_report(
            file=file,
            patient_id=1
        )
    )

    return {
        "report_id": report.id,
        "report_name": report.report_name,
        "status": report.processing_status
    }