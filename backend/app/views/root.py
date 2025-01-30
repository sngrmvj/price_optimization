
from fastapi import APIRouter
from app.views.endpoints import user, product


api_router = APIRouter()
api_router.include_router(user.router, prefix="/user", tags=["User"])
api_router.include_router(product.router, prefix="/product", tags=["Product"])


@api_router.get("/ping")
async def ping():
    return "<h3>You are connected to Price Optimising tool</h3>"