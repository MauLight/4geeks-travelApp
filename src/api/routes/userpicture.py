from flask import Blueprint, request, jsonify
from api.models import UserPicture
import cloudinary.uploader

bpUP = Blueprint('bpUP', __name__)


@bpUP.route('/userpictures/<int:user_id>', methods=['GET', 'PUT'])
def getuserpictures(user_id):

  if request.method == 'GET':

    userpictures = UserPicture.query.filter_by(user_id = user_id).first() 
    return jsonify(userpictures.serialize()), 200 
          
  if request.method == 'PUT':
        
    # user_id = request.form['user_id']
    imagen = request.files.getlist("images")

    print(images)
    data = []
    resp = cloudinary.uploader.upload(image, folder="picture")

    if not resp: return jsonify({ "msg": "error uploading image"}), 400
            
    user_picture_image = UserPicture.query.filter_by(user_id = user_id)
    user_picture_image.filename = resp['secure_url']
    user_picture_image.update()
    data.append(user_picture_image.serialize())

    return jsonify(data), 200


@bpUP.route('/userpictures', methods=['POST'])
def userpictures():
        
  user_id = request.form['user_id']
  imagen = request.files.getlist("images")

  print(imagen)
  data = []
  resp = cloudinary.uploader.upload(image, folder="picture")
  if not resp: return jsonify({ "msg": "error uploading image"}), 400
  user_picture_image = UserPicture()
  user_picture_image.filename = resp['secure_url']
  user_picture_image.user_id =user_id
  user_picture_image.save()
  data.append(user_picture_image.serialize())
  return jsonify(data), 200

    

