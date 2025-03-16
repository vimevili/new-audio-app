from flask import Flask
from flask_restx import Api
from .controllers.audio_app import audio_blueprint
from .namespaces import audio_namespace

def create_app():
    app = Flask(__name__)
    app.register_blueprint(audio_blueprint, url_prefix='/audio_app')

    api = Api(app)
    api.add_namespace(audio_namespace, path='/audio_app')

    return app