from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import Style, CreateStyle
from src.api.endpoints.smartrepository import functions_s as style_functions

styles_module = APIRouter()


@styles_module.post('/', response_model=Style)
async def create_new_style(style: CreateStyle,
                           db: Session = Depends(get_db)):
    new_style = style_functions.create_new_style(db, style)
    return new_style


@styles_module.get('/',
                   response_model=list[Style],
                   )
async def read_all_style(db: Session = Depends(get_db)):
    return style_functions.read_all_style(db)


@styles_module.get('/{style_id}',
                   response_model=Style,
                   )
async def read_style_by_id(style_id: int,
                           db: Session = Depends(get_db)):
    return style_functions.get_style_by_id(db, style_id)


@styles_module.patch('/{style_id}',
                     response_model=Style,
                     )
async def update_style(style_id: int,
                       style: CreateStyle,
                       db: Session = Depends(get_db)):
    print(f"Received data: {style.model_dump()}")
    return style_functions.update_style(db,
                                        style_id,
                                        style)


@styles_module.delete('/{style_id}')
async def delete_style(style_id: int, db: Session = Depends(get_db)):
    return style_functions.delete_style(db, style_id)
