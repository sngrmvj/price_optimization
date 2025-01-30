

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from app.services.user import UserService
import traceback, json


router = APIRouter()


@router.put("/login")
async def login(request: Request):

    try:
        request_body = await request.body()
        request_body = json.loads(request_body.decode("utf-8"))
        user_details, role = await UserService.validate_user(request_body['data'])
        if not user_details:
            raise HTTPException(status_code=404, detail="User not found")
    except HTTPException as httpError:
        raise httpError
    except Exception as error:
        print(f"Error in verification of user details - {error} - {traceback.format_exc()}")
        raise HTTPException(detail=f"Error in verification of user details - {error} - {traceback.format_exc()}", status_code=500)
    else:
        response = JSONResponse(content={"message": "Login successful", "role":role, "access_token": user_details}) 
        response.set_cookie(key="access_token", value=user_details, httponly=True, secure=False, samesite="lax") 
        return response



@router.post("/register")
async def register(request: Request):

    try:
        request_body = await request.body()
        request_body = json.loads(request_body.decode("utf-8"))
        user_details = await UserService.register_user(request_body['data'])
        if not user_details:
            raise Exception("User not registered properly. Contact Admin")
    except Exception as error:
        print(f"Error in adding user details - {error} - {traceback.format_exc()}")
        raise HTTPException(detail=f"Error in adding user details - {error} - {traceback.format_exc()}", status_code=500)
    else:
        return {"message":"Successful"}
