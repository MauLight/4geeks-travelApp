from flask import Blueprint, jsonify, request

from api.models import Country, City, Trekking, Gastronomy, Cultural, Nightlife, Shopping


bpRec = Blueprint('bpRec', __name__)


@bpRec.route('/country', methods=['GET'])  # type: ignore
def all_countries():
    countries = Country.query.all()
    countries = list(map(lambda country: country.serialize(), countries))
    return jsonify(countries), 200


@bpRec.route('/country', methods=['POST'])  # type: ignore
def store_country():
    id = request.json.get('id')
    name = request.json.get('name')

    country = Country()
    country.id = id
    country.name = name
    country.save()

    return jsonify(country.serialize()), 201


@bpRec.route('/country/<int:id>/city', methods=['GET'])  # type: ignore
def city_by_country_id(id):
    city = Country.query.get(id)
    return jsonify(city.serialize_with_cities()), 200


@bpRec.route('/country/<int:id>/city', methods=['POST'])
def store_city_by_country_id(id):
    country = Country.query.get(id)

    id = request.json.get('id')  # type: ignore
    name = request.json.get('name')  # type: ignore
    country_id = request.json.get('country_id')  # type: ignore

    city = City()
    city.id = id
    city.name = name
    city.country_id = country_id
    country.cities.append(city)
    country.update()

    return jsonify(country.serialize_with_cities()), 200


@bpRec.route('/country/<int:id>/city/<int:city_id>/trekking', methods=['GET'])
def get_city_with_trekking_by_country_id_and_city_id(id, city_id):
    city = City.query.filter_by(country_id=id, id=city_id).first()
    return jsonify(city.serialize_with_trekking()), 200


@bpRec.route('/country/<int:id>/city/<int:city_id>/trekking', methods=['POST'])
def store_trekking_by_city_by_country_id(id, city_id):
    city = City.query.filter_by(country_id=id, id=city_id).first()

    id = request.json.get('id')
    name = request.json.get('name')
    url_img = request.json.get('url_img')
    description = request.json.get('description')
    city_id = request.json.get('city_id')

    trekking = Trekking()
    trekking.name = name
    trekking.url_img = url_img
    trekking.description = description
    trekking.city_id = city_id
    city.trekking.append(trekking)
    city.update()
    return jsonify(city.serialize_with_trekking()), 200


@bpRec.route('/country/<int:id>/delete', methods=['DELETE'])
def delete_country(id):
    country = Country.query.get(id)
    country.delete()
    return jsonify({"message": "Country Deleted!"}), 200
