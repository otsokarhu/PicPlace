from app import app
from flask import render_template, request, session, jsonify, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity
import users
import images
import aws
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

@app.route("/api/upload", methods=["POST"])
@jwt_required()
def upload_file():
    if "file" not in request.files:
        return "No file key in request.files"

    file = request.files["file"]
    description = request.form["description"]
    size = request.form["size"]
    created_by_id = request.form["created_by_id"]

    if file.filename == "":
        return "Please select a file"

    if file:
        output = aws.upload_file_to_s3(file)
        images.upload_image(output, description, size, created_by_id)
        return str(output)

    else:
        return jsonify({"msg": "Something went wrong"}), 400


@app.route("/api/images", methods=["GET"])
@jwt_required()
def get_images():
    all_images = images.get_images()
    return jsonify(all_images)

@app.route("/api/images/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_image(id):
    current_user = get_jwt_identity()
        
    if not images.check_image_owner(id, current_user):
        if not users.check_if_admin(current_user):
          return jsonify({"msg": "You are not the owner of this image nor admin"}), 400
    
    images.delete_image(id)

    return jsonify({"msg": "Image deleted"}), 200
    


   







  
  



