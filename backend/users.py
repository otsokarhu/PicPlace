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

    sql2 = text("SELECT id FROM users WHERE username=:username")
    if db.session.execute(sql2, {"username": username}).fetchone():
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



