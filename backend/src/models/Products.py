from sqlalchemy import Column, Integer, String, Text, DateTime, DECIMAL
from config.config import Base

class AudioProducts(Base):
    __tablename__ = 'products'

    id = Column(Integer(), primary_key=True)
    name = Column(String(255))
    category = Column(String(10))
    description = Column(Text)
    image_url = Column(String(255))
    price = Column(DECIMAL(precision=10, scale=2))
    rating = Column(DECIMAL(precision=2, scale=1))
    created_at = Column(DateTime)

