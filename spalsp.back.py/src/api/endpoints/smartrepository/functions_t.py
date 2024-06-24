from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import category as CategoryModel
from src.schemas.smartrepository import CreateCategory

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_category_by_id(db: Session, category_id: int):
    db_category = db.query(CategoryModel.Category).filter(
        CategoryModel.Category.id == category_id
        ).first()
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category


def create_new_category(db: Session, category: CreateCategory):
    new_category = CategoryModel.Category(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


def read_all_category(db: Session):
    return db.query(CategoryModel.Category).all()


def update_category(db: Session, category_id: int,
                    category: CreateCategory):
    db_category = get_category_by_id(db, category_id)
    updated_data = category.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_category, key, value)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


def delete_category(db: Session, category_id: int):
    db_category = get_category_by_id(db, category_id)
    db.delete(db_category)
    db.commit()
    return {"msg": f"{db_category.name} deleted successfully"}
