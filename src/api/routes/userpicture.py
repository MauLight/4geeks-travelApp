from flask import Blueprint, request, jsonify
from api.models import UserPicture
import cloudinary.uploader

bpUP = Blueprint('bpUP', __name__)

@bpUP.route('/userpictures', methods=['GET', 'POST'])
def userpictures():

    if request.method == 'GET':

        # active =  request.args.get('active')
        # if active is not None:
        #   status = True if active == 'true' else False
        userpictures = UserPicture.query.all()
        #   userpictures = Gallery.query.filter_by(active=status)
        userpictures = list(map(lambda imagen: imagen.serialize(), userpictures()))
        return jsonify(userpictures()), 200
        
    else:
        userpictures = list(map(lambda imagen: imagen.serialize(), userpictures()))
        return jsonify(userpictures), 400
        #   userpictures = Gallery.query.all()
        #   userpictures = list(map(lambda imagen: imagen.serialize(), userpictures))

    if request.method == 'POST':
        
        # title = request.form['title']
        # active = request.form['active']
        image = request.files['image']

        resp = cloudinary.uploader.upload(image, folder="picture")

        if not resp: return jsonify({ "msg": "error uploading image"}), 400

        gallery_image = Gallery()
        # gallery_image.title = title
        # gallery_image.active = True if active == 'true' else False
        gallery_image.filename = resp['secure_url']
        gallery_image.save()

        return jsonify(gallery_image.serialize()), 200 


# @bpUP.route('/userpictures/<int:id>', methods=['PUT'])
# def galleries_update_active(id):

#         active = request.json.get('active')

#         gallery_image = Gallery.query.get(id)
#         gallery_image.active = active
#         gallery_image.update()

#         return jsonify(gallery_image.serialize()), 200

