"""
auth_schema.py

Authentication request
and response schemas.
"""

from pydantic import BaseModel
from pydantic import EmailStr


class RegisterRequest(BaseModel):
    """
    Register API payload.
    """

    full_name: str

    email: EmailStr

    password: str


class LoginRequest(BaseModel):
    """
    Login API payload.
    """

    email: EmailStr

    password: str


class TokenResponse(BaseModel):
    """
    Authentication response.
    """

    access_token: str

    token_type: str