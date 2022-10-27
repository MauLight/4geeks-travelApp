from flask import Blueprint, request, jsonify
from api.models import User
from werkzeug.security import generate_password_hash, check_password_hash # libreria para encriptar las contraseñas
from flask_jwt_extended import create_access_token, create_refresh_token
import datetime

bpAuth = Blueprint('bpAuth', __name__)

# @bpAuth.route('/register', methods=['POST'])
# def register():

#     username = request.json.get('username') 
#     password = request.json.get('password')
#     active = request.json.get('active', True)

#     if not username: return jsonify({ "status": "error", "code": 400, "message": "Username is required!"}), 400
#     if not password: return jsonify({ "status": "error", "code": 400, "message": "Password is required!"}), 400


#     user = User()
#     user.username = username
#     user.password = generate_password_hash(password)
#     user.active = active
#     user.save()

#     data = {
#         "user": user.serialize()
#     }

#     return jsonify({ "status": "success", "code": 201, "message": "User registered successfully!", "data": data}), 201


@bpAuth.route('/login', methods=['POST'])
def login():

    email = request.json.get('email') 
    password = request.json.get('password')

    if not email: return jsonify({ "status": "error", "code": 400, "message": "E-mail is required!"}), 400
    if not password: return jsonify({ "status": "error", "code": 400, "message": "Password is required!"}), 400

    user = User.query.filter_by(email=email, active=True).first()

    if not user: return jsonify({ "status": "error", "code": 401, "message": "E-mail/Password are incorrects"}), 401
    if (user.password != password): return jsonify({ "status": "error", "code": 401, "message": "E-mail/Password are incorrects"}), 401
# check_password_hash
    expires = datetime.timedelta(hours=3)
    access_token = create_access_token(identity=user.id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify({ "status": "success", "code": 200, "message": "User loggin successfully!", "data": data}), 200