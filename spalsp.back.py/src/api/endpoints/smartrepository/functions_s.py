from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import style as StyleModel
from src.schemas.smartrepository import CreateStyle

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_style_by_id(db: Session, style_id: int):
    db_style = db.query(StyleModel.Style).filter(
        StyleModel.Style.id == style_id
        ).first()
    if db_style is None:
        raise HTTPException(status_code=404, detail="Style not found")
    return db_style


def create_new_style(db: Session, style: CreateStyle):
    new_style = StyleModel.Style(name=style.name)
    db.add(new_style)
    db.commit()
    db.refresh(new_style)
    return new_style


def read_all_style(db: Session):
    return db.query(StyleModel.Style).all()


def update_style(db: Session, style_id: int,
                 style: CreateStyle):
    db_style = get_style_by_id(db, style_id)
    updated_data = style.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_style, key, value)
    db.add(db_style)
    db.commit()
    db.refresh(db_style)
    return db_style


def delete_style(db: Session, style_id: int):
    db_style = get_style_by_id(db, style_id)
    db.delete(db_style)
    db.commit()
    return {"msg": f"{db_style.name} deleted successfully"}
