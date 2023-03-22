from os import getenv
from app import app
from testapp import testapp

from flask_sqlalchemy import SQLAlchemy

app.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_URL").replace("://", "ql://", 1)

db = SQLAlchemy(app, engine_options={"pool_pre_ping": True}) 

testapp.config["SQLALCHEMY_DATABASE_URI"] = getenv("DATABASE_TEST_URL")
testdb = SQLAlchemy(testapp)