from flask_restx import fields, reqparse
from namespaces.audio_namespace import audio_namespace

#Products --------------------------------------------------------
audio_app_products_parser = reqparse.RequestParser()
audio_app_products_parser.add_argument('id', type=int, action='split', location='args')
audio_app_products_parser.add_argument('category', type=str, action='split', location='args')
audio_app_products_parser.add_argument('price', type=int, action='split', location='args')
audio_app_products_parser.add_argument('rating', type=int, action='split', location='args')

audio_app_products_response = audio_namespace.model('AudioApp products', {
    'id': fields.Integer,
    'name': fields.String,
    'category': fields.String,
    'description': fields.String,
    'image_url': fields.String,
    'price': fields.Float,
    'rating': fields.Float,
    'created_at': fields.String
})

#Reviews --------------------------------------------------------
audio_app_reviews_parser = reqparse.RequestParser()
audio_app_reviews_parser.add_argument('product_id', type=int, action='split', location='args', required=True)
audio_app_reviews_parser.add_argument('rating', type=int, action='split', location='args')

audio_app_reviews_response = audio_namespace.model('AudioApp reviews', {
    'id': fields.Integer,
    'product_id': fields.Integer,
    'user': fields.String,
    'description': fields.String,
    'rating': fields.Float,
    'date': fields.String
})
