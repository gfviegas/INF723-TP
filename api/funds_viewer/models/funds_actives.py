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

    property
    def serialized(self):
        """Return object data in serializeable format"""
        return {
            'id': self.id,
            'code': self.code,
            'address': self.address,
            'neighborhood': self.neighborhood,
            'city': self.city,
            'uf': self.uf,
            'area': self.area,
        }
