from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.lsp import Lsp, CreateLsp
from src.api.endpoints.lsp import functions as lsp_functions

lsp_module = APIRouter()


@lsp_module.post('/', response_model=Lsp)
async def create_new_lsp(lsp: CreateLsp, db: Session = Depends(get_db)):
    new_lsp = lsp_functions.create_new_lsp(db, lsp)
    return new_lsp


@lsp_module.get('/',
                response_model=list[Lsp],
                # dependencies=[Depends(RoleChecker(['admin']))]
                )
async def read_all_lsp(db: Session = Depends(get_db)):
    return lsp_functions.read_all_lsp(db)


@lsp_module.get('/{lsp_id}',
                response_model=Lsp,
                )
async def read_lsp_by_id(lsp_id: int, db: Session = Depends(get_db)):
    return lsp_functions.get_lsp_by_id(db, lsp_id)


@lsp_module.patch('/{lsp_id}',
                  response_model=Lsp,
                  )
async def update_lsp(lsp_id: int,
                     lsp: CreateLsp,
                     db: Session = Depends(get_db)):
    print(f"Received data: {lsp.model_dump()}")
    return lsp_functions.update_lsp(db, lsp_id, lsp)


@lsp_module.delete('/{lsp_id}')
async def delete_lsp(lsp_id: int, db: Session = Depends(get_db)):
    return lsp_functions.delete_lsp(db, lsp_id)
