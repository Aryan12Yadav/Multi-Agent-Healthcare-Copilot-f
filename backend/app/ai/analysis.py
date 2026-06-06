from app.ai.deepseek import ask_llm
from app.ai.deepseek import safe_json_loads


def classify_document(content: str):

    prompt = f"""
You are an expert healthcare document classifier.

Determine whether this document is medical.

The document may be:

- Blood Test
- Pathology Report
- Histopathology Report
- Biopsy Report
- Radiology Report
- MRI Report
- CT Scan Report
- X Ray Report
- Ultrasound Report
- ECG Report
- ECHO Report
- Prescription
- Clinical Note
- Doctor Note
- Surgery Report
- Cardiology Report
- Neurology Report
- Oncology Report
- Dental Report
- Discharge Summary
- Insurance Document
- Government Document
- Resume
- Invoice
- Non Medical Document

Rules:

1. Classify based on document meaning.
2. Do not rely on a single keyword.
3. If uncertain, choose the most likely category.
4. Return JSON only.

Return:

{{
    "is_medical": true,
    "document_type": "",
    "document_category": "",
    "confidence": 0
}}

Document:

{content[:8000]}
"""

    try:

        result = safe_json_loads(
            ask_llm(prompt)
        )

        return result

    except Exception:

        return {
            "is_medical": False,
            "document_type": "Unknown",
            "document_category": "Unknown",
            "confidence": 0
        }


def analyze_document(content: str):

    if not content:

        return {
            "is_medical_report": False,
            "document_type": "Unknown",
            "document_category": "Unknown",
            "health_score": 0,
            "risk_level": "Unknown",
            "summary": "No content available for analysis."
        }

    classification = classify_document(
        content
    )

    if not classification.get("is_medical"):

        return {
            "is_medical_report": False,
            "document_type": classification.get(
                "document_type"
            ),
            "document_category": classification.get(
                "document_category"
            ),
            "health_score": 0,
            "risk_level": "Not Medical",
            "summary": "This document does not appear to be a medical report."
        }

    prompt = f"""
You are a healthcare report analysis assistant.

Analyze the report strictly using information
present inside the report.

Rules:

1. Do not diagnose diseases.
2. Do not hallucinate.
3. Do not invent values.
4. Use report information only.
5. Explain abnormalities in simple language.
6. Create patient friendly summary.
7. Highlight abnormal findings.
8. Generate useful recommendations.
9. If information is missing, mention it.

Return JSON only.

{{
    "summary": "",
    "abnormal_findings": [],
    "recommendations": []
}}

Medical Report:

{content[:12000]}
"""

    try:

        result = safe_json_loads(
            ask_llm(prompt)
        )

    except Exception:

        result = {
            "summary": "Analysis could not be completed.",
            "abnormal_findings": [],
            "recommendations": []
        }

    score = calculate_health_score(
        result
    )

    return {
        "is_medical_report": True,
        "document_type": classification.get(
            "document_type"
        ),
        "document_category": classification.get(
            "document_category"
        ),
        "health_score": score["health_score"],
        "risk_level": score["risk_level"],
        "summary": result.get("summary"),
        "analysis": result
    }


def calculate_health_score(data: dict):

    findings = data.get(
        "abnormal_findings",
        []
    )

    count = len(findings)

    score = 100 - (count * 10)

    if score < 0:

        score = 0

    if score >= 80:

        risk = "Low"

    elif score >= 50:

        risk = "Medium"

    else:

        risk = "High"

    return {
        "health_score": score,
        "risk_level": risk
    }


def compare_reports(
    old_report: dict,
    new_report: dict
):

    old_score = old_report.get(
        "health_score",
        0
    )

    new_score = new_report.get(
        "health_score",
        0
    )

    difference = new_score - old_score

    if difference > 0:

        trend = "Improved"

    elif difference < 0:

        trend = "Declined"

    else:

        trend = "Stable"

    return {
        "old_score": old_score,
        "new_score": new_score,
        "difference": difference,
        "trend": trend
    }


def generate_health_trend(scores: list):

    if len(scores) < 2:

        return {
            "trend": "Insufficient Data"
        }

    first_score = scores[0]

    last_score = scores[-1]

    change = last_score - first_score

    if change > 0:

        trend = "Improving"

    elif change < 0:

        trend = "Declining"

    else:

        trend = "Stable"

    return {
        "trend": trend,
        "change": change,
        "first_score": first_score,
        "latest_score": last_score
    }


def build_patient_profile(reports: str):

    prompt = f"""
Build a patient profile from historical reports.

Rules:

1. Use report information only.
2. Do not diagnose.
3. Do not hallucinate.
4. Return JSON only.

{{
    "possible_conditions": [],
    "risk_factors": [],
    "recommended_tests": []
}}

Reports:

{reports[:12000]}
"""

    try:

        result = safe_json_loads(
            ask_llm(prompt)
        )

        return result

    except Exception:

        return {
            "possible_conditions": [],
            "risk_factors": [],
            "recommended_tests": []
        }