from sqlalchemy import Column, Integer, String
from funds_viewer.database import Base
from sqlalchemy_serializer import SerializerMixin

class Funds(Base, SerializerMixin):
    __tablename__ = 'funds'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String, index=True)
    sector = Column(String)
