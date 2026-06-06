from datetime import datetime
from datetime import timedelta

from jose import jwt

from passlib.context import CryptContext

from app.core.config import SECRET_KEY
from app.core.config import JWT_ALGORITHM
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):

    return password_context.hash(password)


def verify_password(password: str, hashed_password: str):

    return password_context.verify(password, hashed_password)


def create_access_token(user_id: int):

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "user_id": user_id,
        "exp": expire
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str):

    return jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])