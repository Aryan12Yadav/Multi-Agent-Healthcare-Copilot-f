from app.ai.deepseek import ask_llm
from app.ai.deepseek import safe_json_loads
import re

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
2. Do not rely on keywords only.
3. Return JSON only.

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

        raw_response = ask_llm(
            prompt
        )

        
        print("LLM RESPONSE")
        print(raw_response)
        

        result = safe_json_loads(
            raw_response
        )

        if not result:

            result = {
                "patient_name": None,
                "person_name": None,
                "age": None,
                "gender": None,

                "summary":
                "Analysis could not be generated.",

                "structured_report": "",

                "abnormal_findings": [],

                "critical_findings": [],

                "recommendations": []
            }

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

    

    if not classification.get(
        "is_medical"
    ):

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
            You are MedSphere AI.

            You are an expert healthcare report analysis engine.

            Analyze ONLY information explicitly present in the report.

            STRICT RULES:

            1. Never diagnose diseases.
            2. Never prescribe medicines.
            3. Never invent information.
            4. Never hallucinate.
            5. Extract patient details exactly as written.
            6. Extract abnormal values exactly as written.
            7. Extract critical findings exactly as written.
            8. Preserve units exactly.
            9. Preserve names exactly.
            10. Preserve test values exactly.
            11. If information is missing return null.
            12. Use only report information.
            13. Generate professional structured report.
            14. Generate patient-friendly summary.
            15. Highlight risk-related abnormalities.
            16. Return valid JSON only.

            IMPORTANT:

            All string values MUST be valid JSON strings.

            Do NOT use raw line breaks inside JSON values.

            Use \\n for new lines.



            Return JSON ONLY:

            {{
                "patient_name": null,
                "person_name": null,
                "age": null,
                "gender": null,

                "summary": "",

                "structured_report": "",

                "abnormal_findings": [],

                "critical_findings": [],

                "recommendations": []
            }}

            IMPORTANT:

            structured_report MUST follow this exact format:

            # Patient Information

            - Patient Name:
            - Person Name:
            - Age:
            - Gender:

            # Report Overview

            Short overview of report.

            # Abnormal Findings

            - Finding 1
            - Finding 2

            # Critical Findings

            - Critical Finding 1
            - Critical Finding 2

            # Risk Assessment

            Low Risk / Medium Risk / High Risk

            Reason:

            - Reason 1
            - Reason 2

            # Recommendations

            - Recommendation 1
            - Recommendation 2

            Rules for recommendations:

            - Use general healthcare advice only.
            - Do not prescribe medications.
            - Do not diagnose conditions.

            Medical Report:

            {content[:12000]}
            """

    try:

        result = safe_json_loads(
            ask_llm(prompt)
        )

        if not result:

            patient_match = re.search(
                r"Patient Name\s+([A-Z\s]+)",
                content
            )

            person_match = re.search(
                r"Person Name\s+([A-Z\s]+)",
                content
            )

            age_gender_match = re.search(
                r"Age/Gender\s+(\d+\s*Y)\s*/\s*([MF])",
                content
            )

            result = {

                "patient_name":
                patient_match.group(1).strip()
                if patient_match
                else None,

                "person_name":
                person_match.group(1).strip()
                if person_match
                else None,

                "age":
                age_gender_match.group(1)
                if age_gender_match
                else None,

                "gender":
                age_gender_match.group(2)
                if age_gender_match
                else None,

                "summary":
                "Analysis could not be generated from AI response but OCR data was extracted.",

                "structured_report": "",

                "abnormal_findings": [],

                "critical_findings": [],

                "recommendations": []
            }

    except Exception:

        result = {
            "patient_name": None,
            "person_name": None,
            "age": None,
            "gender": None,

            "summary": "Analysis could not be completed.",

            "structured_report": "",

            "abnormal_findings": [],

            "critical_findings": [],

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

        "patient_name": result.get(
            "patient_name"
        ),

        "person_name": result.get(
            "person_name"
        ),

        "age": result.get(
            "age"
        ),

        "gender": result.get(
            "gender"
        ),

        "health_score": score[
            "health_score"
        ],

        "risk_level": score[
            "risk_level"
        ],

        "summary": result.get(
            "summary"
        ),

        "structured_report": result.get(
            "structured_report"
        ),

        "abnormal_findings": result.get(
            "abnormal_findings",
            []
        ),

        "critical_findings": result.get(
            "critical_findings",
            []
        ),

        "recommendations": result.get(
            "recommendations",
            []
        ),

        "analysis": result
    }


def calculate_health_score(data: dict):

    findings = data.get(
        "abnormal_findings",
        []
    )

    critical_findings = data.get(
        "critical_findings",
        []
    )

    count = len(
        findings
    )

    critical_count = len(
        critical_findings
    )

    score = (
            100
            - (count * 5)
            - (critical_count * 10)
        )

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

    difference = (
        new_score
        - old_score
    )

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


def generate_health_trend(
    scores: list
):

    if len(scores) < 2:

        return {
            "trend": "Insufficient Data"
        }

    first_score = scores[0]

    last_score = scores[-1]

    change = (
        last_score
        - first_score
    )

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


def build_patient_profile(
    reports: str
):

    prompt = f"""
You are MedSphere AI.

Build a longitudinal patient profile.

Rules:

1. Use report information only.
2. Never diagnose.
3. Never hallucinate.
4. Identify recurring abnormalities.
5. Identify recurring risk factors.
6. Identify health trends.
7. Return JSON only.

{{
    "possible_conditions": [],
    "risk_factors": [],
    "health_trends": [],
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
            "patient_name": "",
            "age": "",
            "gender": "",
            "possible_conditions": [],
            "risk_factors": [],
            "health_trends": [],
            "recommended_tests": []
        }