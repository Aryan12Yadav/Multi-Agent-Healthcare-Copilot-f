from fastapi import FastAPI

from fastapi.openapi.utils import get_openapi

from app.core.database import Base
from app.core.database import engine

from app.models.user import User
from app.models.report import Report
from app.models.medical_finding import MedicalFinding
from app.models.patient_profile import PatientProfile
from app.models.chat_message import ChatMessage

from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router
from app.routes.reports import router as reports_router
from app.routes.chat import router as chat_router
from app.routes.dashboard import router as dashboard_router
from app.routes.patient_profile import router as patient_profile_router


Base.metadata.create_all(
    bind=engine
)


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


def custom_openapi():

    if app.openapi_schema:

        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes
    )

    if "components" not in openapi_schema:

        openapi_schema["components"] = {}

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "apiKey",
            "in": "query",
            "name": "token"
        }
    }

    app.openapi_schema = openapi_schema

    return app.openapi_schema

app.openapi = custom_openapi


@app.get("/")
def home():

    return {
        "success": True,
        "application": "MedSphere AI",
        "version": "1.0.0",
        "message": "MedSphere AI Running"
    }


@app.get("/health")
def health_check():

    return {
        "success": True,
        "status": "healthy"
    }