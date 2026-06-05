from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
)

from app.controllers.report_controller import (
    ReportController
)

from app.repositories.report_repository import (
    ReportRepository
)

from app.repositories.medical_finding_repository import (
    MedicalFindingRepository
)

from app.services.report_service import (
    ReportService
)

from app.services.ocr_service import (
    OCRService
)

from app.services.report_analysis_service import (
    ReportAnalysisService
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_controller(
    db: Session
) -> ReportController:

    repository = ReportRepository(
        db
    )

    service = ReportService(
        repository
    )

    return ReportController(
        service
    )


@router.post(
    "/upload"
)
def upload_report(
    file: UploadFile = File(...),
    db: Session = Depends(
        get_db
    )
):

    try:

        controller = (
            get_controller(
                db
            )
        )

        report = (
            controller.upload_report(
                file=file,
                user_id=1
            )
        )

        ocr_service = (
            OCRService()
        )

        report_text = (
            ocr_service.extract_text(
                report.file_path
            )
        )

        finding_repository = (
            MedicalFindingRepository(
                db
            )
        )

        analysis_service = (
            ReportAnalysisService(
                finding_repository
            )
        )

        analysis = (
            analysis_service
            .analyze_report(
                report.id,
                report_text
            )
        )

        return {
            "success": True,
            "report_id": report.id,
            "report_name": report.report_name,
            "health_score": analysis.health_score,
            "risk_level": analysis.risk_level
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


@router.get("")
def get_reports(
    db: Session = Depends(
        get_db
    )
):

    controller = (
        get_controller(
            db
        )
    )

    return (
        controller.get_reports(
            user_id=1
        )
    )


@router.get(
    "/{report_id}"
)
def get_report(
    report_id: int,
    db: Session = Depends(
        get_db
    )
):

    controller = (
        get_controller(
            db
        )
    )

    report = (
        controller.get_report(
            report_id
        )
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report


@router.delete(
    "/{report_id}"
)
def delete_report(
    report_id: int,
    db: Session = Depends(
        get_db
    )
):

    controller = (
        get_controller(
            db
        )
    )

    deleted = (
        controller.delete_report(
            report_id
        )
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "success": True,
        "message": "Report deleted"
    }


@router.get(
    "/{report_id}/analysis"
)
def get_analysis(
    report_id: int,
    db: Session = Depends(
        get_db
    )
):

    repository = (
        MedicalFindingRepository(
            db
        )
    )

    service = (
        ReportAnalysisService(
            repository
        )
    )

    result = (
        service.get_analysis(
            report_id
        )
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return result