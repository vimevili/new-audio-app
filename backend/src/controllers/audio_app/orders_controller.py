from flask_restx import Resource
from http import HTTPStatus
from src.namespaces.audio_namespace import audio_namespace
from src.repositories.orders_repository import OrdersRepository
from src.controllers.audio_app.schemas.orders_schemas import (
    audio_app_orders_response,
    audio_app_orders_get_parser,
    audio_app_orders_post_parser,
    order_item_model
)
@audio_namespace.route('/orders')
class GetOrders(Resource):
    
    @audio_namespace.expect(audio_app_orders_get_parser)
    @audio_namespace.marshal_with(audio_app_orders_response)
    @audio_namespace.response(200, 'Success')
    def get(self):
        ''' Get all orders for a user '''
        args = audio_app_orders_get_parser.parse_args()
        print(args)
        orders = OrdersRepository.get_orders(args)
        response = [{
            'id': order.id,
            'user_id': order.user_id,
            'items': order.items,
            'total_price': order.total_price,
            'status': order.status,
            'created_at': order.created_at,
            'updated_at': order.updated_at,
        } for order in orders]

        return response, HTTPStatus.OK

    @audio_namespace.expect(audio_app_orders_post_parser)
    @audio_namespace.marshal_with(order_item_model)
    @audio_namespace.response(201, 'Created')
    def post(self):
        ''' Create a new order '''
        args = audio_app_orders_post_parser.parse_args()
        order = OrdersRepository.create_order(args)
        return order, HTTPStatus.CREATED 