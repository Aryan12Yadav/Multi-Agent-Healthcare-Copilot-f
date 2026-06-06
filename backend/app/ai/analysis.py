import json

from app.ai.deepseek import ask_llm


def safe_json_loads(data: str):

    try:

        return json.loads(data)

    except Exception:

        return {}


def classify_medical_content(content: str):

    prompt = f"""
Classify document.

Return JSON only.

{{
    "is_medical": false,
    "domain": "",
    "content_type": ""
}}

Document:

{content[:5000]}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    if not result:

        return {
            "is_medical": False,
            "domain": "Unknown",
            "content_type": "Unknown"
        }

    return result


def analyze_medical_content(content: str, content_type: str):

    prompt = f"""
Analyze medical document.

Rules:

1. No diagnosis
2. No hallucination
3. Use only document data

Return JSON.

{{
    "summary": "",
    "abnormal_findings": [],
    "recommendations": []
}}

Type:

{content_type}

Document:

{content[:10000]}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    if not result:

        return {
            "summary": "",
            "abnormal_findings": [],
            "recommendations": []
        }

    return result


def generate_doctor_summary(document_text: str, analysis: dict):

    prompt = f"""
        Create short doctor summary.

        Analysis:

        {analysis}

        Document:

        {document_text[:5000]}
        """

    return ask_llm(prompt)


def calculate_health_score(analysis: dict):

    findings = analysis.get(
        "abnormal_findings",
        []
    )

    score = 100

    score -= len(findings) * 10

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


def generate_health_trend(findings):

    if len(findings) < 2:

        return {
            "trend": "Insufficient Data",
            "change": 0
        }

    first_score = findings[0].health_score

    latest_score = findings[-1].health_score

    change = latest_score - first_score

    if change > 0:

        trend = "Improving"

    elif change < 0:

        trend = "Declining"

    else:

        trend = "Stable"

    return {
        "trend": trend,
        "change": change
    }


def generate_health_insights(findings):

    if not findings:

        return {
            "summary": "No reports available.",
            "insights": []
        }

    latest = findings[-1]

    insights = []

    if latest.health_score >= 80:

        insights.append(
            "Health appears stable."
        )

    elif latest.health_score >= 50:

        insights.append(
            "Monitor health regularly."
        )

    else:

        insights.append(
            "Medical consultation recommended."
        )

    return {
        "summary": latest.summary,
        "insights": insights
    }


def compare_reports(old_finding, new_finding):

    score_change = (
        new_finding.health_score
        - old_finding.health_score
    )

    if score_change > 0:

        trend = "Improved"

    elif score_change < 0:

        trend = "Declined"

    else:

        trend = "No Change"

    return {
        "old_score": old_finding.health_score,
        "new_score": new_finding.health_score,
        "change": score_change,
        "trend": trend
    }


def predict_health_trend(findings):

    if len(findings) < 2:

        return {
            "prediction": "Insufficient Data"
        }

    scores = [
        item.health_score
        for item in findings
    ]

    average = (
        sum(scores)
        / len(scores)
    )

    latest = scores[-1]

    if latest > average:

        prediction = "Likely Improving"

    elif latest < average:

        prediction = "Potential Decline"

    else:

        prediction = "Stable"

    return {
        "prediction": prediction
    }


def build_patient_profile(findings):

    prompt = f"""
        Build patient profile.

        Data:

        {findings}

        Return JSON.

        {{
            "possible_conditions": [],
            "risk_factors": [],
            "recommended_checkups": []
        }}
            """

    result = safe_json_loads(
        ask_llm(prompt)
    )

    if not result:

        return {
            "possible_conditions": [],
            "risk_factors": [],
            "recommended_checkups": []
        }

    return result


def classify_medical_image(image_description: str):

    prompt = f"""
        Classify medical image.

        Return JSON.

        {{
            "is_medical_image": false,
            "image_type": "",
            "body_part": ""
        }}

        Image:

        {image_description}
        """

    result = safe_json_loads(
        ask_llm(prompt)
    )

    if not result:

        return {
            "is_medical_image": False,
            "image_type": "Unknown",
            "body_part": ""
        }

    return result


def analyze_medical_image(image_type: str, image_description: str):

    prompt = f"""
    Analyze medical image.

    Type:

    {image_type}

    Description:

    {image_description}

    Return JSON.

    {{
        "summary": "",
        "observations": [],
        "recommendations": []
    }}
        """

    result = safe_json_loads(
        ask_llm(prompt)
    )

    if not result:

        return {
            "summary": "",
            "observations": [],
            "recommendations": []
        }

    return result