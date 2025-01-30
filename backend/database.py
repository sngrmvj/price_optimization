import os
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker
from app.models.tables import Base


class DatabaseConnection:

    __SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URL', None)
    __engine = create_engine(__SQLALCHEMY_DATABASE_URL)
    __SessionLocal = sessionmaker(autocommit=False, autoflush=True, bind=__engine)

    @classmethod
    def create_db_tables(cls):
        Base.metadata.create_all(bind=cls.__engine)
        cls.verify_existence_of_tables()

    @classmethod
    def verify_existence_of_tables(cls):
        inspector = inspect(cls.__engine)
        print("Number of tables existing in Database", len(inspector.get_table_names())) # Should return a list of tables


    @classmethod
    def get_session(cls):
        return cls.__SessionLocal()
