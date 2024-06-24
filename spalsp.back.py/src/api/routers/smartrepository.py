from fastapi import APIRouter
from src.api.endpoints.smartrepository.paths import paths_module
from src.api.endpoints.smartrepository.countries import countries_module
from src.api.endpoints.smartrepository.styles import styles_module
from src.api.endpoints.smartrepository.categories import categories_module
from src.api.endpoints.smartrepository.domains import domains_module
from src.api.endpoints.smartrepository.subdomains import subdomains_module
from src.api.endpoints.smartrepository.paths import paths_full_module
from src.api.endpoints.smartrepository.paths import paths_full_onto_module
from src.api.endpoints.smartrepository.paths import paths_full_docs_module
from src.api.endpoints.smartrepository.paths import paths_full_lsp_module
from src.api.endpoints.smartrepository.paths import paths_full_dicts_module
from src.api.endpoints.smartrepository.paths import paths_full_structure_module
from src.api.endpoints.smartrepository.paths import paths_full_several_module


smartrepository_router = APIRouter()

smartrepository_router.include_router(
    paths_module,
    prefix="/api/v1/paths",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_structure_module,
    prefix="/api/v1/paths/full/structure",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)


smartrepository_router.include_router(
    paths_full_module,
    prefix="/api/v1/paths/full/all",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_several_module,
    prefix="/api/v1/paths/full",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_onto_module,
    prefix="/api/v1/paths/full/ontologies",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_docs_module,
    prefix="/api/v1/paths/full/documents",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_lsp_module,
    prefix="/api/v1/paths/full/lsp",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    paths_full_dicts_module,
    prefix="/api/v1/paths/full/dictionaries",
    tags=["smartrepository paths"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    countries_module,
    prefix="/api/v1/contents/countries",
    tags=["smartrepository contents"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    styles_module,
    prefix="/api/v1/contents/styles",
    tags=["smartrepository contents"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    categories_module,
    prefix="/api/v1/contents/categories",
    tags=["smartrepository contents"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    domains_module,
    prefix="/api/v1/contents/domains",
    tags=["smartrepository contents"],
    responses={404: {"description": "Not found"}},
)

smartrepository_router.include_router(
    subdomains_module,
    prefix="/api/v1/contents/subdomains",
    tags=["smartrepository contents"],
    responses={404: {"description": "Not found"}},
)
