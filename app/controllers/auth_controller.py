from app.schemas.auth_schema import (
    LoginRequest,
    RegisterRequest
)
from app.services.auth_service import (
    AuthService
)


class AuthController:

    def __init__(
        self,
        service: AuthService
    ):
        self.service = service

    def register(
        self,
        request: RegisterRequest
    ):

        return self.service.register_user(
            username=request.username,
            full_name=request.full_name,
            email=request.email,
            password=request.password
        )

    def login(
        self,
        request: LoginRequest
    ):

        return self.service.login_user(
            identifier=request.identifier,
            password=request.password
        )