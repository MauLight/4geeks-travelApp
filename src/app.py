"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from flask_jwt_extended import JWTManager
import cloudinary

from api.routes.main import bpMain
from api.routes.users import bpUser
from api.routes.createtrip import bpCtrip
from api.routes.auth import bpAuth
from api.routes.galleries import bpGI
from api.routes.userpicture import bpUP
from api.routes.userpicture import bpUP
from api.routes.activities import bpAct
from api.routes.save_activity import bpSav
from api.routes.matches import bpMath

from api.admin import setup_admin
from api.commands import setup_commands


load_dotenv()

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
jwt = JWTManager(app)
# Allow CORS requests to this API
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# add the admin
setup_admin(app)

# add the admin
setup_commands(app)


cloudinary.config(
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key = os.getenv('CLOUDINARY_API_KEY'),
    api_secret = os.getenv('CLOUDINARY_API_SECRET'),
    secure = True
)

# Add all endpoints form the API with a "api" prefix
# app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(bpMain)
app.register_blueprint(bpUser)
app.register_blueprint(bpAuth, url_prefix="/api")
app.register_blueprint(bpGI, url_prefix="/api")
app.register_blueprint(bpUP, url_prefix="/api")
app.register_blueprint(bpAct, url_prefix="/api")
app.register_blueprint(bpSav, url_prefix="/api")
app.register_blueprint(bpMath, url_prefix="/api")
app.register_blueprint(bpCtrip, url_prefix="/api")


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
