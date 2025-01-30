

import os, traceback
from app.crud.product import ProductCrud


class ProductService:

    async def fetch_product(owner_id, product_id):
        try:
            product_crud = ProductCrud()
            data, value = await product_crud.get_product(product_id, owner_id)
            if not value:
                raise Exception("Error in retrieving the product. Check with Admin")
            result = {
                "product_id": data[0],
                "name": data[1],
                "description": data[2],
                "cost_price": data[3],
                "selling_price": data[4],
                "category": data[5],
                "stock_available": data[6],
                "units_sold": data[7],
                "customer_rating": data[8],
                "demand_forecast": data[9],
                "optimized_price": data[10],
            }
        except Exception as error:
            print(f"Error in deleting the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return result, True

    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def fetch_all_products(owner_id):
        result = []
        try:
            product_crud = ProductCrud()
            
            data, flag = await product_crud.get_all_products(owner_id)
            if not flag:
                raise Exception(data)

            for item in data:
                result.append({
                    "product_id": item[0],
                    "name": item[1],
                    "description": item[2],
                    "cost_price": item[3],
                    "selling_price": item[4],
                    "category": item[5],
                    "stock_available": item[6],
                    "units_sold": item[7],
                    "customer_rating": item[8],
                    "demand_forecast": item[9],
                    "optimized_price": item[10],
                })
        except Exception as error:
            print(f"Error in fetching all the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return result, True


    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def update_product(owner_id, product_details):
        try:
            product_crud = ProductCrud()
            data, value = await product_crud.update_product(product_details, owner_id)
            if not value:
                raise Exception(data)
        except Exception as error:
            print(f"Error in deleting the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return "", True


    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def delete_product(owner_id, product_id):
        try:
            product_crud = ProductCrud()
            value = await product_crud.delete_product(product_id, owner_id)
            if not value:
                raise Exception("Error in deleting the product. Check with Admin")
        except Exception as error:
            print(f"Error in deleting the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return "", True


    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def create_product(product_details, owner_id):
        result = []
        try:
            product_crud = ProductCrud()
            output, flag = await product_crud.create_product(product_details, owner_id)
            if not flag:
                raise Exception(output)
            
            data, flag = await product_crud.get_all_products(owner_id)
            if not flag:
                raise Exception(data)
            for item in data:
                result.append({
                    "product_id": item[0],
                    "name": item[1],
                    "description": item[2],
                    "cost_price": item[3],
                    "selling_price": item[4],
                    "category": item[5],
                    "stock_available": item[6],
                    "units_sold": item[7],
                })
        except Exception as error:
            print(f"Error in creating the product - {error} - {traceback.format_exc()}")
            return error, False
        else:
            return result, True


    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def get_all_products_for_admin():

        result = []
        try:
            product_crud = ProductCrud()
            
            data, flag = await product_crud.get_all_products_admin()
            if not flag:
                raise Exception(data)
            for item in data:
                result.append({
                    "product_id": item[0],
                    "name": item[1],
                    "description": item[2],
                    "cost_price": item[3],
                    "selling_price": item[4],
                    "category": item[5],
                    "stock_available": item[6],
                    "units_sold": item[7],
                    "customer_rating": item[8],
                    "demand_forecast": item[9],
                    "optimized_price": item[10],
                })
        except Exception as error:
            print(f"Error in fetching all the product for admin- {error} - {traceback.format_exc()}")
            return error, False
        else:
            return result, True


    # ------------------------------------------------------------------------------------------------------------------------------------------------
    # 
    # ------------------------------------------------------------------------------------------------------------------------------------------------
    async def search_products(owner_id, search_item):
        result = []
        try:
            product_crud = ProductCrud()
            
            data, flag = await product_crud.search_products(owner_id, search_item)
            if not flag:
                raise Exception(data)
            for item in data:
                result.append({
                    "product_id": item[0],
                    "name": item[1],
                    "description": item[2],
                    "cost_price": item[3],
                    "selling_price": item[4],
                    "category": item[5],
                    "stock_available": item[6],
                    "units_sold": item[7],
                    "customer_rating": item[8],
                    "demand_forecast": item[9],
                    "optimized_price": item[10],
                })
        except Exception as error:
            print(f"Error in fetching all the product for admin- {error} - {traceback.format_exc()}")
            return error, False
        else:
            return result, True



    