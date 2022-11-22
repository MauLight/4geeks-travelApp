from flask import Blueprint, jsonify, request
from api.models import Matches

bpMath = Blueprint('bpMath', __name__)


@bpMath.route('/matches', methods=['GET'])
def all_matches():
    matches = Matches.query.all()
    matches = list(map(lambda match: match.serialize(), matches))
    return jsonify(matches), 200


@bpMath.route('/matches', methods=['POST'])  # type: ignore
def store_match():
    users_id = request.json.get('users_id')
    match_id = request.json.get('match_id')

    match = Matches()
    match.users_id = users_id
    match.match_id = match_id
    match.save()

    return jsonify(match.serialize()), 201


@bpMath.route('/matches/<int:id>/delete', methods=['DELETE'])
def delete_match(id):
    match = Matches.query.get(id)
    match.delete()
    return jsonify({"message": "Match deleted"}), 200
