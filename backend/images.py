import os
from flask import  jsonify
from db import db, testdb
import users
import aws
from sqlalchemy.sql import text

def upload_image(path, description, size, created_by_id, environment):
  # Check if user exists
  if not users.check_user(created_by_id, environment):
    return jsonify({"msg": "User not found"}), 400
  sql = text("INSERT INTO images (path, description, size, created_by_id) VALUES (:path, :description, :size, :created_by_id)")

  # prod
  if environment == "prod":
    db.session.execute(sql, {"path": path, "description": description, "size": size, "created_by_id": created_by_id})
    db.session.commit()
  # test
  else:
    testdb.session.execute(sql, {"path": path, "description": description, "size": size, "created_by_id": created_by_id})
    testdb.session.commit()

  return jsonify({"msg": "Image uploaded"}), 200

# function that gets all images
def get_images(environment):
  sql = text("SELECT * FROM images")

  if environment == "prod":
    images = db.session.execute(sql).fetchall()
  else:
    images = testdb.session.execute(sql).fetchall()

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


# gets id of the user that uploaded the picture
def get_image_creator(id, environment):
  sql = text("SELECT created_by_id FROM images WHERE id = :id")

  if environment == "prod":
    user_id = db.session.execute(sql, {"id": id}).fetchone()
  else:
    user_id = testdb.session.execute(sql, {"id": id}).fetchone()

  return user_id[0]

  
def get_image_name(id, environment):
  sql = text("SELECT path FROM images WHERE id = :id")


  if environment == "prod":
    image_name = db.session.execute(sql, {"id": id}).fetchone()
  else:
    image_name = testdb.session.execute(sql, {"id": id}).fetchone()

  return image_name[0]

 
def delete_image(id, environment):
  image_name = get_image_name(id, environment)

  sql = text("DELETE FROM images WHERE id = :id")

  if environment == "prod":
    db.session.execute(sql, {"id": id})

    db.session.commit()
  
  else:
    testdb.session.execute(sql, {"id": id})

    testdb.session.commit()

  aws.delete_file_from_s3(image_name, environment)

  return jsonify({"msg": "Image deleted"}), 200


# checks if user is owner of the image
def check_image_owner(image_id, username, environment):
  user_id = users.get_user_by_username(username, environment)[0]

  image = get_image_creator(image_id, environment)

  return image == user_id

# no environment needed because this is only for testing
def get_image_keys():
    sql = text("SELECT path FROM images")
    images = testdb.session.execute(sql).fetchall()

    result = []

    for row in images:
        result.append({
            'Key': row[0]
        })

    return result
    
# no environment needed because this is only for testing
def delete_all_images():
  keys = get_image_keys()
  if len(keys) == 0:
    return 
  sql = text("DELETE FROM images")
  testdb.session.execute(sql)
  testdb.session.commit()
  aws.delete_multiple_files_from_s3(keys)
  return 











  



