from funds_viewer.models.funds_metrics import FundsMetrics

def get_all():
    funds_metrics = FundsMetrics.query.all()
    response = [f.to_dict() for f in funds_metrics]

    return {
        'funds_metrics': response
    }

def get_by_id(id):
    fund_metric = FundsMetrics.query.filter(FundsMetrics.id == id).first()
    return fund_metric.to_dict()
