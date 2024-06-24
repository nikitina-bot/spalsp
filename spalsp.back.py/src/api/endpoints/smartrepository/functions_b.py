from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import subdomain as SubdomainModel
from src.schemas.smartrepository import CreateSubdomain

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_subdomain_by_id(db: Session, subdomain_id: int):
    db_subdomain = db.query(SubdomainModel.Subdomain).filter(
        SubdomainModel.Subdomain.id == subdomain_id
        ).first()
    if db_subdomain is None:
        raise HTTPException(status_code=404, detail="Subdomain not found")
    return db_subdomain


def create_new_subdomain(db: Session, subdomain: CreateSubdomain):
    new_subdomain = SubdomainModel.Subdomain(name=subdomain.name)
    db.add(new_subdomain)
    db.commit()
    db.refresh(new_subdomain)
    return new_subdomain


def read_all_subdomain(db: Session):
    return db.query(SubdomainModel.Subdomain).all()


def update_subdomain(db: Session, subdomain_id: int,
                     subdomain: CreateSubdomain):
    db_subdomain = get_subdomain_by_id(db, subdomain_id)
    updated_data = subdomain.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_subdomain, key, value)
    db.add(db_subdomain)
    db.commit()
    db.refresh(db_subdomain)
    return db_subdomain


def delete_subdomain(db: Session, subdomain_id: int):
    db_subdomain = get_subdomain_by_id(db, subdomain_id)
    db.delete(db_subdomain)
    db.commit()
    return {"msg": f"{db_subdomain.name} deleted successfully"}
