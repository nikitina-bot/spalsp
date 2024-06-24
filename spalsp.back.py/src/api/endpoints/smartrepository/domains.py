from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.smartrepository import Domain, CreateDomain
from src.api.endpoints.smartrepository import functions_d as domain_functions

domains_module = APIRouter()


@domains_module.post('/', response_model=Domain)
async def create_new_domain(domain: CreateDomain,
                            db: Session = Depends(get_db)):
    new_domain = domain_functions.create_new_domain(db, domain)
    return new_domain


@domains_module.get('/',
                    response_model=list[Domain],
                    )
async def read_all_domain(
                          
                          db: Session = Depends(get_db)):
    return domain_functions.read_all_domain(db)


@domains_module.get('/{domain_id}',
                    response_model=Domain,
                    )
async def read_domain_by_id(domain_id: int,
                            db: Session = Depends(get_db)):
    return domain_functions.get_domain_by_id(db, domain_id)


@domains_module.patch('/{domain_id}',
                      response_model=Domain,
                      )
async def update_domain(domain_id: int,
                        domain: CreateDomain,
                        db: Session = Depends(get_db)):
    print(f"Received data: {domain.model_dump()}")
    return domain_functions.update_domain(db,
                                          domain_id,
                                          domain)


@domains_module.delete('/{domain_id}')
async def delete_domain(domain_id: int, db: Session = Depends(get_db)):
    return domain_functions.delete_domain(db, domain_id)
