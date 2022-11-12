from flask import Blueprint, request, jsonify
from api.models import UserPicture
import cloudinary.uploader

bpUP = Blueprint('bpUP', __name__)

@bpUP.route('/userpictures', methods=['POST'])
def userpictures():

    user_id = request.form['user_id']
    image = request.files["image"]
    # print(request.files.getlist("image"))
    # return jsonify({"msg": "error uploading image"}), 400

    resp = cloudinary.uploader.upload(image, folder="picture")
    if not resp: return jsonify({"msg": "error uploading image"}), 400
    user_picture_image = UserPicture()
    user_picture_image.filename = resp['secure_url']
    user_picture_image.users_id = user_id
    user_picture_image.save()
    return jsonify(user_picture_image.serialize()), 200


@bpUP.route('/userpictures/<int:user_id>', methods=['GET', 'PUT'])
def getuserpictures(user_id):

    if request.method == 'GET':
        
        if user_id is not None :
            userpictures = UserPicture.query.filter_by(users_id=user_id).first()
            if not userpictures : return jsonify({ "msg": "User without photo!"}), 400
            return jsonify(userpictures.serialize()), 200
        else: return jsonify({ "msg": "user_id not Exist!"}), 400

    if request.method == 'PUT':

        # user_id = request.form['user_id']
        imagen = request.files.getlist("image")

        print(images)
        data = []
        resp = cloudinary.uploader.upload(image, folder="picture")

        if not resp: return jsonify({ "msg": "error uploading image"}), 400
                    
        user_picture_image = UserPicture.query.filter_by(users_id = user_id)
        user_picture_image.filename = resp['secure_url']
        user_picture_image.update()
        data.append(user_picture_image.serialize())
        return jsonify(data), 200


