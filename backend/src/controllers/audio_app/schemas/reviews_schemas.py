from flask_restx import fields, reqparse
from src.namespaces.audio_namespace import audio_namespace

# Response model
audio_app_reviews_response = audio_namespace.model('ReviewsResponse', {
    'id': fields.Integer(description='Review ID'),
    'product_id': fields.Integer(description='Product ID'),
    'user': fields.String(description='User name'),
    'comment': fields.String(description='Review comment'),
    'rating': fields.Float(description='Review rating'),
    'created_at': fields.DateTime(description='Creation date'),
    'updated_at': fields.DateTime(description='Update date')
})

# GET operation parser
audio_app_reviews_get_parser = reqparse.RequestParser()
audio_app_reviews_get_parser.add_argument('product_id', type=int, action='split', location='args', required=True)
audio_app_reviews_get_parser.add_argument('user', type=str, location='args')

# POST operation parser
audio_app_reviews_post_parser = reqparse.RequestParser()
audio_app_reviews_post_parser.add_argument('product_id', type=int, required=True, help='Product ID')
audio_app_reviews_post_parser.add_argument('user', type=str, required=True, help='User name')
audio_app_reviews_post_parser.add_argument('comment', type=str, required=True, help='Review comment')
audio_app_reviews_post_parser.add_argument('rating', type=float, required=True, help='Review rating')

# PUT operation parser
audio_app_reviews_put_parser = reqparse.RequestParser()
audio_app_reviews_put_parser.add_argument('comment', type=str, required=True, help='Review comment')
audio_app_reviews_put_parser.add_argument('rating', type=float, required=True, help='Review rating')

# DELETE operation parser
audio_app_reviews_delete_parser = reqparse.RequestParser()
audio_app_reviews_delete_parser.add_argument('id', type=int, required=True, help='Review ID') 