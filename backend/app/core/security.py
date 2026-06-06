from datetime import datetime
from datetime import timedelta

import jwt

from passlib.context import CryptContext

from app.core.config import (
    JWT_SECRET
)


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):

    return pwd_context.hash(
        password
    )


def verify_password(
    plain_password: str,
    hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def create_access_token(
    user_id: int
):

    payload = {

        "user_id": user_id,

        "exp":
        datetime.utcnow()
        + timedelta(days=7)
    }

    return jwt.encode(
        payload,
        JWT_SECRET,
        algorithm="HS256"
    )