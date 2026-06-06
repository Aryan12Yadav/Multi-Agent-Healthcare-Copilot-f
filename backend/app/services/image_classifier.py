from app.ai.deepseek import ask_llm
from app.ai.deepseek import safe_json_loads


def classify_image(image_context: str = ""):

    prompt = f"""
You are an expert medical document and image classifier.

Your task:

Analyze the uploaded image.

The image may be:

- Medical report
- Lab report
- Blood test
- Pathology report
- Histopathology report
- Prescription
- MRI
- CT Scan
- X-Ray
- Ultrasound
- ECG
- ECHO
- Discharge summary
- Hospital bill
- Insurance document
- ID card
- Non-medical document
- Photograph
- Screenshot
- Unknown

Do NOT restrict yourself to the above examples.

Determine:

1. What the image most likely contains.
2. Whether it is medical.
3. Whether OCR analysis is sufficient.
4. Whether vision analysis is required.
5. Confidence score.

Return JSON only.

{{
    "is_medical": true,
    "document_type": "",
    "document_category": "",
    "requires_ocr": false,
    "requires_vision_analysis": false,
    "confidence": 0,
    "reason": ""
}}

Context:

{image_context}
"""

    result = safe_json_loads(
        ask_llm(prompt)
    )

    return result