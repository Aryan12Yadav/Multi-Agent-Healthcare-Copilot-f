from app.ai.analysis import classify_medical_content
from app.ai.analysis import analyze_medical_content
from app.ai.analysis import calculate_health_score
from app.ai.analysis import generate_doctor_summary


def analyze_document(document_text: str):

    classification = classify_medical_content(document_text)

    if not classification.get("is_medical", False):

        return {
            "is_medical_report": False,
            "document_category": classification.get("domain"),
            "document_type": classification.get("content_type"),
            "health_score": 0,
            "risk_level": "Not Medical",
            "summary": "This document is not a medical report."
        }

    analysis = analyze_medical_content(
        content=document_text,
        content_type=classification.get("content_type")
    )

    score_result = calculate_health_score(analysis)

    doctor_summary = generate_doctor_summary(
        document_text=document_text,
        analysis=analysis
    )

    return {
        "is_medical_report": True,
        "document_category": classification.get("domain"),
        "document_type": classification.get("content_type"),
        "health_score": score_result["health_score"],
        "risk_level": score_result["risk_level"],
        "summary": doctor_summary,
        "analysis": analysis
    }