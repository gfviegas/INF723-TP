from sqlalchemy import Column, Integer, String, Float
from funds_viewer.database import Base
from sqlalchemy_serializer import SerializerMixin

class FundsMetrics(Base, SerializerMixin):
    __tablename__ = 'funds_metrics'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    code = Column(String, index=True)
    sector = Column(String)
    current_price = Column(Float)
    daily_liquidity = Column(Float)
    dividend = Column(Float)
    dividend_yield = Column(Float)
    dy_3m_accumulated = Column(Float)
    dy_6m_accumulated = Column(Float)
    dy_12m_accumulated = Column(Float)
    dy_3m_average = Column(Float)
    dy_6m_average = Column(Float)
    dy_12m_average = Column(Float)
    dy_year = Column(Float)
    price_variation = Column(Float)
    income_period = Column(Float)
    income_accumulated = Column(Float)
    net_worth = Column(Float)
    vpa = Column(Float)
    p_vpa = Column(Float)
    equity_dy = Column(Float)
    equity_variation = Column(Float)
    equity_return_period = Column(Float)
    equity_return_accumulated = Column(Float)
    physical_vacancy = Column(Float)
    financial_vacancy = Column(Float)
    assets_quality = Column(Integer)
