from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.ai.deepseek import ask_llm

from app.ai.memory import save_message
from app.ai.memory import build_context


router = APIRouter(
    prefix="/report-chat",
    tags=["Report Chat"]
)


@router.post("/{report_id}")
def report_chat(
    report_id: int,
    question: str,
    db: Session = Depends(get_db)
):

    report = db.query(Report).filter(
        Report.id == report_id
    ).first()

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    finding = db.query(MedicalFinding).filter(
        MedicalFinding.report_id == report_id
    ).first()

    if not finding:

        raise HTTPException(
            status_code=404,
            detail="Analysis not found"
        )

    memory_context = build_context(
        user_id=1
    )

    prompt = f"""
You are MedSphere AI.

Answer only using report analysis.

Previous Conversation:

{memory_context}

Report Analysis:

{finding.summary}

Question:

{question}
"""

    answer = ask_llm(prompt)

    save_message(
        user_id=1,
        report_id=report_id,
        question=question,
        answer=answer
    )

    return {
        "success": True,
        "response": answer
    }