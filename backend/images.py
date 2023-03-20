import os
from flask import  jsonify
from db import db
import users
from sqlalchemy.sql import text

def upload_image(path, description, size, created_by_id):
  if not users.check_user(created_by_id):
    return jsonify({"msg": "User not found"}), 400
  sql = text("INSERT INTO images (path, description, size, created_by_id) VALUES (:path, :description, :size, :created_by_id)")

  db.session.execute(sql, {"path": path, "description": description, "size": size, "created_by_id": created_by_id})

  db.session.commit()

  return jsonify({"msg": "Image uploaded"}), 200

def get_images():
  sql = text("SELECT * FROM images")

  images = db.session.execute(sql).fetchall()
  result = []

  for row in images:
    image_dict = {
      'image_id': row[0],
      'path': row[1],
      'description': row[2],
      'size': row[3],
      'created_by_id': row[4]
    }
    result.append(image_dict)

  return result







  



