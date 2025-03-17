from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
import os

load_dotenv()


class DBConnection:
    def __init__(self) -> None:
        self.__connection_string = 'mysql+pymysql://{}:{}@{}/{}'.format(os.getenv('DB_USER'), os.getenv('DB_PASSWORD'), os.getenv('DB_HOST'), os.getenv('DB_NAME'))
        self.__engine = self.__create_db_engine()
        self.session = None

    def __create_db_engine(self):
        engine = create_engine(self.__connection_string, echo=True)
        return engine
    
    def __enter__(self):
        session_make = sessionmaker(bind=self.__engine)
        self.session = session_make()
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        self.session.close()

# audioapp_db = engine.connect()


