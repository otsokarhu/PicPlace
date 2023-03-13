from flask import Flask
from os import getenv

app = Flask(__name__)  
app.secret_key = getenv("SECRET_KEY") # This is a secret key for the session

import routes # This is the routes.py file