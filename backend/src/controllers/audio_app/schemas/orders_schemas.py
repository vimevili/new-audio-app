from flask_restx import fields, reqparse
from src.namespaces.audio_namespace import audio_namespace

# Modelo para um item do pedido
order_item_model = audio_namespace.model('OrderItem', {
    'product_id': fields.Integer(required=True, description='Product ID'),
    'quantity': fields.Integer(required=True, description='Quantity'),
    'price': fields.Float(required=True, description='Price')
})

# Response model
audio_app_orders_response = audio_namespace.model('OrdersResponse', {
    'id': fields.Integer(description='Order ID'),
    'user_id': fields.String(description='User ID'),
    'items': fields.List(fields.Nested(order_item_model), description='Order items'),
    'total_price': fields.Float(description='Total price'),
    'status': fields.String(description='Order status'),
    'created_at': fields.DateTime(description='Creation date'),
    'updated_at': fields.DateTime(description='Update date')
})

# GET operation parser
audio_app_orders_get_parser = reqparse.RequestParser()
audio_app_orders_get_parser.add_argument('user_id', type=str, location='args', required=True)

# POST operation parser
audio_app_orders_post_parser = reqparse.RequestParser()
audio_app_orders_post_parser.add_argument('user_id', type=str, required=True, help='User ID')
audio_app_orders_post_parser.add_argument('items', type=list, location='json', required=True, help='Order items')

