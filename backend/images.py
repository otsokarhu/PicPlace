import os
from flask import  jsonify
from db import db
import users
import aws
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
      'id': row[0],
      'path': row[1],
      'description': row[2],
      'size': row[3],
      'created_by_id': row[4]
    }
    result.append(image_dict)

  return result

def get_image_creator(id):
  sql = text("SELECT created_by_id FROM images WHERE id = :id")

  user_id = db.session.execute(sql, {"id": id}).fetchone()

  return user_id[0]

  
def get_image_name(id):
  sql = text("SELECT path FROM images WHERE id = :id")

  image_name = db.session.execute(sql, {"id": id}).fetchone()

  return image_name[0]

 
def delete_image(id):
  image_name = get_image_name(id)

  sql = text("DELETE FROM images WHERE id = :id")

  db.session.execute(sql, {"id": id})

  db.session.commit()

  aws.delete_file_from_s3(image_name)

  return jsonify({"msg": "Image deleted"}), 200


def check_image_owner(image_id, username):
  user_id = users.get_user_by_username(username)[0]

  image = get_image_creator(image_id)

  return image == user_id
    











  



