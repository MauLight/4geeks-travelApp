from flask import Blueprint, jsonify, request
from api.models import User, Trips
from werkzeug.security import generate_password_hash, check_password_hash # libreria para encriptar las contraseñas
from flask_jwt_extended import create_access_token, create_refresh_token


bpUser = Blueprint('bpUser', __name__)

#GET ENDPOINTS

#GET ALL USERS
@bpUser.route('/users', methods=['GET'])  # type: ignore
def all_users():
    users= User.query.all()
    users= list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

#GET USER BY ID
@bpUser.route('/users/<int:id>', methods= ['GET'])  # type: ignore
def user_by_id(id):
    user= User.query.get(id)
    return jsonify(user.serialize()), 200

#GET ALL USERS AND THEIR TRIPS
@bpUser.route('/users/mytrips', methods=['GET'])  # type: ignore
def all_users_with_trips():
    users= User.query.all()
    users= list(map(lambda user: user.serialize_with_trips(), users))
    return jsonify(users), 200

#GET USER AND TRIPS BY USER ID
@bpUser.route('/users/<int:id>/mytrips', methods=['GET'])  # type: ignore
def user_with_trips_with_id(id):
    user= User.query.get(id)
    return jsonify(user.serialize_with_trips()), 200

#POST ENDPOINTS

#POST NEW USER
@bpUser.route('/users', methods=['POST'])  # type: ignore
def store_user():
    id = request.json.get('id')
    firstname = request.json.get('firstname') # type: ignore
    lastname = request.json.get('lastname') # type: ignore
    birthdate = request.json.get('birthdate') # type: ignore
    email = request.json.get('email') # type: ignore
    password = request.json.get('password') # type: ignore
    languages = request.json.get('languages') # type: ignore
    gender = request.json.get('gender') # type: ignore
    countryofresidence = request.json.get('countryofresidence') # type: ignore
    instagram = request.json.get('instagram') # type: ignore
    facebook = request.json.get('facebook') # type: ignore
    twitter = request.json.get('twitter') # type: ignore
    verified = request.json.get('verified') # type: ignore

##### 
    user = User()
    user.id = id
    user.firstname = firstname
    user.lastname = lastname
    user.birthdate = birthdate
    user.email = email
    user.password = generate_password_hash(password)
    user.languages = languages
    user.gender = gender
    user.countryofresidence = countryofresidence
    user.instagram = instagram
    user.facebook = facebook
    user.twitter = twitter
    user.verified = verified
    user.save()

    return jsonify(user.serialize()), 201

#POST NEW TRIP BY USER ID
@bpUser.route('/users/<int:id>/mytrips', methods=['POST'])
def store_mytrip_by_user_id(id):
    user = User.query.get(id)

    travelling = request.json.get('travelling') # type: ignore
    with_children = request.json.get('with_children') # type: ignore
    gender_specific = request.json.get('gender_specific') # type: ignore
    stay = request.json.get('stay') # type: ignore
    budget = request.json.get('budget') # type: ignore
    activities = request.json.get('activities') # type: ignore
    partner_age = request.json.get('partner_age') # type: ignore
    users_id = request.json.get('users_id') # type: ignore

    mytrips = Trips()
    mytrips.travelling = travelling
    mytrips.with_children = with_children
    mytrips.gender_specific = gender_specific
    mytrips.stay = stay
    mytrips.budget = budget
    mytrips.activities = activities
    mytrips.partner_age = partner_age
    mytrips.users_id = users_id
    user.mytrips.append(mytrips)
    user.update()

    return jsonify(user.serialize_with_trips()), 200


#PUT ENDPOINTS

#UPDATE USER BY ID
@bpUser.route('/users/<int:id>/update', methods = ['PUT'])
def update_user(id):
    
    firstname = request.json.get('firstname') # type: ignore
    lastname = request.json.get('lastname') # type: ignore
    birthdate = request.json.get('birthdate') # type: ignore
    email = request.json.get('email') # type: ignore
    password = request.json.get('password') # type: ignore
    verified = request.json.get('verified')  # type: ignore

    user = User.query.get(id)
    user.firstname = firstname
    user.lastname = lastname
    user.birthdate = birthdate
    user.email = email
    user.password = password
    user.verified = verified

    user.save()
    return jsonify(user.serialize()), 200

#UPDATE TRIPS BY USER ID AND TRIP ID
@bpUser.route('/users/<int:id>/mytrips/<int:mytrips_id>/update', methods=['PUT'])
def update_mytrip_by_user_id_and_trip_id(id, mytrips_id):
    mytrips = Trips.query.filter_by(users_id=id, id=mytrips_id).first()

    travelling = request.json.get('travelling') # type: ignore
    with_children = request.json.get('with_children') # type: ignore
    gender_specific = request.json.get('gender_specific') # type: ignore
    stay = request.json.get('stay') # type: ignore
    budget = request.json.get('budget') # type: ignore
    activities = request.json.get('activities')
    partner_age = request.json.get('partner_age') # type: ignore
    users_id = request.json.get('users_id') # type: ignore

    mytrips = Trips.query.get(mytrips_id)
    mytrips.travelling = travelling
    mytrips.with_children = with_children
    mytrips.gender_specific = gender_specific
    mytrips.stay = stay
    mytrips.budget = budget
    mytrips.activities = activities
    mytrips.partner_age = partner_age
    mytrips.users_id = users_id

    mytrips.save()
    return jsonify(mytrips.serialize_with_activities()), 200


