from flask import Blueprint
from flask_restx import Resource

from src.namespaces import audio_namespace
from src.controllers import audio_app_products_response, audio_app_products_parser
from src.repositories import AudioAppRepository

audio_blueprint = Blueprint('audio', __name__)

@audio_namespace.route('/products')
class Products(Resource):
    # @audio_namespace.expect(audio_app_products_parser)
    @audio_namespace.marshal_with(audio_app_products_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all products '''

        args = audio_app_products_parser.parse_args()

        return {'products': AudioAppRepository.get_products(args)}