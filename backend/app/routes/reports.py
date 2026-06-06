from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.ai.analysis import compare_reports

from app.routes.auth import get_current_user


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("")
def get_reports(
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    reports = (
        db.query(Report)
        .filter(
            Report.user_id == current_user.id
        )
        .order_by(
            Report.created_at.desc()
        )
        .all()
    )

    report_list = []

    for report in reports:

        report_list.append(
            {
                "id": report.id,
                "file_name": report.file_name,
                "document_type": report.document_type,
                "document_category": report.document_category,
                "health_score": report.health_score,
                "risk_level": report.risk_level,
                "is_medical_report": report.is_medical_report,
                "created_at": report.created_at
            }
        )

    return {
        "success": True,
        "count": len(report_list),
        "reports": report_list
    }


@router.get("/{report_id}")
def get_report(
    report_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    report = (
        db.query(Report)
        .filter(
            Report.id == report_id,
            Report.user_id == current_user.id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "success": True,
        "report": {
            "id": report.id,
            "file_name": report.file_name,
            "local_path": report.local_path,
            "s3_url": report.s3_url,
            "document_type": report.document_type,
            "document_category": report.document_category,
            "health_score": report.health_score,
            "risk_level": report.risk_level,
            "is_medical_report": report.is_medical_report,
            "ocr_characters": report.ocr_characters,
            "created_at": report.created_at
        }
    }


@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    report = (
        db.query(Report)
        .filter(
            Report.id == report_id,
            Report.user_id == current_user.id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    finding = (
        db.query(MedicalFinding)
        .filter(
            MedicalFinding.report_id == report_id
        )
        .first()
    )

    if finding:

        db.delete(finding)

    db.delete(report)

    db.commit()

    return {
        "success": True,
        "message": "Report deleted successfully"
    }


@router.get("/{report_id}/analysis")
def get_analysis(
    report_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    report = (
        db.query(Report)
        .filter(
            Report.id == report_id,
            Report.user_id == current_user.id
        )
        .first()
    )

    if not report:

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    finding = (
        db.query(MedicalFinding)
        .filter(
            MedicalFinding.report_id == report_id
        )
        .first()
    )

    if not finding:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    return {
        "success": True,
        "analysis": {
            "report_id": finding.report_id,
            "document_category": finding.document_category,
            "document_type": finding.document_type,
            "summary": finding.summary,
            "health_score": finding.health_score,
            "risk_level": finding.risk_level,
            "is_medical_report": finding.is_medical_report,
            "finding_json": finding.finding_json,
            "created_at": finding.created_at
        }
    }


@router.get("/compare/{old_report_id}/{new_report_id}")
def compare_report_api(
    old_report_id: int,
    new_report_id: int,
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    old_report = (
        db.query(Report)
        .filter(
            Report.id == old_report_id,
            Report.user_id == current_user.id
        )
        .first()
    )

    new_report = (
        db.query(Report)
        .filter(
            Report.id == new_report_id,
            Report.user_id == current_user.id
        )
        .first()
    )

    if not old_report:

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    if not new_report:

        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    old_finding = (
        db.query(MedicalFinding)
        .filter(
            MedicalFinding.report_id == old_report_id
        )
        .first()
    )

    new_finding = (
        db.query(MedicalFinding)
        .filter(
            MedicalFinding.report_id == new_report_id
        )
        .first()
    )

    if not old_finding:

        raise HTTPException(
            status_code=404,
            detail=f"Report {old_report_id} analysis not found"
        )

    if not new_finding:

        raise HTTPException(
            status_code=404,
            detail=f"Report {new_report_id} analysis not found"
        )

    result = compare_reports(
        {
            "health_score": old_finding.health_score
        },
        {
            "health_score": new_finding.health_score
        }
    )

    return {
        "success": True,
        "old_report_id": old_report_id,
        "new_report_id": new_report_id,
        "comparison": result
    }