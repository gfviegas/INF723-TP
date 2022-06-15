from funds_viewer.models.funds_history import FundsHistory
from flask import jsonify


def get_all(only=None):
    funds_history = FundsHistory.query.filter(FundsHistory.code.in_(only)) if only else FundsHistory.query.all()
    response = [{**f.to_dict(), 'dividend_yield': f.dividend_yield} for f in funds_history]

    return {
        'only': only,
        'funds_history': response
    }

def get_by_id(id):
    fh = FundsHistory.query.filter(FundsHistory.id == id).first()
    return {**fh.to_dict(), 'dividend_yield': fh.dividend_yield}

def get_dividend_yield_overtime():
    data = FundsHistory.query.with_entities(
        FundsHistory.dividend_yield,
        FundsHistory.code,
        FundsHistory.date
    )

    return {
        'funds_dividend_yields': jsonify(data)
    }
