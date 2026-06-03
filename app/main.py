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

        return app


app = ApplicationFactory.create_application()