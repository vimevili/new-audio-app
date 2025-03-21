from src.infra.db import DBConnection
from src.models import AudioOrders
from datetime import datetime
import json

class OrdersRepository:
    
    @staticmethod
    def get_orders(args):
        print(args)
        if not args or 'user_id' not in args:
            raise ValueError("user_id is required")
            
        with DBConnection() as audio_db:
            query = audio_db.session.query(
                AudioOrders.id.label('id'),
                AudioOrders.user_id.label('user_id'),
                AudioOrders.items.label('items'),
                AudioOrders.total_price.label('total_price'),
                AudioOrders.status.label('status'),
                AudioOrders.created_at.label('created_at'),
                AudioOrders.updated_at.label('updated_at')
            ).select_from(AudioOrders)

            query = query.filter(AudioOrders.user_id == args['user_id'])

            orders = query.all()
            
            # Convert items string back to list
            for order in orders:
                order.items = json.loads(order.items)

            return orders 
        
    @staticmethod
    def create_order(args):
        with DBConnection() as audio_db:
            # Calculate total price from items
            total_price = sum(item['price'] * item['quantity'] for item in args['items'])
            
            # Convert items list to JSON string
            items_json = json.dumps(args['items'])
            
            # Create order with default status 'processing'
            order_data = {
                'user_id': args['user_id'],
                'items': items_json,
                'total_price': total_price,
                'status': 'processing',
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            order = AudioOrders(**order_data)
            audio_db.session.add(order)
            audio_db.session.commit()
            
            # Convert items back to list for response
            response_data = {
                'id': order.id,
                'user_id': order.user_id,
                'items': json.loads(order.items),
                'total_price': order.total_price,
                'status': order.status,
                'created_at': order.created_at,
                'updated_at': order.updated_at
            }
            
            return response_data    