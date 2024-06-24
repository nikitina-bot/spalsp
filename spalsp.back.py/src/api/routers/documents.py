from fastapi import APIRouter
from src.api.endpoints.documents.documents import documents_module

documents_router = APIRouter()

documents_router.include_router(
    documents_module,
    prefix="/api/v1/documents",
    tags=["documents"],
    responses={404: {"description": "Not found"}},
)
