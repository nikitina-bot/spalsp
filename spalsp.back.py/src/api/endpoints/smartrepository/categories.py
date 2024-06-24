from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import Category, CreateCategory
from src.api.endpoints.smartrepository import functions_t as category_functions

categories_module = APIRouter()


@categories_module.post('/', response_model=Category)
async def create_new_category(category: CreateCategory,
                              db: Session = Depends(get_db)):
    new_category = category_functions.create_new_category(db, category)
    return new_category


@categories_module.get('/',
                       response_model=list[Category],
                       )
async def read_all_category(db: Session = Depends(get_db)):
    return category_functions.read_all_category(db)


@categories_module.get('/{category_id}',
                       response_model=Category,
                       )
async def read_category_by_id(category_id: int,
                              db: Session = Depends(get_db)):
    return category_functions.get_category_by_id(db, category_id)


@categories_module.patch('/{category_id}',
                         response_model=Category,
                         )
async def update_category(category_id: int,
                          category: CreateCategory,
                          db: Session = Depends(get_db)):
    print(f"Received data: {category.model_dump()}")
    return category_functions.update_category(db,
                                              category_id,
                                              category)


@categories_module.delete('/{category_id}')
async def delete_category(category_id: int, db: Session = Depends(get_db)):
    return category_functions.delete_category(db, category_id)
