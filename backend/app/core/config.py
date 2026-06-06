import os

from dotenv import load_dotenv


load_dotenv()


APP_NAME = os.getenv(
    "APP_NAME",
    "MedSphere AI"
)

DEBUG = os.getenv(
    "DEBUG",
    "False"
).lower() == "true"

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "change-me"
)

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        1440
    )
)


POSTGRES_HOST = os.getenv(
    "POSTGRES_HOST",
    "localhost"
)

POSTGRES_PORT = os.getenv(
    "POSTGRES_PORT",
    "5432"
)

POSTGRES_DB = os.getenv(
    "POSTGRES_DB",
    "medsphere"
)

POSTGRES_USER = os.getenv(
    "POSTGRES_USER",
    "postgres"
)

POSTGRES_PASSWORD = os.getenv(
    "POSTGRES_PASSWORD",
    "postgres"
)


POSTGRES_URL = (
    f"postgresql://"
    f"{POSTGRES_USER}:"
    f"{POSTGRES_PASSWORD}@"
    f"{POSTGRES_HOST}:"
    f"{POSTGRES_PORT}/"
    f"{POSTGRES_DB}"
)


MONGO_URL = os.getenv(
    "MONGO_URI",
    ""
)

MONGO_DATABASE = os.getenv(
    "MONGO_DATABASE",
    "medsphere"
)


AWS_ACCESS_KEY = os.getenv(
    "AWS_ACCESS_KEY",
    ""
)

AWS_SECRET_KEY = os.getenv(
    "AWS_SECRET_KEY",
    ""
)

AWS_REGION = os.getenv(
    "AWS_REGION",
    "ap-south-1"
)

AWS_BUCKET_NAME = os.getenv(
    "AWS_BUCKET_NAME",
    ""
)


UPLOAD_DIRECTORY = os.getenv(
    "UPLOAD_DIRECTORY",
    "uploads"
)


DEEPSEEK_API_KEY = os.getenv(
    "NVIDIA_API_KEY",
    ""
)

DEEPSEEK_MODEL = os.getenv(
    "NVIDIA_MODEL",
    ""
)

DEEPSEEK_BASE_URL = os.getenv(
    "NVIDIA_BASE_URL",
    ""
)


def validate_config():

    required_values = {
        "SECRET_KEY": SECRET_KEY,
        "POSTGRES_URL": POSTGRES_URL,
        "DEEPSEEK_API_KEY": DEEPSEEK_API_KEY,
        "DEEPSEEK_MODEL": DEEPSEEK_MODEL,
        "DEEPSEEK_BASE_URL": DEEPSEEK_BASE_URL
    }

    missing = []

    for key, value in required_values.items():

        if not value:

            missing.append(key)

    if missing:

        print(
            "WARNING: Missing Config ->",
            ", ".join(missing)
        )

    return missing