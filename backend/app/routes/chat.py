
from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.ai.deepseek import ask_llm

from app.ai.memory import save_memory
from app.ai.memory import get_memories
from app.ai.memory import build_context

from app.ai.memory import save_report_memory
from app.ai.memory import build_report_context

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

Rules:

1. Answer clearly.
2. Be concise.
3. If unsure, say you do not know.
4. Never hallucinate.
"""

    answer = ask_llm(
        prompt
    )

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
                "id": str(
                    item.get("id")
                ),
                "user_id": item.get(
                    "user_id"
                ),
                "question": item.get(
                    "question"
                ),
                "answer": item.get(
                    "answer"
                ),
                "created_at": item.get(
                    "created_at"
                )
            }
        )

    return {
        "success": True,
        "count": len(
            serialized_messages
        ),
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

    if not finding:

        raise HTTPException(
            status_code=404,
            detail="Report analysis not found"
        )

    report_context = build_report_context(
        current_user.id,
        report_id
    )
    SYSTEM_RULES = """
        QUESTION CLASSIFICATION

        First classify the user question.

        Possible intents:

        1. doctor_concern
        2. value_lookup
        3. abnormality
        4. summary
        5. risk
        6. comparison
        7. report_related
        8. not_report_related

        --------------------------------

        REPORT RULES

        1. Use report data only.
        2. Never infer.
        3. Never diagnose.
        4. Never prescribe medication.
        5. Never create diseases.
        6. Never create symptoms.
        7. Never create findings.
        8. Never create values.
        9. Never create recommendations.
        10. Never hallucinate.
        11. Quote exact values.
        12. Quote exact units.
        13. Quote exact reference ranges.
        14. If information is absent reply:

        "Not mentioned in the report."

        --------------------------------

        OFF TOPIC RULE

        If question is unrelated to report:

        Reply:

        This question is not related to the uploaded report.

        Please use the general MedSphere AI assistant.

        Do not answer the off-topic question.

        --------------------------------

        VALUE LOOKUP RULE

        If user asks about a specific parameter:

        Examples:

        cholesterol
        glucose
        sugar
        hba1c
        tsh
        vitamin d
        creatinine
        bilirubin
        hemoglobin
        platelet
        wbc
        rbc
        ldl
        hdl
        triglycerides

        Return only:

        Parameter Name
        Value
        Unit
        Reference Range

        Nothing else.

        --------------------------------

        DOCTOR CONCERN RULE

        If question contains:

        doctor
        concern
        serious
        dangerous
        worry
        consult
        emergency

        Do NOT explain the entire report.

        Mention only findings relevant to consultation.

        Maximum 100 words.

        --------------------------------

        SUMMARY RULE

        Maximum 120 words.

        Do not repeat the full report.

        --------------------------------

        ABNORMALITY RULE

        Return only abnormal findings explicitly present in report.

        Do not add interpretations.

        --------------------------------

        UNIVERSAL RULE

        If answer cannot be derived directly from report:

        Reply exactly:

        Not mentioned in the report.

        Never guess.
        Never infer.
        Never estimate.
        Never hallucinate.
        """

    prompt = f"""
            
            You are MedSphere AI.

            {SYSTEM_RULES}

            You are analyzing a medical report.


            PREVIOUS REPORT CONVERSATION


            {report_context}

            
            PATIENT INFORMATION
            

            Patient Name:
            {finding.patient_name}

            Person Name:
            {finding.person_name}

            Age:
            {finding.age}

            Gender:
            {finding.gender}

            
            REPORT SUMMARY
            

            {finding.summary}

            
            STRUCTURED REPORT
            

            {finding.structured_report}

            
            ABNORMAL FINDINGS
            

            {finding.abnormal_findings}

            
            CRITICAL FINDINGS
            

            {finding.critical_findings}

            
            RECOMMENDATIONS
            

            {finding.recommendations}

            
            FULL OCR TEXT
            

            {report.extracted_text}

            
            FULL ANALYSIS JSON
            

            {finding.finding_json}

            
            USER QUESTION
            

            {question}

            Rules:

            1. Answer ONLY from report information.
            2. Use OCR text whenever needed.
            3. Never diagnose diseases.
            4. Never prescribe medicines.
            5. Never invent values.
            6. If answer exists in OCR, provide exact value.
            7. If answer is missing, clearly say not found.
            8. Use headings and bullet points.
            9. Highlight important abnormal values.
            10. Be medically safe.
            11. If patient information exists, always return exact patient details.
            12. If lab values exist, return exact value and reference range.
            13. Prefer OCR text over generated summaries.
            14. Preserve names exactly as written.
            15. Preserve units exactly as written.

            """

    answer = ask_llm(
        prompt
    )

    save_report_memory(
        user_id=current_user.id,
        report_id=report_id,
        question=question,
        answer=answer
    )

    return {
        "success": True,
        "report_id": report_id,
        "answer": answer
    }
 