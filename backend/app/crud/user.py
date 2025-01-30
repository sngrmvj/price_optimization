from database import DatabaseConnection
from sqlalchemy import text
import traceback, os
from passlib.context import CryptContext 

# Password hashing context 
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCrud:

    def __init__(self):
        self.__is_user_available = f"select * from users where email=:email"
        self.__get_role_id = f"SELECT id FROM roles WHERE name =:role_name;"
        self.__get_role_name = f"SELECT name FROM roles WHERE id =:role_id;"
        self.__insert_user = f"INSERT INTO users (id, email, hashed_password, is_active, is_verified, role_id) VALUES (uuid_generate_v4(), :email, :password, true, false, :role_id);"


    async def fetch_user(self, details):
        fetched_rows = None
        try:
            with DatabaseConnection.get_session() as db:
                query = text(self.__is_user_available)
                fetched_rows = db.execute(query,{"email": details['email']}).fetchone()

                if not fetched_rows:
                    raise Exception(f"Data not available")
                if not pwd_context.verify(details['password'], fetched_rows[2]):
                    raise Exception("Passwords did not match")
                
                role_name_query = text(self.__get_role_name)
                role_output = db.execute(role_name_query, {"role_id": fetched_rows[-1]}).fetchone()
                
        except Exception as error:
            print(f"Error in the query fetch of user - {error} - {traceback.format_exc()}")
            return None
        else:
            return fetched_rows, role_output[-1]


    async def add_user(self, details):
        try:
            with DatabaseConnection.get_session() as db:
                
                role_id_query = text(self.__get_role_id)
                fetched_rows = db.execute(role_id_query, {"role_name": details['role']}).fetchone()
                if len(fetched_rows) == 0: 
                    raise Exception(f"Role '{details['role']}' not found")
                role_id = fetched_rows[0]

                hashed_password = pwd_context.hash(details['password'])

                query = text(self.__insert_user)
                db.execute(query,{"email": details['email'], "password": hashed_password, "role_id": role_id})
                db.commit()
        except Exception as error:
            print(f"Error in the query fetch of records in admin_crud.py - {error} - {traceback.format_exc()}")
            return False
        else:
            return True