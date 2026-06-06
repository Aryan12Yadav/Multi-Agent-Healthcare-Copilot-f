from app.ai.deepseek import ask_llm
from app.ai.deepseek import safe_json_loads


def classify_document(file_name: str, extracted_text: str):

    prompt = f"""
You are an expert healthcare document classifier.

Your job is to identify:

1. Is this a medical document?
2. What type of document is it?
3. What category does it belong to?
4. Does it require OCR analysis?
5. Does it require Vision AI analysis?

Possible document types include but are not limited to:

- Blood Test
- CBC
- Pathology Report
- Histopathology Report
- Biochemistry Report
- Prescription
- Discharge Summary
- MRI
- CT Scan
- X-Ray
- Ultrasound
- ECG
- ECHO
- Clinical Notes
- Surgery Report
- Oncology Report
- Neurology Report
- Cardiology Report
- Dental Report
- Insurance Document
- Invoice
- Non Medical Document

Return JSON only.

{{
    "is_medical": true,
    "document_type": "",
    "document_category": "",
    "requires_vision_model": false,
    "confidence": 0
}}

File Name:
{file_name}

Extracted Content:
{extracted_text[:8000]}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    return result