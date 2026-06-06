from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.ai.analysis import compare_reports


router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("")
def get_reports(db: Session = Depends(get_db)):

    reports = db.query(Report).order_by(Report.created_at.desc()).all()

    return {
        "success": True,
        "count": len(reports),
        "reports": reports
    }


@router.get("/{report_id}")
def get_report(report_id: int, db: Session = Depends(get_db)):

    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:

        raise HTTPException(status_code=404, detail="Report not found")

    return {
        "success": True,
        "report": report
    }


@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):

    report = db.query(Report).filter(Report.id == report_id).first()

    if not report:

        raise HTTPException(status_code=404, detail="Report not found")

    db.delete(report)

    db.commit()

    return {
        "success": True,
        "message": "Report deleted"
    }


@router.get("/{report_id}/analysis")
def get_analysis(report_id: int, db: Session = Depends(get_db)):

    finding = db.query(MedicalFinding).filter(MedicalFinding.report_id == report_id).first()

    if not finding:

        raise HTTPException(status_code=404, detail="Analysis not found")

    return {
        "success": True,
        "analysis": finding
    }


@router.get("/compare/{old_report_id}/{new_report_id}")
def compare_report_api(old_report_id: int, new_report_id: int, db: Session = Depends(get_db)):

    old_finding = db.query(MedicalFinding).filter(MedicalFinding.report_id == old_report_id).first()

    new_finding = db.query(MedicalFinding).filter(MedicalFinding.report_id == new_report_id).first()

    if not old_finding or not new_finding:

        raise HTTPException(status_code=404, detail="Report not found")

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
        "comparison": result
    }