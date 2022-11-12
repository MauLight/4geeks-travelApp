from flask import Blueprint, request, jsonify
from api.models import Gallery, UserPicture
import cloudinary.uploader

bpGI = Blueprint('bpGI', __name__)


@bpGI.route('/galleries', methods=['POST'])
def galleries():

    # return jsonify({"msg": "error uploading image"}), 200
    user_id = request.form['user_id']
    images = request.files.getlist('images')

    print(images)
    data = []

    for image in images:

        print(image)

        resp = cloudinary.uploader.upload(image, folder="gallery")

        if not resp:
            return jsonify({"msg": "error uploading image"}), 400

        gallery_image = Gallery()
        gallery_image.users_id = user_id
        gallery_image.filename = resp['secure_url']
        gallery_image.save()

        data.append(gallery_image.serialize())

    return jsonify(data), 200


@bpGI.route('/galleries/<int:id>', methods=['GET'])
def galleries_get(id):

    if request.method == 'GET':

        if id is not None:
            galleries = Gallery.query.filter_by(users_id = id)
            galleries = list(map(lambda imagen: imagen.serialize(), galleries))
            return jsonify(galleries), 200

