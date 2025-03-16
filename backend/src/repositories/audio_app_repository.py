from infra.db import DBConnection
from models import Products, Reviews

class AudioAppRepository:
    
    @staticmethod
    def get_products(args):
        with DBConnection() as audio_db:
            if args:
                pass
            else:
                return audio_db.session.query(Products).all()