from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import country as CountryModel
from src.schemas.smartrepository import CreateCountry

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_country_by_id(db: Session, country_id: int):
    db_country = db.query(CountryModel.Country).filter(
        CountryModel.Country.id == country_id
        ).first()
    if db_country is None:
        raise HTTPException(status_code=404, detail="Country not found")
    return db_country


def create_new_country(db: Session, country: CreateCountry):
    new_country = CountryModel.Country(name=country.name)
    db.add(new_country)
    db.commit()
    db.refresh(new_country)
    return new_country


def read_all_country(db: Session):
    return db.query(CountryModel.Country).all()


def update_country(db: Session, country_id: int,
                   country: CreateCountry):
    db_country = get_country_by_id(db, country_id)
    updated_data = country.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_country, key, value)
    db.add(db_country)
    db.commit()
    db.refresh(db_country)
    return db_country


def delete_country(db: Session, country_id: int):
    db_country = get_country_by_id(db, country_id)
    db.delete(db_country)
    db.commit()
    return {"msg": f"{db_country.name} deleted successfully"}
