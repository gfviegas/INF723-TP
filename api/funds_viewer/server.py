from flask import Flask, request
from flask_cors import CORS, cross_origin

from funds_viewer.database import db_session

from funds_viewer.controllers import funds_controller, funds_metrics_controller, funds_history_controller, funds_actives_controller

app = Flask(__name__)
cors = CORS(app)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route('/', methods=['GET'])
def hello():
  return {'hello': 'world', 'name': __name__, 'foo': 'bar'}

### FUNDS
@app.route('/funds', methods=['GET'])
def get_funds():
    return funds_controller.get_all()

@app.route('/funds/<id>', methods=['GET'])
def get_fund_by_id(id):
    return funds_controller.get_by_id(id)

### FUNDS ACTIVES
@app.route('/funds_actives', methods=['GET'])
def get_funds_actives():
    return funds_actives_controller.get_all()

@app.route('/funds_actives_by_ufs', methods=['GET'])
def get_funds_actives_by_ufs():
    return funds_actives_controller.get_actives_by_ufs()

@app.route('/funds_actives_by_ufs_and_funds', methods=['GET'])
def get_funds_actives_by_ufs_and_funds():
    return funds_actives_controller.get_actives_by_ufs_and_funds()

@app.route('/funds_actives/<id>', methods=['GET'])
def get_funds_actives_by_id(id):
    return funds_actives_controller.get_by_id(id)

### FUNDS METRICS
@app.route('/funds_metrics', methods=['GET'])
def get_funds_metrics():
    return funds_metrics_controller.get_all()

@app.route('/funds_metrics/<id>', methods=['GET'])
def get_fund_metrics_by_id(id):
    return funds_metrics_controller.get_by_id(id)

### FUNDS HISTORY
@app.route('/funds_history', methods=['GET'])
def get_funds_history():
    args = request.args
    only = args.get('only', default='').split(',')
    only = only if len(only) else None

    return funds_history_controller.get_all(only=only)

@app.route('/funds_history/dividend_yield_overtime', methods=['GET'])
def get_funds_history_dividend_yield_overtime():
    return funds_history_controller.get_dividend_yield_overtime()

@app.route('/funds_history/<id>', methods=['GET'])
def get_funds_history_by_id(id):
    return funds_history_controller.get_by_id(id)

if __name__ == '__main__':
  app.run(
    host='0.0.0.0',
    port=5000
  )
