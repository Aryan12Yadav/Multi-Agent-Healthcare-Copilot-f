"""
main.py

Application entry point.

Responsible for bootstrapping FastAPI,
middleware registration and route mounting.
"""

from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.auth_router import router as auth_router
from app.api.v1.report_router import router as report_router
from app.api.v1.analysis_router import router as analysis_router
from app.api.v1.chat_router import router as chat_router
from app.api.v1.report_chat_router import router as report_chat_router
from app.api.v1.ocr_router import router as ocr_router
from app.api.v1.llm_router import router as llm_router
from app.api.v1.dashboard_router import router as dashboard_router
from app.api.v1.report_chat_router import router as report_chat_router
from app.api.v1.pharmacy_router import router as pharmacy_router
from app.api.v1.hospital_router import router as hospital_router
from app.api.v1.trend_router import router as trend_router
from app.api.v1.followup_router import router as followup_router
from app.api.v1.cost_router import router as cost_router




class ApplicationFactory:
    """
    Creates and configures the FastAPI app.

    Central place for startup configuration.
    """

    @staticmethod
    def create_application() -> FastAPI:

        app = FastAPI(
            title=settings.APP_NAME,
            debug=settings.DEBUG
        )
        from fastapi.middleware.cors import CORSMiddleware

        app.add_middleware(
            CORSMiddleware,
            allow_origins=[
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"]
        )

        @app.get("/")
        async def root():

            return {
                "project": settings.APP_NAME,
                "status": "running"
            }

        app.include_router(
            auth_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            report_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            analysis_router,
            prefix= settings.API_V1_PREFIX
        )

        app.include_router(
            chat_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            report_chat_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            ocr_router,
            prefix = settings.API_V1_PREFIX
        )
        
        app.include_router(
            dashboard_router,
            prefix = settings.API_V1_PREFIX
        )

        app.include_router(
            llm_router,
            prefix = "/api/v1"
        )

        app.include_router(
            report_chat_router,
            prefix = "/api/v1"
        )

        app.include_router(pharmacy_router, prefix="/api/v1")
        app.include_router(hospital_router, prefix="/api/v1")
        app.include_router(trend_router, prefix="/api/v1")
        app.include_router(followup_router, prefix="/api/v1")
        app.include_router(cost_router, prefix="/api/v1")

            

        return app
    


app = ApplicationFactory.create_application()