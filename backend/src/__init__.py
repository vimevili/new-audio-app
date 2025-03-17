from flask import Flask
from flask_restx import Api

def create_app():
    from src.controllers.audio_app import audio_blueprint
    from src.namespaces.audio_namespace import audio_namespace

    app = Flask(__name__)
    app.register_blueprint(audio_blueprint, url_prefix='/audio_app')

    api = Api(app)
    api.add_namespace(audio_namespace, path='/audio_app')

    return app