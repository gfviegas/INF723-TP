from funds_viewer.models.funds_actives import FundsActives
from sqlalchemy import func

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
    data = FundsActives.query.with_entities(FundsActives.uf, func.count(FundsActives.uf)).group_by(FundsActives.uf).all()

    return {
        'funds_actives': [d.to_dict() for d in data]
    }
