from sqlalchemy import Column, Integer, String, Text, Float
from src.config.config import Base

class AudioProducts(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    category = Column(String(10))
    description = Column(Text)
    image_url = Column(String(255))
    price = Column(Float)
    rating = Column(Float)
    created_at = Column(String)

