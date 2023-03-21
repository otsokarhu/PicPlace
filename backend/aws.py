from app import app
from os import getenv
import boto3, botocore

app.config['S3_BUCKET'] = getenv('S3_BUCKET_NAME')
app.config['S3_KEY'] = getenv('AWS_ACCESS_KEY')
app.config['S3_SECRET'] = getenv('AWS_ACCESS_SECRET')
app.config['S3_LOCATION'] = f'https://{app.config["S3_BUCKET"]}.s3.eu-north-1.amazonaws.com'

s3 = boto3.client(
    "s3",
    aws_access_key_id=app.config['S3_KEY'],
    aws_secret_access_key=app.config['S3_SECRET']
)

def upload_file_to_s3(file):
    try:
        s3.upload_fileobj(
            file,
            app.config["S3_BUCKET"],
            file.filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    return file.filename

def delete_file_from_s3(filename):
    try:
        s3.delete_object(
            Bucket=app.config["S3_BUCKET"],
            Key=filename
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    return filename
