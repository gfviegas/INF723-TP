from flask import Flask, request
from flask_cors import CORS, cross_origin

from funds_viewer.database import db_session

from funds_viewer.controllers import funds_controller, funds_metrics_controller

app = Flask(__name__)
cors = CORS(app)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route('/', methods=['GET'])
def hello():
  return {'hello': 'world', 'name': __name__, 'foo': 'bar'}

@app.route('/funds', methods=['GET'])
def get_funds():
    return funds_controller.get_all()

@app.route('/funds/<id>', methods=['GET'])
def get_fund_by_id(id):
    return funds_controller.get_by_id(id)

@app.route('/funds_metrics', methods=['GET'])
def get_funds_metrics():
    return funds_metrics_controller.get_all()

@app.route('/funds_metrics/<id>', methods=['GET'])
def get_fund_metrics_by_id(id):
    return funds_metrics_controller.get_by_id(id)

if __name__ == '__main__':
  app.run(
    host='0.0.0.0',
    port=5000
  )
