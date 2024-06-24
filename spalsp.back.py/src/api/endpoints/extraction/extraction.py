from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.extraction import ExtractionInput, ExtractionOutput, OntologyDictionaryInput, OntologyDictionaryOutput
from src.api.endpoints.extraction import functions as extraction_functions

extraction_module = APIRouter()


@extraction_module.post('/', response_model=ExtractionOutput)
async def create_new_extraction(extraction: ExtractionInput,
                                db: Session = Depends(get_db)):
    new_extraction = extraction_functions.create_new_extraction(db, extraction)
    return new_extraction

create_onto_module = APIRouter()


@create_onto_module.post('/', response_model=OntologyDictionaryOutput)
async def create_new_ontology(extraction: OntologyDictionaryInput,
                              db: Session = Depends(get_db)):
    new_ontology = extraction_functions.create_new_ontology(db, extraction)
    return new_ontology

create_dict_module = APIRouter()


@create_dict_module.post('/', response_model=OntologyDictionaryOutput)
async def create_new_dictionary(extraction: OntologyDictionaryInput,
                                db: Session = Depends(get_db)):
    new_dictionary = extraction_functions.create_new_dictionary(db, extraction)
    return new_dictionary
