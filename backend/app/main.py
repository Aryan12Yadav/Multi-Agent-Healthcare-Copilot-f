from fastapi import FastAPI

from app.core.database import Base
from app.core.database import engine

from app.models.user import User
from app.models.report import Report
from app.models.medical_finding import MedicalFinding

from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router
from app.routes.reports import router as reports_router
from app.routes.chat import router as chat_router
from app.routes.dashboard import router as dashboard_router
from app.routes.patient_profile import router as patient_profile_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MedSphere AI",
    version="1.0.0",
    description="AI Powered Medical Report Analysis Platform"
)


app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(reports_router)
app.include_router(chat_router)
app.include_router(dashboard_router)
app.include_router(patient_profile_router)


@app.get("/")
def home():

    return {
        "success": True,
        "message": "MedSphere AI Running"
    }