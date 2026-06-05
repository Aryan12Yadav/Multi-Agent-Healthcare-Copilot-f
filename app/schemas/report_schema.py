from datetime import datetime

from pydantic import BaseModel
from pydantic import ConfigDict


class ReportResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    report_name: str

    report_type: str | None

    processing_status: str

    uploaded_at: datetime


class ReportAnalysisResponse(BaseModel):

    report_id: int

    document_category: str | None

    document_type: str | None

    is_medical_report: bool

    health_score: int

    risk_level: str | None

    summary: str | None

    analysis: dict