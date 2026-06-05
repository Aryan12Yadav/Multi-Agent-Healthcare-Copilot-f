from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.models.user import User


class AuthRepository:

    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user

    def get_by_email(self, email: str) -> User | None:
        return (
            self.db.query(User)
            .filter(User.email == email)
            .first()
        )

    def get_by_username(self, username: str) -> User | None:
        return (
            self.db.query(User)
            .filter(User.username == username)
            .first()
        )

    def get_by_identifier(self, identifier: str) -> User | None:
        return (
            self.db.query(User)
            .filter(
                or_(
                    User.email == identifier,
                    User.username == identifier
                )
            )
            .first()
        )

    def get_by_id(self, user_id: int) -> User | None:
        return (
            self.db.query(User)
            .filter(User.id == user_id)
            .first()
        )

    def update_last_login(self, user: User) -> User:
        from datetime import datetime

        user.last_login_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(user)

        return user