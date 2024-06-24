from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import Subdomain, CreateSubdomain
from src.api.endpoints.smartrepository import functions_b as sdomain_functions

subdomains_module = APIRouter()


@subdomains_module.post('/', response_model=Subdomain)
async def create_new_subdomain(subdomain: CreateSubdomain,
                               db: Session = Depends(get_db)):
    new_subdomain = sdomain_functions.create_new_subdomain(db, subdomain)
    return new_subdomain


@subdomains_module.get('/',
                       response_model=list[Subdomain],
                       )
async def read_all_subdomain(
                             
                             db: Session = Depends(get_db)):
    return sdomain_functions.read_all_subdomain(db)


@subdomains_module.get('/{subdomain_id}',
                       response_model=Subdomain,
                       )
async def read_subdomain_by_id(subdomain_id: int,
                               db: Session = Depends(get_db)):
    return sdomain_functions.get_subdomain_by_id(db, subdomain_id)


@subdomains_module.patch('/{subdomain_id}',
                         response_model=Subdomain,
                         )
async def update_subdomain(subdomain_id: int,
                           subdomain: CreateSubdomain,
                           db: Session = Depends(get_db)):
    print(f"Received data: {subdomain.model_dump()}")
    return sdomain_functions.update_subdomain(db,
                                              subdomain_id,
                                              subdomain)


@subdomains_module.delete('/{subdomain_id}')
async def delete_subdomain(subdomain_id: int, db: Session = Depends(get_db)):
    return sdomain_functions.delete_subdomain(db, subdomain_id)
