from fastapi import APIRouter, HTTPException, Request, Depends
from app.services.product import ProductService
from app.services.user import TokenService
import json, traceback


router = APIRouter()


# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.post("/create")
async def create_product(request: Request):

    try:
        request_body = await request.body()
        request_body = json.loads(request_body.decode("utf-8"))
        auth_header = request_body['headers']['Authorization']
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)

    data = []
    try:
        data, value =await ProductService.create_product(request_body['data'], decoded_token['uuid'])
        if not value:
            raise Exception("Error in creating the product")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in creating the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"message": "Product created successfully", "data": data}

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.get("/view")
async def view_product(request: Request, product: str):

    try:

        auth_header = request.headers.get('authorization')
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)

    try:
        data, value = await ProductService.fetch_product(decoded_token['uuid'], product)
        if not value:
            raise Exception("Error in fetching the product")
    except Exception as error:
        print(error, traceback.format_exc()) 
        return HTTPException(detail=f"Error in fetching the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"data": data}


# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.put("/update")
async def update_product(request: Request):

    try:
        request_body = await request.body()
        request_body = json.loads(request_body.decode("utf-8"))
        auth_header = request_body['headers']['Authorization']
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)

    try:
        data, value = await ProductService.update_product(decoded_token['uuid'], request_body['data'])
        if not value:
            raise Exception(data)
    except Exception as error:
        print(error, traceback.format_exc()) 
        return HTTPException(detail=f"Error in update the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"message": "Successfully updated"}

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.delete("/delete")
async def delete_product(request: Request,product: str):
    try:

        auth_header = request.headers.get('authorization')
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)
    
    try:
        data, value = await ProductService.delete_product(decoded_token['uuid'], product)
        if not value:
            raise Exception(data)
        
        data, value =await ProductService.fetch_all_products(decoded_token['uuid'])
        if not value:
            raise Exception("Error in creating the product")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in deleting the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"message": "Deleted successfully", "data":data}

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.get("/search")
async def search_products_wildcard(request: Request, search_item):
    try:

        auth_header = request.headers.get('authorization')
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)
    
    data = []
    try:
        data, value =await ProductService.search_products(decoded_token['uuid'], search_item)
        if not value:
            raise Exception(data)
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in creating the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"data": data}

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 

@router.get("/all_products")
async def get_all_products_user(request: Request):
    try:

        auth_header = request.headers.get('authorization')
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)

    data = []
    try:
        data, value =await ProductService.fetch_all_products(decoded_token['uuid'])
        if not value:
            raise Exception("Error in creating the product")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in creating the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"data": data}
    

# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 


@router.get("/admin/all_products")
async def get_all_products_user(request: Request):
    try:

        auth_header = request.headers.get('authorization')
        if auth_header is None:
            raise HTTPException(status_code=403, detail="Authorization header missing")
        
        token = auth_header.split(" ")[1]
        token_service = TokenService()
        decoded_token = await token_service.decode_token(token)
        if not decoded_token:
            raise Exception("Contact Admin as the token decoded failed")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in decoding the token - {error} - {traceback.format_exc()}", status_code=500)

    data = []
    try:
        data, value =await ProductService.fetch_all_products(decoded_token['uuid'])
        if not value:
            raise Exception("Error in creating the product")
    except Exception as error:
        print(error, traceback.format_exc()) 
        raise HTTPException(detail=f"Error in creating the product - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"data": data}


# ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== # ===== 
