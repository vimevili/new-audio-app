from sqlalchemy import Column, Integer, String, Text
from src.config.config import Base

class AudioReviews(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    user = Column(String(50))
    description = Column(Text)
    rating = Column(Integer)
    date = Column(String)

