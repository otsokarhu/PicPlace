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
    admin = data["admin"]

    if len(username) < 3:
      return jsonify({"msg": "Username must be at least 3 characters long"}), 400

    if len(password) < 4 or len(password) == 0:
      return jsonify({"msg": "Password must be at least 4 characters long"}), 400

        

    return users.register(username, password, admin)

  

@app.route("/api/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data["username"]
  password = data["password"]

  return users.login(username, password)





  
  



