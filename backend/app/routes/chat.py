from fastapi import APIRouter
from fastapi import HTTPException

from app.ai.deepseek import ask_llm

from app.ai.memory import save_memory
from app.ai.memory import get_memories
from app.ai.memory import build_context

from app.models.medical_finding import MedicalFinding

from app.core.database import SessionLocal


router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("")
def chat(question: str):

    context = build_context(user_id=1)

    prompt = f"""
You are MedSphere AI.

Previous Conversation:

{context}

User Question:

{question}
"""

    answer = ask_llm(prompt)

    save_memory(
        user_id=1,
        question=question,
        answer=answer
    )

    return {
        "success": True,
        "answer": answer
    }


@router.get("/history")
def history():

    messages = get_memories(user_id=1)

    return {
        "success": True,
        "count": len(messages),
        "messages": messages
    }


@router.post("/report")
def report_chat(report_id: int, question: str):

    db = SessionLocal()

    try:

        finding = db.query(MedicalFinding).filter(MedicalFinding.report_id == report_id).first()

        if not finding:

            raise HTTPException(status_code=404, detail="Report analysis not found")

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
"""

        answer = ask_llm(prompt)

        save_memory(
            user_id=1,
            question=f"Report {report_id}: {question}",
            answer=answer
        )

        return {
            "success": True,
            "answer": answer
        }

    finally:

        db.close()