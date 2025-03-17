from flask import Blueprint
from flask_restx import Resource
from http import HTTPStatus
from src.namespaces.audio_namespace import audio_namespace
from src.controllers.audio_app.schemas import audio_app_products_response, audio_app_products_parser, audio_app_reviews_response, audio_app_reviews_parser
from src.repositories.audio_app_repository import AudioAppRepository

audio_blueprint = Blueprint('audio', __name__)

@audio_namespace.route('/products')
class GetProducts(Resource):
    
    @audio_namespace.expect(audio_app_products_parser)
    @audio_namespace.marshal_with(audio_app_products_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all products '''

        args = audio_app_products_parser.parse_args()
        data = AudioAppRepository.get_products(args)

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
    
@audio_namespace.route('/reviews')
class GetReviews(Resource):

    @audio_namespace.expect(audio_app_reviews_parser)
    @audio_namespace.marshal_with(audio_app_reviews_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all reviews '''

        args = audio_app_reviews_parser.parse_args()
        reviews = AudioAppRepository.get_reviews(args)

        response = [{
            'id': review.id,
            'product_id': review.product_id,
            'user': review.user,
            'description': review.description,
            'rating': review.rating,
            'date': review.date,
        } for review in reviews]

        return response, HTTPStatus.OK