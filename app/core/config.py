"""
config.py

Central configuration management.

Loads environment variables and provides
typed access across the application.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Application settings container.

    Loads all environment variables from .env
    and exposes them through strongly typed
    attributes.
    """

    APP_NAME: str

    API_V1_PREFIX: str

    DEBUG: bool

    SECRET_KEY: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    POSTGRES_HOST: str

    POSTGRES_PORT: int

    POSTGRES_DB: str

    POSTGRES_USER: str

    POSTGRES_PASSWORD: str

    REDIS_HOST: str

    REDIS_PORT: int

    CHROMA_PERSIST_DIRECTORY: str

    UPLOAD_DIRECTORY: str


    JWT_ALGORITHM: str

    NVIDIA_API_KEY: str
    NVIDIA_BASE_URL: str
    NVIDIA_MODEL: str

    class Config:
        env_file = ".env"


settings = Settings()