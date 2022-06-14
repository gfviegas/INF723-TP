from sqlite3 import Date
from sqlalchemy import Column, Float, Integer, String, Date, Boolean, case
from funds_viewer.database import Base
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.orm import column_property
from sqlalchemy.ext.hybrid import hybrid_property

class FundsHistory(Base, SerializerMixin):
    __tablename__ = 'funds_history'
    code = Column(String, index=True, primary_key=True)
    date = Column(Date, primary_key=True)
    # open = Column(Float)
    # high = Column(Float)
    # low = Column(Float)
    close_price = Column(Float)
    # volume = Column(Integer)
    dividends = Column(Float)
    # stock_splits = Column(Float)
    dividend_yield = Column(Float)
    prediction = Column(Boolean)

    # dividend_yield = column_property((close / dividends) * 100)
    # @hybrid_property
    # def dividend_yield(self):
    #     if (self.dividends == 0):
    #         return 0
    #     return 100 * (self.dividends / self.close)

    # @dividend_yield.expression
    # def dividend_yield(cls):
    #     return case([
    #         (cls.dividends != 0, (100 * (cls.dividends / cls.close))),
    #     ], else_ = 0)


