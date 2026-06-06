import os

from dotenv import load_dotenv


BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

load_dotenv(os.path.join(BASE_DIR, ".env"))

POSTGRES_HOST = os.getenv("POSTGRES_HOST")

POSTGRES_PORT = os.getenv("POSTGRES_PORT")

POSTGRES_DB = os.getenv("POSTGRES_DB")

POSTGRES_USER = os.getenv("POSTGRES_USER")

POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")

POSTGRES_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"

MONGO_URL = os.getenv("MONGO_URI")

JWT_SECRET = os.getenv("SECRET_KEY")

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")

AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")

AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

AWS_REGION = os.getenv("AWS_REGION")