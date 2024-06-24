from fastapi import APIRouter
from src.api.endpoints.lsp.lsp import lsp_module

lsp_router = APIRouter()

lsp_router.include_router(
    lsp_module,
    prefix="/api/v1/lsp",
    tags=["lsp"],
    responses={404: {"description": "Not found"}},
)
