from src.infra.db import DBConnection
from src.models import AudioReviews
from sqlalchemy import and_
from datetime import datetime, timedelta, UTC
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class ReviewsRepository:
    
    @staticmethod
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
            if args.get('id'):
                filters.append(AudioReviews.id.in_(args['id']))
            
            if args.get('product_id'):
                filters.append(AudioReviews.product_id == args['product_id'])

            if args.get('user'):
                filters.append(AudioReviews.user == args['user'])

            if args.get('rating') is not None:
                filters.append(AudioReviews.rating >= args['rating'])

            if filters:
                query = query.filter(and_(*filters))

            return query.all() or []

    @staticmethod
    def update_review(id, data):
        with DBConnection() as audio_db:
            review = audio_db.session.query(AudioReviews).filter_by(id=id).first()
            if review:
                for key, value in data.items():
                    setattr(review, key, value)
                review.updated_at = datetime.now(UTC)
                audio_db.session.commit()
                return {
                    'id': review.id,
                    'product_id': review.product_id,
                    'user': review.user,
                    'comment': review.comment,
                    'rating': review.rating,
                    'created_at': review.created_at,
                    'updated_at': review.updated_at
                }
            return None

    @staticmethod
    def delete_review(id):
        logger.debug(f"Starting delete_review for id: {id}")
        try:
            with DBConnection() as audio_db:
                logger.debug("Connected to database")
                review = audio_db.session.query(AudioReviews).filter_by(id=id).first()
                logger.debug(f"Query result: {review}")
                if review:
                    logger.debug("Review found, proceeding with delete")
                    audio_db.session.delete(review)
                    audio_db.session.commit()
                    logger.debug("Review deleted successfully")
                    return True
                logger.debug("Review not found")
                return False
        except Exception as e:
            logger.error(f"Error in delete_review: {str(e)}")
            raise

    @staticmethod
    def create_review(data):
        with DBConnection() as audio_db:
            now = datetime.now(UTC)
            review = AudioReviews(
                product_id=data['product_id'],
                user=data['user'],
                comment=data['comment'],
                rating=data['rating'],
                created_at=now,
                updated_at=now
            )
            audio_db.session.add(review)
            audio_db.session.commit()
            return {
                'id': review.id,
                'product_id': review.product_id,
                'user': review.user,
                'comment': review.comment,
                'rating': review.rating,
                'created_at': review.created_at,
                'updated_at': review.updated_at
            }
        
