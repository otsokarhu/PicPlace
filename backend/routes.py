from app import app
from testapp import testapp
from flask import render_template, request, session, jsonify, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity
import users
import images
import aws
from db import db

# Production-environment: register endpoint
@app.route("/api/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    admin = data["admin"]
    environment = "prod"

    if len(username) < 3:
      return jsonify({"msg": "Username must be at least 3 characters long"}), 400

    if len(password) < 4 or len(password) == 0:
      return jsonify({"msg": "Password must be at least 4 characters long"}), 400

    return users.register(username, password, admin, environment)

# Test-environment: register endpoint
@testapp.route("/api/register", methods=['POST'])
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    admin = data["admin"]
    environment = "test"

    if len(username) < 3:
      return jsonify({"msg": "Username must be at least 3 characters long"}), 400

    if len(password) < 4 or len(password) == 0:
      return jsonify({"msg": "Password must be at least 4 characters long"}), 400

    return users.register(username, password, admin, environment)
  
  
# Production-environment: login endpoint
@app.route("/api/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data["username"]
  password = data["password"]
  environment = "prod"


  return users.login(username, password, environment)

# Test-environment: login endpoint
@testapp.route("/api/login", methods=["POST"])
def login():
  data = request.get_json()
  username = data["username"]
  password = data["password"]
  environment = "test"


  return users.login(username, password, environment)

# Production-environment: image upload endpoint
@app.route("/api/upload", methods=["POST"])
@jwt_required()
def upload_file():
    if "file" not in request.files:
        return "No file key in request.files"

    file = request.files["file"]
    description = request.form["description"]
    size = request.form["size"]
    created_by_id = request.form["created_by_id"]
    environment = "prod"

    if file.filename == "":
        return "Please select a file"

    if file:
        output = aws.upload_file_to_s3(file)
        images.upload_image(output, description, size, created_by_id, environment)
        return str(output)

    else:
        return jsonify({"msg": "Something went wrong"}), 400

# Test-environment: image upload endpoint
@testapp.route("/api/upload", methods=["POST"])
@jwt_required()
def upload_file():
    if "file" not in request.files:
        return "No file key in request.files"

    file = request.files["file"]
    description = request.form["description"]
    size = request.form["size"]
    created_by_id = request.form["created_by_id"]
    environment = "test"

    if file.filename == "":
        return "Please select a file"

    if file:
        output = aws.upload_file_to_s3(file)
        images.upload_image(output, description, size, created_by_id, environment)
        return str(output)

    else:
        return jsonify({"msg": "Something went wrong"}), 400


# Production-environment: get all images endpoint
@app.route("/api/images", methods=["GET"])
@jwt_required()
def get_images():
    environment = "prod"
    all_images = images.get_images(environment)
    return jsonify(all_images)

# Test-environment: get all images endpoint
@testapp.route("/api/images", methods=["GET"])
@jwt_required()
def get_images():
    environment = "test"
    all_images = images.get_images(environment)
    return jsonify(all_images)


# Production-env: delete image by id endpoint
@app.route("/api/images/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_image(id):
    current_user = get_jwt_identity()
    environment = "prod"
        
    if not images.check_image_owner(id, current_user, environment):
        if not users.check_if_admin(current_user, environment):
          return jsonify({"msg": "You are not the owner of this image nor admin"}), 400
    
    images.delete_image(id, environment)

    return jsonify({"msg": "Image deleted"}), 200
    

# Test-environment: delete image by id endpoint
@testapp.route("/api/images/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_image(id):
    current_user = get_jwt_identity()
    environment = "test"
        
    if not images.check_image_owner(id, current_user, environment):
        if not users.check_if_admin(current_user, environment):
          return jsonify({"msg": "You are not the owner of this image nor admin"}), 400
    
    images.delete_image(id, environment)

    return jsonify({"msg": "Image deleted"}), 200

@testapp.route("/test", methods=["GET"])
def index():
    return "<b>Tervetuloa</b> <i>sovellukseen</i>!"




   







  
  



