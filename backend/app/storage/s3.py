import uuid

import boto3

from fastapi import HTTPException

from app.core.config import AWS_ACCESS_KEY
from app.core.config import AWS_SECRET_KEY
from app.core.config import AWS_REGION
from app.core.config import AWS_BUCKET_NAME


s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name=AWS_REGION
)


def upload_file(file):

    try:

        extension = ""

        if "." in file.filename:

            extension = (
                file.filename
                .split(".")
                [-1]
            )

        unique_filename = (
            f"reports/"
            f"{uuid.uuid4()}"
            f".{extension}"
        )

        s3_client.upload_fileobj(
            file.file,
            AWS_BUCKET_NAME,
            unique_filename
        )

        file_url = (
            f"https://"
            f"{AWS_BUCKET_NAME}"
            f".s3."
            f"{AWS_REGION}"
            f".amazonaws.com/"
            f"{unique_filename}"
        )

        return file_url

    except Exception as error:

        print(
            "S3 UPLOAD ERROR:",
            str(error)
        )

        raise HTTPException(
            status_code=500,
            detail="File upload failed"
        )