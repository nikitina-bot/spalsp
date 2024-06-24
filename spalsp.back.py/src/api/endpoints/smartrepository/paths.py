import json
from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import FullPath, Path, CreatePath
from src.api.endpoints.smartrepository import functions as path_functions

paths_module = APIRouter()


@paths_module.post('/', response_model=Path)
async def create_new_path(path: CreatePath,
                          db: Session = Depends(get_db)):
    new_path = path_functions.create_new_path(db, path)
    return new_path


@paths_module.get('/',
                  response_model=list[Path],
                  )
async def read_all_path(
                        
                        db: Session = Depends(get_db)):
    return path_functions.read_all_path(db)


@paths_module.get('/{path_id}',
                  response_model=Path,
                  )
async def read_path_by_id(path_id: int,
                          db: Session = Depends(get_db)):
    return path_functions.get_path_by_id(db, path_id)


@paths_module.patch('/{path_id}',
                    response_model=Path,
                    )
async def update_path(path_id: int,
                      path: CreatePath,
                      db: Session = Depends(get_db)):
    print(f"Received data: {path.model_dump()}")
    return path_functions.update_path(db,
                                      path_id,
                                      path)


@paths_module.delete('/{path_id}')
async def delete_path(path_id: int, db: Session = Depends(get_db)):
    return path_functions.delete_path(db, path_id)


paths_full_module = APIRouter()


@paths_full_module.get('/',
                       response_model=FullPath,
                       )
async def read_full_path(db: Session = Depends(get_db)):
    return path_functions.read_full_path(db)

paths_full_several_module = APIRouter()


@paths_full_several_module.get('/',
                               response_model=FullPath,
                               )
async def read_full_several_path(objects: str, db: Session = Depends(get_db)):
    return path_functions.read_full_several_path(objects, db)

paths_full_structure_module = APIRouter()


@paths_full_structure_module.get('/',
                                 response_model=FullPath,
                                 )
async def read_full_structure_path(db: Session = Depends(get_db)):
    return path_functions.read_full_structure_path(db)

paths_full_onto_module = APIRouter()


@paths_full_onto_module.get('/',
                            response_model=FullPath,
                            )
async def read_full_onto_path(db: Session = Depends(get_db)):
    return path_functions.read_full_onto_path(db)

paths_full_docs_module = APIRouter()


@paths_full_docs_module.get('/',
                            response_model=FullPath,
                            )
async def read_full_docs_path(db: Session = Depends(get_db)):
    return path_functions.read_full_docs_path(db)

paths_full_lsp_module = APIRouter()


@paths_full_lsp_module.get('/',
                           response_model=FullPath,
                           )
async def read_full_lsps_path(db: Session = Depends(get_db)):
    return path_functions.read_full_lsp_path(db)

paths_full_dicts_module = APIRouter()


@paths_full_dicts_module.get('/',
                             response_model=FullPath,
                             )
async def read_full_dicts_path(db: Session = Depends(get_db)):
    return path_functions.read_full_dicts_path(db)
