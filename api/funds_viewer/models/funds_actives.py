from sqlalchemy import Column, Float, String, Integer
from funds_viewer.database import Base
from sqlalchemy_serializer import SerializerMixin

class FundsActives(Base, SerializerMixin):
    __tablename__ = 'funds_actives'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String, index=True)
    address = Column(String)
    neighborhood = Column(String)
    city = Column(String)
    uf = Column(String)
    area = Column(Float)
