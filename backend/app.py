from flask import Flask
from os import getenv
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes
app.secret_key = getenv("SECRET_KEY") # This is a secret key for the session



import routes
