from sqlite3 import Date
from sqlalchemy import Column, Float, Integer, String, Date
from funds_viewer.database import Base
from sqlalchemy_serializer import SerializerMixin

class FundsHistory(Base, SerializerMixin):
    __tablename__ = 'funds_history'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String, index=True)
    date = Column(Date)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Integer)
    dividends = Column(Float)
    stock_splits = Column(Float)
