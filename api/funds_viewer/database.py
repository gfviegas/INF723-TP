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
    from funds_viewer.models import funds, funds_metrics

    print(funds, funds_metrics)

    Base.metadata.create_all(bind=engine)
