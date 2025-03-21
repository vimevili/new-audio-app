from flask_restx import fields, reqparse
from src.namespaces.audio_namespace import audio_namespace

# GET operation parser
audio_app_products_get_parser = reqparse.RequestParser()
audio_app_products_get_parser.add_argument('id', type=int, action='split', location='args')
audio_app_products_get_parser.add_argument('category', type=str, location='args')
# audio_app_products_get_parser.add_argument('price', type=int, location='args')
# audio_app_products_get_parser.add_argument('rating', type=int, location='args')

# Response model
audio_app_products_response = audio_namespace.model('ProductsResponse', {
    'id': fields.Integer(description='Product ID'),
    'name': fields.String(description='Product name'),
    'category': fields.String(description='Product category'),
    'description': fields.String(description='Product description'),
    'image_url': fields.String(description='Product image URL'),
    'price': fields.Float(description='Product price'),
    'rating': fields.Float(description='Product rating'),
    'created_at': fields.DateTime(description='Creation date')
})