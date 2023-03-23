from os import getenv
from app import app
from testapp import testapp

from flask_sqlalchemy import SQLAlchemy

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL")

db = SQLAlchemy(app) 

testapp.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_TEST_URL")
testdb = SQLAlchemy(testapp)