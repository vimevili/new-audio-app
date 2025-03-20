from src.infra.db import DBConnection
from src.models import AudioProducts, AudioReviews
from sqlalchemy import and_

class AudioAppRepository:
    
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

            # Filtrar por ID (suporta múltiplos valores)
            if 'id' in args and args['id']:
                filters.append(AudioProducts.id.in_(args['id']))  
            
            # Filtrar por categoria (suporta múltiplos valores)
            if 'category' in args and args['category']:
                filters.append(AudioProducts.category.in_(args['category']))  

            # Filtrar por intervalo de preço
            if 'min_price' in args and args['min_price'] is not None:
                filters.append(AudioProducts.price >= args['min_price'])
            if 'max_price' in args and args['max_price'] is not None:
                filters.append(AudioProducts.price <= args['max_price'])

            # Filtrar por intervalo de rating
            if 'min_rating' in args and args['min_rating'] is not None:
                filters.append(AudioProducts.rating >= args['min_rating'])
            if 'max_rating' in args and args['max_rating'] is not None:
                filters.append(AudioProducts.rating <= args['max_rating'])

            # Aplicar filtros, se existirem
            if filters:
                query = query.filter(and_(*filters))

            products = query.all()

            return products

    def get_reviews(args):
            with DBConnection() as audio_db:
                query = audio_db.session.query(
                    AudioReviews.id.label('id'),
                    AudioReviews.product_id.label('product_id'),
                    AudioReviews.user.label('user'),
                    AudioReviews.comment.label('comment'),   
                    AudioReviews.rating.label('rating'),   
                    AudioReviews.created_at.label('created_at'),   
                    AudioReviews.updated_at.label('updated_at')   
                ).select_from(AudioReviews)

                filters = []

                if 'product_id' in args and args['product_id']:
                    filters.append(AudioReviews.product_id.in_(args['product_id']))  

                if filters:
                    query = query.filter(and_(*filters))

                reviews = query.all()

                return reviews
