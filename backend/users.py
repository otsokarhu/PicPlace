import os
from flask import  jsonify
from db import db
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.sql import text
from app import app
from flask_jwt_extended import create_access_token, get_jwt_identity, JWTManager

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)

def register(username, password, admin):
    hash_value = generate_password_hash(password) 

    if check_username(username):
      return jsonify({"msg": "Username already taken"}), 400

    sql = text(
        "INSERT INTO users (username, password, admin) VALUES (:username, :password, :admin)")
    

    db.session.execute(
        sql, {"username": username, "password": hash_value, "admin": admin})
    
    db.session.commit()

    status = "login successful"

    return jsonify(username=username, admin=admin, status=status ), 200

def login(username, password):
 
  sql = text("SELECT id, password, admin, username FROM users WHERE username=:username")
  result = db.session.execute(sql, {"username": username})
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

def protected():
  current_user = get_jwt_identity()
  return jsonify(logged_in_as=current_user), 200

def check_user(id):
  sql = text("SELECT id FROM users WHERE id=:id")

  if db.session.execute(sql, {"id": id}).fetchone():
    return True

  return False

def check_username(username):
  sql = text("SELECT id FROM users WHERE username=:username")

  if db.session.execute(sql, {"username": username}).fetchone():
    return True

  return False

def get_user_by_username(username):
  sql = text("SELECT id FROM users WHERE username=:username")

  return db.session.execute(sql, {"username": username}).fetchone()

def check_if_admin(username):
  sql = text("SELECT admin FROM users WHERE username=:username")

  return db.session.execute(sql, {"username": username}).fetchone()[0]


