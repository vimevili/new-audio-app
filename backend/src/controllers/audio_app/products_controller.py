from flask_restx import Resource
from http import HTTPStatus
from src.namespaces.audio_namespace import audio_namespace
from src.controllers.audio_app.schemas import audio_app_products_get_parser, audio_app_products_response
from src.repositories import ProductsRepository

@audio_namespace.route('/products')
class GetProducts(Resource):
    
    @audio_namespace.expect(audio_app_products_get_parser)
    @audio_namespace.marshal_with(audio_app_products_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all products '''

        args = audio_app_products_get_parser.parse_args()
        data = ProductsRepository.get_products(args)

        response = [{
            'id': product.id,
            'name': product.name,
            'category': product.category,
            'description': product.description,
            'image_url': product.image_url,
            'price': product.price,
            'rating': product.rating,
            'created_at': product.created_at
        } for product in data]
        return response, HTTPStatus.OK 