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

    # Generate a hash value for the password
    hash_value = generate_password_hash(password) 

    # Check if username already exists
    sql2 = text("SELECT id FROM users WHERE username=:username")
    if db.session.execute(sql2, {"username": username}).fetchone():
        # Return False if the username already exists
        return False

    # Insert new user to database
    sql = text(
        "INSERT INTO users (username, password, admin) VALUES (:username, :password, :admin)")
    
    # Execute the SQL query
    db.session.execute(
        sql, {"username": username, "password": hash_value, "admin": admin})
    
    # Commit the changes to the database
    db.session.commit()

    # Return True if the user was successfully registered
    return True

def login(username, password):
  # Check if user exists
  sql = text("SELECT id, password, admin FROM users WHERE username=:username")
  result = db.session.execute(sql, {"username": username})
  user = result.fetchone()
  if not user:
    # Return error if the username does not exist
    return jsonify({"msg": "Incorrect username or password"}), 401
  else:
    hash_value = user[1]
    # Check if the password is correct
    if not check_password_hash(hash_value, password):
      return jsonify({"msg": "Incorrect username or password"}), 401

    # Create a new jwt
    access_token = create_access_token(identity=username)
    
    return jsonify(access_token=access_token)

def protected():
  # Get the current user
  current_user = get_jwt_identity()
  return jsonify(logged_in_as=current_user), 200



