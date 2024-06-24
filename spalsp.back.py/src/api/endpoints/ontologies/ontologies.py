from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.ontologies import Ontology, CreateOntology
from src.api.endpoints.ontologies import functions as ontology_functions

ontologies_module = APIRouter()


@ontologies_module.post('/', response_model=Ontology)
async def create_new_ontology(ontology: CreateOntology,
                              db: Session = Depends(get_db)):
    new_ontology = ontology_functions.create_new_ontology(db, ontology)
    return new_ontology


@ontologies_module.get('/',
                       response_model=list[Ontology],
                       )
async def read_all_ontology(db: Session = Depends(get_db)):
    return ontology_functions.read_all_ontology(db)


@ontologies_module.get('/{ontology_id}',
                       response_model=Ontology,
                       )
async def read_ontology_by_id(ontology_id: int, db: Session = Depends(get_db)):
    return ontology_functions.get_ontology_by_id(db, ontology_id)


@ontologies_module.patch('/{ontology_id}',
                         response_model=Ontology,
                         )
async def update_ontology(ontology_id: int,
                          ontology: CreateOntology,
                          db: Session = Depends(get_db)):
    print(f"Received data: {ontology.model_dump()}")
    return ontology_functions.update_ontology(db, ontology_id, ontology)


@ontologies_module.delete('/{ontology_id}')
async def delete_ontology(ontology_id: int, db: Session = Depends(get_db)):
    return ontology_functions.delete_ontology(db, ontology_id)
