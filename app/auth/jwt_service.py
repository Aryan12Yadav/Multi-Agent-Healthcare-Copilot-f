"""
jwt_service.py

JWT token generation
and validation.
"""

from datetime import datetime
from datetime import timedelta

from jose import jwt

from app.core.config import settings


class JWTService:
    """
    JWT token helper.
    """

    @classmethod
    def create_access_token(
        cls,
        data: dict
    ) -> str:

        payload = data.copy()

        expire = (
            datetime.utcnow()
            + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

        payload["exp"] = expire

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM
        )