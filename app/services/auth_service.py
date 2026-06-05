from datetime import datetime

from app.auth.jwt_service import JWTService
from app.auth.password_service import PasswordService
from app.models.user import User
from app.repositories.auth_repository import AuthRepository


class AuthService:

    def __init__(
        self,
        repository: AuthRepository
    ):
        self.repository = repository

    def register_user(
        self,
        username: str,
        full_name: str,
        email: str,
        password: str
    ) -> User:

        existing_email = (
            self.repository.get_by_email(
                email
            )
        )

        if existing_email:
            raise ValueError(
                "Email already registered."
            )

        existing_username = (
            self.repository.get_by_username(
                username
            )
        )

        if existing_username:
            raise ValueError(
                "Username already taken."
            )

        user = User(
            username=username,
            full_name=full_name,
            email=email,
            password_hash=PasswordService.hash_password(
                password
            )
        )

        return self.repository.create_user(
            user
        )

    def login_user(
        self,
        identifier: str,
        password: str
    ) -> str:

        user = (
            self.repository.get_by_identifier(
                identifier
            )
        )

        if not user:
            raise ValueError(
                "Invalid credentials."
            )

        is_valid = (
            PasswordService.verify_password(
                password,
                user.password_hash
            )
        )

        if not is_valid:
            raise ValueError(
                "Invalid credentials."
            )

        user.last_login_at = (
            datetime.utcnow()
        )

        self.repository.update_last_login(
            user
        )

        token = (
            JWTService.create_access_token(
                {
                    "user_id": user.id,
                    "email": user.email,
                    "username": user.username
                }
            )
        )

        return token