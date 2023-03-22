from app import app
from testapp import testapp
import images
from os import getenv
import boto3, botocore

# S3 config for production
app.config['S3_BUCKET'] = getenv('S3_BUCKET_NAME')
app.config['S3_KEY'] = getenv('AWS_ACCESS_KEY')
app.config['S3_SECRET'] = getenv('AWS_ACCESS_SECRET')
app.config['S3_LOCATION'] = f'https://{app.config["S3_BUCKET"]}.s3.eu-north-1.amazonaws.com'

# S3 config for testing
testapp.config['S3_BUCKET'] = getenv('S3_BUCKET_NAME')
testapp.config['S3_KEY'] = getenv('AWS_ACCESS_KEY')
testapp.config['S3_SECRET'] = getenv('AWS_ACCESS_SECRET')
testapp.config['S3_LOCATION'] = f'https://{testapp.config["S3_BUCKET"]}.s3.eu-north-1.amazonaws.com'

# S3 client for production
s3 = boto3.client(
    "s3",
    aws_access_key_id=app.config['S3_KEY'],
    aws_secret_access_key=app.config['S3_SECRET']
)

# S3 client for testing
tests3 = boto3.client(
    "s3",
    aws_access_key_id=testapp.config['S3_KEY'],
    aws_secret_access_key=testapp.config['S3_SECRET']
)


def upload_file_to_s3(file, environment):
    try:
        if environment == "prod":
            s3.upload_fileobj(
                file,
                app.config["S3_BUCKET"],
                file.filename,
                ExtraArgs={
                    "ContentType": file.content_type
                }
            )
        else:
            tests3.upload_fileobj(
                file,
                testapp.config["S3_BUCKET"],
                file.filename,
                ExtraArgs={
                    "ContentType": file.content_type
                }
            )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    return file.filename

def delete_file_from_s3(filename, environment):
    try:
        if environment == "prod":
            s3.delete_object(
            Bucket=app.config["S3_BUCKET"],
            Key=filename
        )
        else:
            tests3.delete_object(
            Bucket=testapp.config["S3_BUCKET"],
            Key=filename
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    return filename

# no environment needed because this is only used for testing
def delete_multiple_files_from_s3(keys):
    try:
        tests3.delete_objects(
            Bucket=testapp.config["S3_BUCKET"],
            Delete={
                'Objects': keys
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e

    
