from app.ai.deepseek import ask_llm
from app.ai.deepseek import safe_json_loads


MEDICAL_KEYWORDS = [
    "hemoglobin",
    "hb",
    "wbc",
    "rbc",
    "platelet",
    "creatinine",
    "blood urea",
    "glucose",
    "bilirubin",
    "alt",
    "ast",
    "cbc",
    "reference range",
    "normal range",
    "patient",
    "doctor",
    "hospital",
    "laboratory",
    "mri",
    "ct scan",
    "x-ray",
    "ultrasound",
    "ecg",
    "ekg",
    "echo",
    "prescription",
    "diagnosis",
    "findings",
    "impression",
    "pathology",
    "radiology",
    "thyroid",
    "cholesterol",
    "triglycerides"
]


def classify_document(content: str):

    text = content.lower()

    if any(keyword in text for keyword in MEDICAL_KEYWORDS):

        return {
            "is_medical": True,
            "document_type": "Medical Report",
            "document_category": "Healthcare",
            "confidence": 100
        }

    prompt = f"""
You are an expert medical document classifier.

Determine whether the document contains healthcare,
medical, laboratory, pathology, radiology,
prescription, clinical or patient related information.

Medical reports include:

- CBC
- Blood Tests
- Lab Reports
- Pathology Reports
- Histopathology
- Biopsy Reports
- MRI Reports
- CT Scan Reports
- X-Ray Reports
- Ultrasound Reports
- ECG Reports
- ECHO Reports
- Prescriptions
- Clinical Notes
- Doctor Notes
- Discharge Summaries
- Health Checkup Reports

Rules:

1. If laboratory values are present, classify as medical.
2. If patient information exists, classify as medical.
3. If doctor information exists, classify as medical.
4. If reference ranges exist, classify as medical.
5. Be conservative when returning false.
6. Return JSON only.

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

    result = safe_json_loads(
        ask_llm(prompt)
    )

    return result


def analyze_document(content: str):

    classification = classify_document(content)

    if not classification.get("is_medical"):

        return {
            "is_medical_report": False,
            "document_type": classification.get("document_type"),
            "document_category": classification.get("document_category"),
            "health_score": 0,
            "risk_level": "Not Medical",
            "summary": "This is not a medical report."
        }

    prompt = f"""
You are a medical report analysis assistant.

Analyze the report strictly using information present
inside the report.

Rules:

1. Do not diagnose diseases.
2. Do not hallucinate.
3. Do not invent findings.
4. Use only report data.
5. Explain abnormalities in simple language.
6. Generate patient-friendly summary.

Return JSON only.

{{
    "summary": "",
    "abnormal_findings": [],
    "recommendations": []
}}

Medical Report:

{content[:12000]}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    score = calculate_health_score(result)

    return {
        "is_medical_report": True,
        "document_type": classification.get("document_type"),
        "document_category": classification.get("document_category"),
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

    score = 100 - (len(findings) * 10)

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


def compare_reports(old_report: dict, new_report: dict):

    old_score = old_report.get("health_score", 0)

    new_score = new_report.get("health_score", 0)

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

Return JSON only.

{{
    "possible_conditions": [],
    "risk_factors": [],
    "recommended_tests": []
}}

Reports:

{reports}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    return result