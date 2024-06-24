from fastapi import APIRouter
from src.api.endpoints.ontologies.ontologies import ontologies_module

ontologies_router = APIRouter()

ontologies_router.include_router(
    ontologies_module,
    prefix="/api/v1/ontologies",
    tags=["ontologies"],
    responses={404: {"description": "Not found"}},
)
