from flask_restx import fields, reqparse
from src.namespaces.audio_namespace import audio_namespace

#Products --------------------------------------------------------
audio_app_products_parser = reqparse.RequestParser()
audio_app_products_parser.add_argument('id', type=int, action='split', location='args')
audio_app_products_parser.add_argument('category', type=str, location='args')
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
audio_app_reviews_parser.add_argument('user', type=str, location='args')

audio_app_reviews_response = audio_namespace.model('AudioApp reviews', {
    'id': fields.Integer,
    'product_id': fields.Integer,
    'user': fields.String,
    'comment': fields.String,
    'rating': fields.Float,
    'created_at': fields.String,
    'updated_at': fields.String
})

#Orders --------------------------------------------------------
audio_app_orders_parser = reqparse.RequestParser()
audio_app_orders_parser.add_argument('user_id', type=int, location='args', required=True)

audio_app_orders_response = audio_namespace.model('AudioApp orders', {
    'id': fields.Integer,
    'user_id': fields.Integer,
    'items': fields.List(fields.String),
    'total_price': fields.Float,
    'status': fields.String,
    'created_at': fields.String,
    'updated_at': fields.String
})
