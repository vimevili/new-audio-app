from src.infra.db import DBConnection
from src.models import AudioProducts
from sqlalchemy import and_

class ProductsRepository:
    
    @staticmethod
    def get_products(args):
        with DBConnection() as audio_db:
            query = audio_db.session.query(
                AudioProducts.id.label('id'),
                AudioProducts.name.label('name'),   
                AudioProducts.category.label('category'),   
                AudioProducts.description.label('description'),   
                AudioProducts.image_url.label('image_url'),   
                AudioProducts.price.label('price'),   
                AudioProducts.rating.label('rating'),   
                AudioProducts.created_at.label('created_at')   
            ).select_from(AudioProducts)

            filters = []
            print(args)

            if args.get('id'):
                filters.append(AudioProducts.id.in_(args['id']))
            
            if args.get('category'):
                filters.append(AudioProducts.category == args['category'])

            # if args.get('price') is not None:
            #     filters.append(AudioProducts.price >= args['price'])

            # if args.get('rating') is not None:
            #     filters.append(AudioProducts.rating >= args['rating'])

            if filters:
                query = query.filter(and_(*filters))

            return query.all() or [] 