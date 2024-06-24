from fastapi import APIRouter
from .user import user_router
from .lsp import lsp_router
from .dictionaries import dictionaries_router
from .ontologies import ontologies_router
from .documents import documents_router
from .smartrepository import smartrepository_router
from .extraction import extraction_router

router = APIRouter()

router.include_router(dictionaries_router)
router.include_router(documents_router)
router.include_router(lsp_router)
router.include_router(ontologies_router)
router.include_router(smartrepository_router)
router.include_router(user_router)
router.include_router(extraction_router)
