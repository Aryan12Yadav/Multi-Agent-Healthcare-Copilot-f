"""
auth_repository.py

Database operations related
to authentication and users.

Repository layer should never
contain business logic.
"""

from sqlalchemy.orm import Session

from appss.models.user import User


class AuthRepository:
    """
    Authentication Repository.

    Responsible for database access
    related to users.
    """

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def get_user_by_email(
        self,
        email: str
    ):

        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def create_user(
        self,
        user: User
    ):

        self.db.add(user)

        self.db.commit()

        self.db.refresh(user)

        return user