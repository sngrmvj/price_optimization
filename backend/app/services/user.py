from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, HTTPException
import jwt
from app.crud.user import UserCrud
from datetime import timedelta, datetime



class UserService:

    @staticmethod
    async def validate_user(details):
        access_token, role = None, None
        try:
            usercrud = UserCrud()
            user_details, role = await usercrud.fetch_user(details=details)
            if not user_details:
                raise Exception("No User available / Password may not matched")
            
            format_output = {
                'uuid': str(user_details[0]),
                'email': user_details[1],
                'is_active': user_details[3],
                'role': role
            }
            token_service = TokenService()
            access_token = await token_service.create_access_token(format_output)
        except Exception as error:
            print("Error in the validate user service - ", error)
        finally:
            return access_token, role
        

    @staticmethod
    async def register_user(details):
        output = None
        try:
            usercrud = UserCrud()
            output = await usercrud.add_user(details=details)
            if not output:
                raise Exception("User not registered properly")
        except Exception as error:
            print("Error in the validate user service - ", error)
        finally:
            return output 



class TokenService:

    def __init__(self):
        self.SECRET_KEY = "TAkPFD5hJB96JO92brsBOeauWRAOSGvv"
        self.ALGORITHM = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES = 30

    async def create_access_token(self, data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.now() + expires_delta
        else:
            expire = datetime.now() + timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt

    async def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            return payload
        except Exception as e:
            print(f"Token decode error: {e}")
            return None


# async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#     except JWTError:
#         raise credentials_exception
#     user = crud.get_user_by_email(db, email=username)
#     if user is None:
#         raise credentials_exception
#     return user