from flask import Blueprint, jsonify, request

from api.models import Activities


bpAct = Blueprint('bpAct', __name__)


@bpRec.route('/activities', methods=['GET'])  # type: ignore
def all_activities():
    activities = Activities.query.all()
    activities = list(map(lambda activity: activity.serialize(), activities))
    return jsonify(activities), 200


@bpRec.route('/activities', methods=['POST'])  # type: ignore
def store_activity():
    name = request.json.get('name')
    url_img = request.json.get('url_img')
    description = request.json.get('description')
    activity = request.json.get('activity')
    city = request.json.get('city')
    country = request.json.get('country')

    activity = Activities()
    activity.name = name
    activity.url_img = url_img
    activity.description = description
    activity.activity = activity
    activity.city = city
    activity.country = country
    activity.save()

    return jsonify(activity.serialize()), 201


@bpRec.route('/activities/<int:id>/delete', methods=['DELETE'])
def delete_activity(id):
    activity = Activities.query.get(id)
    activity.delete()
    return jsonify({"message": "Activity Deleted!"}), 200
