from flask import Flask
from os import getenv
from flask_cors import CORS

# create a test app for testing purposes to have a separate database
testapp = Flask(__name__)
CORS(testapp)
testapp.secret_key = getenv("SECRET_KEY")

import routes