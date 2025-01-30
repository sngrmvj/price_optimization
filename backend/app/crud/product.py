from database import DatabaseConnection
from sqlalchemy import text
import traceback, os



class ProductCrud:


    def __init__(self):
        self.__select_all_products_admin = """SELECT * FROM products"""
        self.__select_all_products = """SELECT * FROM products where owner_id=:owner_id;"""
        self.__select_product = """SELECT * FROM products where product_id=:product_id and owner_id=:owner_id"""
        self.__insert_product = """
            INSERT INTO products (
                product_id, name, description, cost_price, selling_price, 
                category, stock_available, units_sold, customer_rating, 
                demand_forecast, optimized_price, owner_id
            ) VALUES (uuid_generate_v4(), :name, :description, :cost_price, :selling_price, :category, :stock_available, :units_sold, :customer_rating,:demand_forecast, :optimized_price, :owner_uuid);
        """ 
        self.__delete_product = "DELETE FROM products where product_id=:product_id and owner_id=:owner_id"
        self.__update_product = """
            UPDATE products
            SET 
                name = :name,
                description = :description,
                cost_price = :cost_price,
                selling_price = :selling_price,
                category = :category,
                stock_available = :stock_available,
                units_sold = :units_sold,
                customer_rating = :customer_rating,
                demand_forecast = :demand_forecast,
                optimized_price = :optimized_price
            WHERE product_id = :product_id AND owner_id = :owner_id;
        """
        self.__search_name_query = """SELECT * FROM products WHERE name ILIKE :search_term and owner_id=:owner_id;"""
        self.__search_category_query = """SELECT * FROM products WHERE category ILIKE :search_term and owner_id=:owner_id;"""

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def get_product(self, product_id, owner_id):
        try:
            with DatabaseConnection.get_session() as db:
                insert_query = text(self.__select_product)
                value = db.execute(insert_query, {"owner_id": owner_id, "product_id": product_id}).fetchone()
        except Exception as error:
            print(f"Error in retrieving the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return value, True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def get_all_products(self, owner_id):
        try:
            with DatabaseConnection.get_session() as db:
                insert_query = text(self.__select_all_products)
                value = db.execute(insert_query, {"owner_id": owner_id}).fetchall()
        except Exception as error:
            print(f"Error in retrieving all the products - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return value, True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def update_product(self, product_details, owner_id):
        try:
            with DatabaseConnection.get_session() as db:
                update_query = text(self.__update_product)
                db.execute(update_query, {
                    "name": product_details['name'],
                    "description": product_details['description'],
                    "cost_price": product_details['cost_price'],
                    "selling_price": product_details['selling_price'],
                    "category": product_details['category'],
                    "stock_available": product_details['stock_available'],
                    "units_sold": product_details['units_sold'],
                    "customer_rating": product_details['customer_rating'],
                    "demand_forecast": product_details['demand_forecast'],
                    "optimized_price": product_details['optimized_price'],
                    "owner_id": owner_id,
                    "product_id": product_details['product_id']
                })
                db.commit()
        except Exception as error:
            print(f"Error in deleting the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return "", True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def delete_product(self, product_id, owner_id):
        try:
            with DatabaseConnection.get_session() as db:
                delete_query = text(self.__delete_product)
                db.execute(delete_query, {"owner_id": owner_id, "product_id": product_id})
                db.commit()
        except Exception as error:
            print(f"Error in deleting the product - {error} - {traceback.format_exc()}")
            return False
        else:
            return True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def create_product(self, product_details, owner_id):
        try:
            with DatabaseConnection.get_session() as db:
                insert_query = text(self.__insert_product)
                db.execute(insert_query, {
                    "name": product_details['name'],
                    "description": product_details['description'],
                    "cost_price": product_details['cost_price'],
                    "selling_price": product_details['selling_price'],
                    "category": product_details['category'],
                    "stock_available": product_details['stock_available'],
                    "units_sold": product_details['units_sold'],
                    "customer_rating": product_details['customer_rating'],
                    "demand_forecast": product_details['demand_forecast'],
                    "optimized_price": product_details['optimized_price'],
                    "owner_uuid": owner_id
                })
                db.commit() 
        except Exception as error:
            print(f"Error in creating the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return "", True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def get_all_products_admin(self):
        try:
            with DatabaseConnection.get_session() as db:
                select_admin_query = text(self.__select_all_products_admin)
                value = db.execute(select_admin_query).fetchall()
        except Exception as error:
            print(f"Error in retrieving all the products - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return value, True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

    async def search_products(self, owner_id, search_item):
        # based on the search 
        try:
            with DatabaseConnection.get_session() as db:
                search_query = text(self.__search_name_query)
                value = db.execute(search_query, {"search_term": f'%{search_item}%', "owner_id": owner_id}).fetchall()
                if not value:
                    search_query = text(self.__search_category_query)
                    value = db.execute(search_query, {"search_term": f'%{search_item}%', "owner_id": owner_id}).fetchall()
        except Exception as error:
            print(f"Error in the searching the value - {error}")
            return error, False
        else:
            return value, True

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 