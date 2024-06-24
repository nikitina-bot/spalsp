from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import domain as DomainModel
from src.schemas.smartrepository import CreateDomain

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_domain_by_id(db: Session, domain_id: int):
    db_domain = db.query(DomainModel.Domain).filter(
        DomainModel.Domain.id == domain_id
        ).first()
    if db_domain is None:
        raise HTTPException(status_code=404, detail="Domain not found")
    return db_domain


def create_new_domain(db: Session, domain: CreateDomain):
    new_domain = DomainModel.Domain(name=domain.name)
    db.add(new_domain)
    db.commit()
    db.refresh(new_domain)
    return new_domain


def read_all_domain(db: Session):
    return db.query(DomainModel.Domain).all()


def update_domain(db: Session, domain_id: int,
                  domain: CreateDomain):
    db_domain = get_domain_by_id(db, domain_id)
    updated_data = domain.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_domain, key, value)
    db.add(db_domain)
    db.commit()
    db.refresh(db_domain)
    return db_domain


def delete_domain(db: Session, domain_id: int):
    db_domain = get_domain_by_id(db, domain_id)
    db.delete(db_domain)
    db.commit()
    return {"msg": f"{db_domain.name} deleted successfully"}
