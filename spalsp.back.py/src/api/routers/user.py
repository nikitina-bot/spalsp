from fastapi import APIRouter
from src.api.endpoints.user.user import user_module
from src.api.endpoints.user.auth import auth_module

user_router = APIRouter()

user_router.include_router(
    user_module,
    prefix="/api/v1/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

user_router.include_router(
    auth_module,
    prefix="/api/v1",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)
