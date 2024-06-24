from fastapi import APIRouter
from src.api.endpoints.extraction.extraction import extraction_module
from src.api.endpoints.extraction.extraction import create_onto_module
from src.api.endpoints.extraction.extraction import create_dict_module

extraction_router = APIRouter()

extraction_router.include_router(
    extraction_module,
    prefix="/api/v1/extract",
    tags=["extraction"],
    responses={404: {"description": "Not found"}},
)

extraction_router.include_router(
    create_onto_module,
    prefix="/api/v1/create/ontology",
    tags=["extraction"],
    responses={404: {"description": "Not found"}},
)

extraction_router.include_router(
    create_dict_module,
    prefix="/api/v1/create/dictionary",
    tags=["extraction"],
    responses={404: {"description": "Not found"}},
)
