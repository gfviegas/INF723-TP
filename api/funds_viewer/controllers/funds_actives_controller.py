from flask import jsonify
from funds_viewer.models.funds_actives import FundsActives
from sqlalchemy import func, sql


def row2dict(row):
    return {
        c.name: str(getattr(row, c.name))
        for c in row.__table__.columns
    }

def get_all():
    funds_actives = FundsActives.query.all()
    response = [f.to_dict() for f in funds_actives]

    return {
        'funds_actives': response
    }

def get_by_id(id):
    active = FundsActives.query.filter(FundsActives.id == id).first()
    return active.to_dict()

def get_actives_by_ufs():
    data = FundsActives.query.with_entities(FundsActives.uf, sql.label('count', func.count(FundsActives.uf))).group_by(FundsActives.uf).all()

    return {
        'funds_actives': [{ 'uf': d.uf, 'count': d.count } for d in data]
    }
