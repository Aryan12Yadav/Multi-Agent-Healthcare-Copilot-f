"""
auth_service.py

Contains authentication
business logic.

Validation and security
rules belong here.
"""

from app.models.user import User

from app.auth.password_service import PasswordService

from app.auth.jwt_service import JWTService


class AuthService:
    """
    Authentication Service.

    Responsible for user registration,
    login validation and token generation.
    """

    def __init__(
        self,
        manager
    ):
        self.manager = manager

    def register_user(
        self,
        full_name: str,
        email: str,
        password: str
    ):

        existing_user = (
            self.manager.get_user_by_email(
                email
            )
        )

        if existing_user:
            raise ValueError(
                "Email already exists."
            )

        hashed_password = (
            PasswordService.hash_password(
                password
            )
        )

        user = User(
            full_name=full_name,
            email=email,
            password_hash=hashed_password,
            role_id=1
        )

        return self.manager.create_user(
            user
        )

    def login_user(
        self,
        email: str,
        password: str
    ):

        user = (
            self.manager.get_user_by_email(
                email
            )
        )

        if not user:
            raise ValueError(
                "Invalid credentials."
            )

        password_valid = (
            PasswordService.verify_password(
                password,
                user.password_hash
            )
        )

        if not password_valid:
            raise ValueError(
                "Invalid credentials."
            )

        token = (
            JWTService.create_access_token(
                {
                    "user_id": user.id,
                    "email": user.email
                }
            )
        )

        return token