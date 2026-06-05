from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.core.config import (
    settings
)

from app.api.v1.auth_router import (
    router as auth_router
)

from app.api.v1.report_router import (
    router as report_router
)

from app.api.v1.chat_router import (
    router as chat_router
)

from app.api.v1.report_chat_router import (
    router as report_chat_router
)

from app.api.v1.dashboard_router import (
    router as dashboard_router
)


class ApplicationFactory:

    @staticmethod
    def create_application() -> FastAPI:

        app = FastAPI(
            title=settings.APP_NAME,
            debug=settings.DEBUG
        )

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
        def root():

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
            chat_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            report_chat_router,
            prefix=settings.API_V1_PREFIX
        )

        app.include_router(
            dashboard_router,
            prefix=settings.API_V1_PREFIX
        )

        return app


app = (
    ApplicationFactory
    .create_application()
)