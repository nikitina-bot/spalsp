from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import Country, CreateCountry
from src.api.endpoints.smartrepository import functions_c as country_functions

countries_module = APIRouter()


@countries_module.post('/', response_model=Country)
async def create_new_country(country: CreateCountry,
                             db: Session = Depends(get_db)):
    new_country = country_functions.create_new_country(db, country)
    return new_country


@countries_module.get('/',
                      response_model=list[Country],
                      )
async def read_all_country(db: Session = Depends(get_db)):
    return country_functions.read_all_country(db)


@countries_module.get('/{country_id}',
                      response_model=Country,
                      )
async def read_country_by_id(country_id: int,
                             db: Session = Depends(get_db)):
    return country_functions.get_country_by_id(db, country_id)


@countries_module.patch('/{country_id}',
                        response_model=Country,
                        )
async def update_country(country_id: int,
                         country: CreateCountry,
                         db: Session = Depends(get_db)):
    print(f"Received data: {country.model_dump()}")
    return country_functions.update_country(db,
                                            country_id,
                                            country)


@countries_module.delete('/{country_id}')
async def delete_country(country_id: int, db: Session = Depends(get_db)):
    return country_functions.delete_country(db, country_id)
