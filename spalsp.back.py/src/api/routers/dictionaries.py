from fastapi import APIRouter
from src.api.endpoints.dictionaries.dictionaries import dictionaries_module

dictionaries_router = APIRouter()

dictionaries_router.include_router(
    dictionaries_module,
    prefix="/api/v1/dictionaries",
    tags=["dictionaries"],
    responses={404: {"description": "Not found"}},
)
