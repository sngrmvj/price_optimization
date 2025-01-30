
from app.models.queries import CREATE_ROLE_PERMISSIONS_ADMIN, CREATE_PERMISSIONS, CREATE_ROLE_PERMISSIONS_BUYER, CREATE_ROLE_PERMISSIONS_SUPPLIER, CREATE_ROLES, CREATE_UUID_EXTENSION, CREATE_INDEX_NAME, CREATE_UNIQUE_CONSTRAINT_PRODUCT, CREATE_INDEX_CATEGORY
from database import DatabaseConnection
from sqlalchemy import text

def startup_event():
    with DatabaseConnection.get_session() as db:
        db.execute(text(CREATE_UUID_EXTENSION))
        db.execute(text(CREATE_ROLES))
        db.execute(text(CREATE_PERMISSIONS))
        db.execute(text(CREATE_ROLE_PERMISSIONS_ADMIN))
        db.execute(text(CREATE_ROLE_PERMISSIONS_BUYER))
        db.execute(text(CREATE_ROLE_PERMISSIONS_SUPPLIER))
        db.execute(text(CREATE_UNIQUE_CONSTRAINT_PRODUCT))
        db.execute(text(CREATE_INDEX_NAME))
        db.execute(text(CREATE_INDEX_CATEGORY))
        db.commit()


if __name__ == "__main__":
    DatabaseConnection.create_db_tables()
    startup_event()