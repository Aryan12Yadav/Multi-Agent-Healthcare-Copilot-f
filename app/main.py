"""
main.py

Application entry point.

Responsible for bootstrapping FastAPI,
middleware registration and route mounting.
"""

from fastapi import FastAPI

from app.core.config import settings


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

        return app


app = ApplicationFactory.create_application()