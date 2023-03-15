from app import app
from flask import render_template, request, session, jsonify
from flask_jwt_extended import jwt_required
import users
from db import db

@app.route("/")
def index():
  return 'Hello world'

@app.route("/api/register", methods=['POST'])
def register():
  if request.method == "POST":
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    password2 = data["password2"]
    admin = data["admin"]

    if len(username) < 3:
      return jsonify({"msg": "Username must be at least 3 characters long"}), 400

    if len(password) < 6 or len(password) == 0:
      return jsonify({"msg": "Password must be at least 6 characters long"}), 400

    if password != password2:
      return jsonify({"msg": "Passwords do not match"}), 400

    if not users.register(username, password, admin):
      return jsonify({"msg": "Registration failed"}), 400

    return jsonify({"msg": "Registration successful"}), 200

  

@app.route("/api/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data["username"]
  password = data["password"]

  return users.login(username, password)





  
  



