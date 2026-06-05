from datetime import datetime
from datetime import timedelta
from datetime import timezone

from jose import JWTError
from jose import jwt

from app.core.config import settings


class JWTService:

    @classmethod
    def create_access_token(
        cls,
        data: dict
    ) -> str:

        payload = data.copy()

        expire = (
            datetime.now(
                timezone.utc
            )
            +
            timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )
        )

        payload["exp"] = expire

        return jwt.encode(
            payload,
            settings.SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM
        )

    @classmethod
    def decode_token(
        cls,
        token: str
    ) -> dict | None:

        try:

            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[
                    settings.JWT_ALGORITHM
                ]
            )

            return payload

        except JWTError:

            return None

    @classmethod
    def get_user_id(
        cls,
        token: str
    ) -> int | None:

        payload = cls.decode_token(
            token
        )

        if not payload:
            return None

        return payload.get(
            "user_id"
        )