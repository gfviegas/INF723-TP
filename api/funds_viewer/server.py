from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

@app.route('/')
def hello():
  return {"hello": "world", "name": __name__, "database": app.config.from_envvar('DATABASE_URL')}


if __name__ == '__main__':
  app.run(
    host='0.0.0.0',
    port=5000
  )
