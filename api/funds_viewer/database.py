import os
DATABASE_URI = os.environ.get('DATABASE_URI', 'postgresql://inf723-tp:inf723-tp@localhost:5432/inf723-tp')

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base


engine = create_engine(DATABASE_URI)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    from funds_viewer.models import funds_metrics, funds_actives, funds, funds_history

    print(funds_actives, funds_metrics, funds, funds_history)

    Base.metadata.create_all(bind=engine)
