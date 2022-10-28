from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):  # type: ignore
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    birthdate = db.Column(db.String(50))
    gender = db.Column(db.String(20))
    languages = db.Column(db.String(20))
    countryofresidence = db.Column(db.String(20))
    instagram = db.Column(db.String(20), unique=True)
    facebook = db.Column(db.String(20), unique=True)
    twitter = db.Column(db.String(20), unique=True)
    verified = db.Column(db.Boolean(), default=True)
    createtrips = db.relationship('CreateTrip', cascade='all, delete', backref='user')
    mytrips = db.relationship('Trips', cascade='all, delete', backref='user')
    rating = db.relationship('Rating', cascade='all, delete', backref='user')

    def serialize(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'password': self.password,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'languages': self.languages,
            'countryofresidence': self.countryofresidence,
            'instagram': self.instagram,
            'facebook': self.facebook,
            'twitter': self.twitter,
            'verified': self.verified
        }

    def serialize_with_createdtrips(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'password': self.password,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'languages': self.languages,
            'countryofresidence': self.countryofresidence,
            'instagram': self.instagram,
            'facebook': self.facebook,
            'twitter': self.twitter,
            'verified': self.verified,
            'createtrips': [createdtrips.serialize() for createdtrips in self.createtrips]
        }

    def serialize_with_trips(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'password': self.password,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'languages': self.languages,
            'countryofresidence': self.countryofresidence,
            'instagram': self.instagram,
            'facebook': self.facebook,
            'twitter': self.twitter,
            'verified': self.verified,
            'mytrips': [trip.serialize() for trip in self.mytrips]
        }

    def serialize_with_rating(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'email': self.email,
            'password': self.password,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'languages': self.languages,
            'countryofresidence': self.countryofresidence,
            'instagram': self.instagram,
            'facebook': self.facebook,
            'twitter': self.twitter,
            'verified': self.verified,
            'rating': [rating.serialize() for rating in self.rating]}

    # def serialize_with_trips_with_activities(self):
    #     return {
    #         'id': self.id,
    #         'firstname': self.firstname,
    #         'lastname': self.lastname,
    #         'email': self.email,
    #         'password' : self.password,
    #         'birthdate': self.birthdate,
    #         'gender': self.gender,
    #         'languages': self.languages,
    #         'countryofresidence': self.countryofresidence,
    #         'instagram': self.instagram,
    #         'facebook': self.facebook,
    #         'twitter': self.twitter,
    #         'verified': self.verified,
    #         'mytrips' : [trip.serialize_with_activities() for trip in self.mytrips]
    #     }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class CreateTrip(db.Model):  # creacion del viaje
    __tablename__ = 'createtrips'
    id = db.Column(db.Integer, primary_key=True)
    country_trip = db.Column(db.String(50), nullable=False)
    capital_trip = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.String(50))
    end_date = db.Column(db.String(50))
    users_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable= False)

    def serialize(self):
        return {
            'id': self.id,
            'country_trip': self.country_trip,
            'capital_trip': self.capital_trip,
            'start_date': self.start_date,
            'end_date': self.end_date,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Trips(db.Model):  # type: ignore
    __tablename__ = 'mytrips'
    id = db.Column(db.Integer, primary_key=True)
    travelling = db.Column(db.String(10), nullable=False)
    with_children = db.Column(db.String(10), nullable=False)
    gender_specific = db.Column(db.String(15), nullable=False)
    stay = db.Column(db.String(50), nullable=False)
    budget = db.Column(db.Integer, nullable=False)
    partner_age = db.Column(db.Integer, nullable=False)
    activities = db.Column(db.String(50), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable= False)

    def serialize(self):
        return {
            'id': self.id,
            'travelling': self.travelling,
            'with_children': self.with_children,
            'gender_specific': self.gender_specific,
            'stay': self.stay,
            'budget': self.budget,
            'partner_age': self.partner_age,
            'activities': self.activities,
            'users_id': self.users_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()



class Gallery(db.Model):  # usar para formulario con fotos DE VIAJES
    __tablename__ = 'galleries'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable= False)

    def serialize(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "users_id": self.users_id,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session

class UserPicture(db.Model):  # usar para formulario con foto de usuario
    __tablename__ = 'userpictures'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable= False)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "filename": self.filename,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session

class Rating(db.Model):  # calificacion match post-viaje
    __tablename__ = 'rating'
    id = db.Column(db.Integer, primary_key=True)
    good_match = db.Column(db.Integer, nullable=False)
    recommend = db.Column(db.Integer, nullable=False)
    reason_good = db.Column(db.String(30))
    reason_bad = db.Column(db.String(30))
    experience = db.Column(db.String(1000), nullable=False)
    users_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable= False)

    def serialize(self):
        return {
            "id": self.id,
            "good_match": self.good_match,
            "recommend": self.recommend,
            "reason_good": self.reason_good,
            "reason_bad": self.reason_bad,
            "experience": self.experience,
            "users_id": self.users_id
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session
