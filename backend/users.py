import os
from flask import  jsonify
from db import db, testdb
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.sql import text
from app import app
from testapp import testapp
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

# for testing
testapp.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(testapp)


# Registers user to db and creates hashpassword
def register(username, password, admin, environment):
    hash_value = generate_password_hash(password) 

    if check_username(username, environment):
      return jsonify({"msg": "Username already taken"}), 400

    sql = text(
        "INSERT INTO users (username, password, admin) VALUES (:username, :password, :admin)")
    
    if environment == "prod":
      db.session.execute(
          sql, {"username": username, "password": hash_value, "admin": admin})
      db.session.commit()
    else:
      testdb.session.execute(
          sql, {"username": username, "password": hash_value, "admin": admin})
      testdb.session.commit()

    status = "login successful"

    return jsonify(username=username, admin=admin, status=status ), 200


#Login function that creates jwt token for the session
def login(username, password, environment):
 
  sql = text("SELECT id, password, admin, username FROM users WHERE username=:username")
  if environment == "prod":
    result = db.session.execute(sql, {"username": username})
  else:
    result = testdb.session.execute(sql, {"username": username})
  user = result.fetchone()
  if not user:
    return jsonify({"msg": "Incorrect username or password"}), 401
  else:
    hash_value = user[1]
    if not check_password_hash(hash_value, password):
      return jsonify({"msg": "Incorrect username or password"}), 401

    access_token = create_access_token(identity=username)
    admin = user[2]
    id = user[0]
    username = user[3]
    
    return jsonify(access_token=access_token, admin=admin, username=username, id=id), 200


# Checks if user exists in db
def check_user(id, environment):
  sql = text("SELECT id FROM users WHERE id=:id")

  if environment == "prod":
    if db.session.execute(sql, {"id": id}).fetchone():
      return True
  elif testdb.session.execute(sql, {"id": id}).fetchone():
    return True

  return False


# Checks if username is in db
def check_username(username, environment):
  sql = text("SELECT id FROM users WHERE username=:username")

  if environment == "prod":
    if db.session.execute(sql, {"username": username}).fetchone():
      return True
  
  elif testdb.session.execute(sql, {"username": username}).fetchone():
    return True

  return False


# Returns users id from db when you give username to it
def get_user_by_username(username, environment):
  sql = text("SELECT id FROM users WHERE username=:username")

  if environment == "prod":
    return db.session.execute(sql, {"username": username}).fetchone()
  else:
    return testdb.session.execute(sql, {"username": username}).fetchone()


def check_if_admin(username, environment):
  sql = text("SELECT admin FROM users WHERE username=:username")

  if environment == "prod":
    return db.session.execute(sql, {"username": username}).fetchone()[0]
  else: 
    return testdb.session.execute(sql, {"username": username}).fetchone()[0]


def delete_all_users():
  sql = text("DELETE FROM users")
  testdb.session.execute(sql)
  testdb.session.commit()
  