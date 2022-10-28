from flask import Blueprint, request, jsonify
from api.models import User
from werkzeug.security import generate_password_hash, check_password_hash # libreria para encriptar las contraseñas
from flask_jwt_extended import create_access_token, create_refresh_token


bpAuth = Blueprint('bpAuth', __name__)

@bpAuth.route('/login', methods=['POST'])
def login():

    email = request.json.get('email') 
    password = request.json.get('password')

    if not email: return jsonify({ "status": "error", "code": 400, "message": "E-mail is required!"}), 400
    if not password: return jsonify({ "status": "error", "code": 400, "message": "Password is required!"}), 400

    user = User.query.filter_by(email=email).first()

    if not user: return jsonify({ "status": "error", "code": 401, "message": "E-mail/Password are incorrects"}), 401
    if not check_password_hash(user.password, password): return jsonify({ "status": "error", "code": 401, "message": "E-mail/Password are incorrects"}), 401

    expires = datetime.timedelta(hours=3)
    access_token = create_access_token(identity=user.id, expires_delta=expires)

    data = {
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify({ "status": "success", "code": 200, "message": "User loggin successfully!", "data": data}), 200