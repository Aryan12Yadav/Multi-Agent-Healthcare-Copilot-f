
from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends
)

from sqlalchemy.orm import Session

from app.database.session import (
    get_db
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

from app.services.report_analysis_service import (
    ReportAnalysisService
)

from app.controllers.report_controller import (
    ReportController
)

# Replace with your OCR service
from app.services.ocr_service import (
    OCRService
)


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


def get_controller(db):

    repository = ReportRepository(
        db
    )

    service = ReportService(
        repository
    )

    return ReportController(
        service
    )


@router.post("/upload")
def upload_report(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    controller = get_controller(
        db
    )

    report = controller.upload_report(
        file=file,
        patient_id=1
    )

    try:

        ocr_service = OCRService()

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

        analysis_result = (
            analysis_service
            .analyze_report(
                report.id,
                report_text
            )
        )

        return {

            "success": True,

            "report_id":
                report.id,

            "report_name":
                report.report_name,

            "processing_status":
                report.processing_status,

            "analysis_generated":
                True,

            "document_type":
                analysis_result.document_type,

            "health_score":
                analysis_result.health_score,

            "risk_level":
                analysis_result.risk_level
        }

    except Exception as error:

        print(
            "Analysis Error:",
            str(error)
        )

        return {

            "success": True,

            "report_id":
                report.id,

            "report_name":
                report.report_name,

            "processing_status":
                report.processing_status,

            "analysis_generated":
                False,

            "error":
                str(error)
        }


@router.get("")
def get_reports(
    db: Session = Depends(get_db)
):

    controller = get_controller(
        db
    )

    return controller.get_reports(
        patient_id=1
    )


@router.get("/{report_id}")
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    controller = get_controller(
        db
    )

    return controller.get_report(
        report_id
    )


@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db)
):

    controller = get_controller(
        db
    )

    controller.delete_report(
        report_id
    )

    return {
        "message":
        "deleted"
    }


@router.get("/{report_id}/analysis")
def get_analysis(
    report_id: int,
    db: Session = Depends(get_db)
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

    result = service.get_analysis(
        report_id
    )

    if not result:

        return {
            "message":
            "Analysis not found"
        }

    return result

