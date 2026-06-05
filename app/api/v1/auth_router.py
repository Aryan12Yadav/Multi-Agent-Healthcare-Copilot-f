from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.auth_schema import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)

from app.controllers.auth_controller import (
    AuthController
)

from app.services.auth_service import (
    AuthService
)

from app.repositories.auth_repository import (
    AuthRepository
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


def get_auth_controller(
    db: Session
) -> AuthController:

    repository = AuthRepository(
        db
    )

    service = AuthService(
        repository
    )

    return AuthController(
        service
    )


@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):

    try:

        controller = get_auth_controller(
            db
        )

        user = controller.register(
            payload
        )

        return {
            "message": "User registered successfully",
            "user_id": user.id
        }

    except ValueError as error:

        raise HTTPException(
            status_code=400,
            detail=str(error)
        )

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):

    repository = AuthRepository(
        db
    )

    service = AuthService(
        repository
    )

    token = service.login_user(
        payload.email,
        payload.password
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }