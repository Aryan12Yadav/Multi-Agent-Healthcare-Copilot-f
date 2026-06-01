"""
auth_manager.py

Manager layer coordinates
repository operations.

Business rules should remain
inside service layer.
"""

from app.repositories.auth_repository import AuthRepository


class AuthManager:
    """
    Authentication Manager.

    Acts as a bridge between
    services and repositories.
    """

    def __init__(
        self,
        repository: AuthRepository
    ):
        self.repository = repository

    def get_user_by_email(
        self,
        email: str
    ):

        return self.repository.get_user_by_email(
            email
        )

    def create_user(
        self,
        user
    ):

        return self.repository.create_user(
            user
        )