"""
report_schema.py

Pydantic schemas used by
report endpoints.
"""

from datetime import datetime

from pydantic import BaseModel


class ReportResponse(BaseModel):

    id: int

    report_name: str

    processing_status: str

    uploaded_at: datetime

    report_id : int 

    

    class Config:

        from_attributes = True