# from flask import Blueprint, request, jsonify
# from api.models import Gallery
# import cloudinary.uploader

# bpGI = Blueprint('bpGI', __name__)

# @bpGI.route('/galleries', methods=['GET', 'POST'])
# def galleries():

#     if request.method == 'GET':

#         active =  request.args.get('active')
#         if active is not None:
#           status = True if active == 'true' else False
#           galleries = Gallery.query.filter_by(active=status)
#           galleries = list(map(lambda imagen: imagen.serialize(), galleries))
#           return jsonify(galleries), 200

#         else:
#           galleries = Gallery.query.all()
#           galleries = list(map(lambda imagen: imagen.serialize(), galleries))
#           return jsonify(galleries), 200

#     if request.method == 'POST':

#         title = request.form['title']
#         active = request.form['active']
#         images = request.files.getlist("images")

#         print(images)
#         data = []

#         for image in images:

#           print(image)

#           resp = cloudinary.uploader.upload(image, folder="gallery")

#           if not resp: return jsonify({ "msg": "error uploading image"}), 400

#           gallery_image = Gallery()
#           gallery_image.title = title
#           gallery_image.active = True if active == 'true' else False
#           gallery_image.filename = resp['secure_url']
#           gallery_image.save()

#           data.append(gallery_image.serialize())

#         return jsonify(data), 200

# @bpGI.route('/galleries/<int:id>', methods=['PUT'])
# def galleries_update_active(id):

#         active = request.json.get('active')

#         gallery_image = Gallery.query.get(id)
#         gallery_image.active = active
#         gallery_image.update()

#         return jsonify(gallery_image.serialize()), 200

from flask import Blueprint, request, jsonify
from api.models import Gallery, UserPicture
import cloudinary.uploader

bpGI = Blueprint('bpGI', _name_)


@bpGI.route('/galleries', methods=['POST'])
def galleries():

    if request.method == 'POST':

        user_id = request.args.get('user_id')
        images = request.files.getlist('images')
        # debo modificar algo al sacar multiple desde el input correspondiente??
        imageUser = request.files.getlist('imageUser')

        print(images)
        print(imageUser)
        data = []

        resp1 = cloudinary.uploader.upload(imageUser, folder="picture")

        if not resp1:
            return jsonify({"msg": "error uploading image"}), 400

        user_picture_image = UserPicture()
        user_picture_image.filename = resp1['secure_url']
        user_picture_image.user_id = user_id
        user_picture_image.save()

        data.append(user_picture_image.serialize())

        for image in images:

            print(image)

            resp2 = cloudinary.uploader.upload(image, folder="gallery")

            if not resp2:
                return jsonify({"msg": "error uploading image"}), 400

            gallery_image = Gallery()
            # gallery_image.title = title
            # gallery_image.active = True if active == 'true' else False
            gallery_image.filename = resp2['secure_url']
            gallery_image.save()

            data.append(gallery_image.serialize())

        return jsonify(data), 200


@bpGI.route('/galleries/<int:id o user_id>', methods=['GET'])
def galleries_get():

    if request.method == 'GET':

      # data = []
        user_id = request.args.get('user_id')
        if user_id is not None:
            user_picture_image = UserPicture.query.filter_by(user_id=users_id)
            user_picture_image = list(
                map(lambda imagen: imagen.serialize(), userpictures))

            galleries = Gallery.query.filter_by(user_id=users_id)
            galleries = list(map(lambda imagen: imagen.serialize(), galleries))

            return jsonify(user_picture_image, galleries), 200
