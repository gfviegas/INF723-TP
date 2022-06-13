from funds_viewer.models.funds import Funds

def get_all():
    funds = Funds.query.all()
    response = [f.to_dict() for f in funds]

    return {
        'funds': response
    }

def get_by_id(id):
    fund = Funds.query.filter(Funds.id == id).first()
    return fund.to_dict()
