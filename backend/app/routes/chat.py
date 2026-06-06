from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.ai.deepseek import ask_llm

from app.ai.memory import save_memory
from app.ai.memory import get_memories
from app.ai.memory import build_context

from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.routes.auth import get_current_user


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("")
def chat(
    question: str,
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    context = build_context(
        user_id=current_user.id
    )

    prompt = f"""
You are MedSphere AI.

Previous Conversation:

{context}

User Question:

{question}
"""

    answer = ask_llm(prompt)

    save_memory(
        user_id=current_user.id,
        question=question,
        answer=answer
    )

    return {
        "success": True,
        "answer": answer
    }


@router.get("/history")
def history(
    token: str,
    db: Session = Depends(get_db)
):

    current_user = get_current_user(
        token,
        db
    )

    messages = get_memories(
        user_id=current_user.id
    )

    serialized_messages = []

    for item in messages:

        serialized_messages.append(
            {
                "id": str(item.get("_id")),
                "user_id": item.get("user_id"),
                "question": item.get("question"),
                "answer": item.get("answer"),
                "created_at": str(
                    item.get("created_at")
                )
            }
        )

    return {
        "success": True,
        "count": len(serialized_messages),
        "messages": serialized_messages
    }


@router.post("/report")
def report_chat(
    report_id: int,
    question: str,
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
            detail="Report analysis not found"
        )

    prompt = f"""
You are MedSphere AI.

Report Summary:

{finding.summary}

Report Analysis:

{finding.finding_json}

Question:

{question}

Rules:

1. Never diagnose.
2. Never prescribe medicine.
3. Explain only report data.
4. If information is not present in report, clearly say so.
"""

    answer = ask_llm(prompt)

    save_memory(
        user_id=current_user.id,
        question=f"Report {report_id}: {question}",
        answer=answer
    )

    return {
        "success": True,
        "report_id": report_id,
        "answer": answer
    }