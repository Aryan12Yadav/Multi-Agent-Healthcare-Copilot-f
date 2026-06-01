"""
auth_controller.py

Controller layer handles
request orchestration.

No business logic should
be placed here.
"""

from app.services.auth_service import AuthService


class AuthController:
    """
    Authentication Controller.
    """

    def __init__(
        self,
        service: AuthService
    ):
        self.service = service

    def register(
        self,
        request
    ):

        return self.service.register_user(
            full_name=request.full_name,
            email=request.email,
            password=request.password
        )

    def login(
        self,
        request
    ):

        return self.service.login_user(
            email=request.email,
            password=request.password
        )