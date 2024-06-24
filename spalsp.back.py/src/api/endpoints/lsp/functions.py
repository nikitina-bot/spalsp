from json import dumps
from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import lsp as LspModel
from src.schemas.lsp import CreateLsp

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_lsp_by_id(db: Session, lsp_id: int):
    db_lsp = db.query(LspModel.LspRepo).filter(
        LspModel.LspRepo.id == lsp_id
        ).first()
    if db_lsp is None:
        raise HTTPException(status_code=404, detail="Lsp not found")
    return db_lsp


def create_new_lsp(db: Session, lsp: CreateLsp):
    new_lsp = LspModel.LspRepo(name=lsp.name,
                               path_id=lsp.path_id,
                               content=dumps(lsp.content))
    db.add(new_lsp)
    db.commit()
    db.refresh(new_lsp)
    return new_lsp


def read_all_lsp(db: Session):
    return db.query(LspModel.LspRepo).all()


def update_lsp(db: Session, lsp_id: int, lsp: CreateLsp):
    db_lsp = get_lsp_by_id(db, lsp_id)
    newlsp = lsp
    newlsp.content = dumps(lsp.content)
    updated_data = newlsp.model_dump(exclude_unset=True)  # partial update
    for key, value in updated_data.items():
        setattr(db_lsp, key, value)
    db.add(db_lsp)
    db.commit()
    db.refresh(db_lsp)
    return db_lsp


def delete_lsp(db: Session, lsp_id: int):
    db_lsp = get_lsp_by_id(db, lsp_id)
    db.delete(db_lsp)
    db.commit()
    return {"msg": f"{db_lsp.name} deleted successfully"}
