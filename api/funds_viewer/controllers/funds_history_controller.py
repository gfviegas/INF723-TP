from funds_viewer.models.funds_history import FundsHistory
from sqlalchemy import func

def get_all():
    funds_history = FundsHistory.query.all()
    response = [f.to_dict() for f in funds_history]

    return {
        'funds_history': response
    }

def get_by_id(id):
    fund_metric = FundsHistory.query.filter(FundsHistory.id == id).first()
    return fund_metric.to_dict()

def get_dividend_yield_overtime():
    data = FundsHistory.query.with_entities(FundsHistory.code, func.count(FundsHistory.dividend_yield)).group_by(FundsHistory.code, FundsHistory.dividend_yield).all()

    return {
        'funds_dividend_yields': [d.to_dict() for d in data]
    }
