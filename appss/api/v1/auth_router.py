"""
auth_router.py

Authentication endpoints.

Routers must remain thin.
"""

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from appss.database.session import get_db

from appss.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)

from appss.controllers.auth_controller import AuthController

from appss.services.auth_service import AuthService

from appss.managers.auth_manager import AuthManager

from appss.repositories.auth_repository import (
    AuthRepository
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def get_auth_controller(
    db: Session
):

    repository = AuthRepository(db)

    manager = AuthManager(repository)

    service = AuthService(manager)

    return AuthController(service)


@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):

    try:

        controller = (
            get_auth_controller(db)
        )

        user = controller.register(
            payload
        )

        return {
            "message": "User created",
            "user_id": user.id
        }

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    try:

        controller = (
            get_auth_controller(db)
        )

        token = controller.login(
            payload
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    except Exception as e:

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )