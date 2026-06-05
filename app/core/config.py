from functools import lru_cache

from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)


class Settings(BaseSettings):

    APP_NAME: str

    API_V1_PREFIX: str

    DEBUG: bool

    SECRET_KEY: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    JWT_ALGORITHM: str

    POSTGRES_HOST: str

    POSTGRES_PORT: int

    POSTGRES_DB: str

    POSTGRES_USER: str

    POSTGRES_PASSWORD: str

    REDIS_HOST: str

    REDIS_PORT: int

    CHROMA_PERSIST_DIRECTORY: str

    UPLOAD_DIRECTORY: str

    NVIDIA_API_KEY: str

    NVIDIA_BASE_URL: str

    NVIDIA_MODEL: str

    EMBEDDING_API_KEY: str

    EMBEDDING_BASE_URL: str

    EMBEDDING_MODEL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


@lru_cache
def get_settings():

    return Settings()


settings = get_settings()