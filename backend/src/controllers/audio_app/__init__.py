from flask import Blueprint
from flask_restx import Api
from src.controllers.audio_app.products_controller import GetProducts
from src.controllers.audio_app.reviews_controller import GetReviews
from src.controllers.audio_app.orders_controller import GetOrders
from src.namespaces.audio_namespace import audio_namespace

audio_blueprint = Blueprint('audio', __name__)
api = Api(audio_blueprint, version='1.0', title='Audio API')

# Register namespaces
api.add_namespace(audio_namespace, path='/api/audio')
