from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import os
import logging

load_dotenv()

logger = logging.getLogger(__name__)

class DBConnection:
    def __init__(self) -> None:
        self.__connection_string = 'mysql+pymysql://{}:{}@{}/{}'.format(
            os.getenv('DB_USER'), 
            os.getenv('DB_PASSWORD'), 
            os.getenv('DB_HOST'), 
            os.getenv('DB_NAME')
        )
        self.__engine = self.__create_db_engine()
        self.session = None

    def __create_db_engine(self):
        engine = create_engine(
            self.__connection_string,
            echo=True,
            pool_timeout=30,
            pool_recycle=3600,
            pool_pre_ping=True
        )
        return engine
    
    def __enter__(self):
        try:
            session_make = sessionmaker(bind=self.__engine)
            self.session = session_make()
            return self
        except SQLAlchemyError as e:
            logger.error(f"Error creating database session: {str(e)}")
            raise
    
    def __exit__(self, exc_type, exc_value, traceback):
        try:
            if self.session:
                self.session.close()
        except SQLAlchemyError as e:
            logger.error(f"Error closing database session: {str(e)}")
            raise

# audioapp_db = engine.connect()


