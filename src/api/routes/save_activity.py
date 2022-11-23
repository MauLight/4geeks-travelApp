from flask import Blueprint, jsonify, request
from api.models import SaveActivity

bpSav = Blueprint('bpSav', __name__)


@bpSav.route('/saveactivity', methods=['GET'])
def all_saved_activities():
    saved_activities = SaveActivity.query.all()
    saved_activities = list(
        map(lambda saved_act: saved_act.serialize(), saved_activities))
    return jsonify(saved_activities), 200


@bpSav.route('/saveactivity', methods=['POST'])  # type: ignore
def store_savedactivity():
    users_id = request.json.get('users_id')
    activity_id = request.json.get('activity_id')

    savedactivity = SaveActivity()
    savedactivity.users_id = users_id
    savedactivity.activity_id = activity_id
    savedactivity.save()

    return jsonify(savedactivity.serialize()), 201


@bpSav.route('/saveactivity/<int:id>/delete', methods=['DELETE'])
def delete_savedactivity(id):
    savedactivity = SaveActivity.query.get(id)
    savedactivity.delete()
    return jsonify({"message": "Activity deleted"}), 200
