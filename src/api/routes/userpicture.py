from flask import Blueprint, request, jsonify
from api.models import UserPicture
import cloudinary.uploader

bpUP = Blueprint('bpUP', __name__)

@bpUP.route('/userpictures/<int:id>', methods=['GET', 'PUT', 'POST'])
def userpictures():

    if request.method == 'GET':

        userpictures = UserPicture.query.get(id)
        userpictures = list(map(lambda imagen: imagen.serialize(), userpictures()))
        return jsonify(userpictures()), 200
        
   
    if request.method == 'POST':
        

        images = request.files.getlist("images")

        print(images)
        data = []

        for image in images:

          print(image)

          resp = cloudinary.uploader.upload(image, folder="picture")

          if not resp: return jsonify({ "msg": "error uploading image"}), 400

          user_picture_image = UserPicture()
          user_picture_image.filename = resp['secure_url']
          user_picture_image.user_id = id
          user_picture_image.save()

          data.append(user_picture_image.serialize())

        return jsonify(data), 200

      
    if request.method == 'PUT':
        
        images = request.files.getlist("images")

        print(images)
        data = []

        for image in images:

          print(image)

          resp = cloudinary.uploader.upload(image, folder="picture")

          if not resp: return jsonify({ "msg": "error uploading image"}), 400
            
          user_picture_image = UserPicture.query.get(id)
          user_picture_image.filename = resp['secure_url']
          user_picture_image.update()

          data.append(user_picture_image.serialize())

        return jsonify(data), 200



