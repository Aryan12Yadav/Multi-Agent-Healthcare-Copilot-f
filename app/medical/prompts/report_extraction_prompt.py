"""
Prompt used for all
medical report analysis.
"""

REPORT_EXTRACTION_PROMPT = """
You are a healthcare information extraction system.

Analyze the report text.

Extract:

1. report_type
2. findings
3. measurements
4. abnormalities
5. recommendations
6. patient_friendly_summary

Return JSON only.

REPORT:

{report_text}
"""