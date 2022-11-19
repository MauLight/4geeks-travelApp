from flask import Blueprint, jsonify, request
from api.models import Matches

bpMath = Blueprint('bpMath', __name__)

@bpMath.route('/matches', methods=['GET'])
def all_matches():
    matches = Matches.query.all()
    matches = list(map(lambda match: match.serialize(), matches))
    return jsonify(matches), 200

@bpMath.route('/matches/<int:users_id>', methods=['GET'])
def get_matches_by_user_id(users_id):
    matches = Matches.query.get(users_id)
    matches = list(map(lambda match: match.serialize(), matches))
    return jsonify(matches), 200

@bpMath.route('/matches/<int:id>/delete', methods= ['DELETE'])
def delete_match(id):
    match = Matches.query.get(id)
    match.delete()
    return jsonify({"message": "Match deleted"}), 200