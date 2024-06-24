from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.dictionaries import Dictionary, CreateDictionary
from src.api.endpoints.dictionaries import functions as dictionary_functions

dictionaries_module = APIRouter()


@dictionaries_module.post('/', response_model=Dictionary)
async def create_new_dictionary(dictionary: CreateDictionary,
                                db: Session = Depends(get_db)):
    new_dictionary = dictionary_functions.create_new_dictionary(db, dictionary)
    return new_dictionary


@dictionaries_module.get('/',
                         response_model=list[Dictionary],
                         )
async def read_all_dictionary(db: Session = Depends(get_db)):
    return dictionary_functions.read_all_dictionary(db)


@dictionaries_module.get('/{dictionary_id}',
                         response_model=Dictionary,
                         )
async def read_dictionary_by_id(dictionary_id: int,
                                db: Session = Depends(get_db)):
    return dictionary_functions.get_dictionary_by_id(db, dictionary_id)


@dictionaries_module.patch('/{dictionary_id}',
                           response_model=Dictionary,
                           )
async def update_dictionary(dictionary_id: int,
                            dictionary: CreateDictionary,
                            db: Session = Depends(get_db)):
    print(f"Received data: {dictionary.model_dump()}")
    return dictionary_functions.update_dictionary(db,
                                                  dictionary_id,
                                                  dictionary)


@dictionaries_module.delete('/{dictionary_id}')
async def delete_dictionary(dictionary_id: int, db: Session = Depends(get_db)):
    return dictionary_functions.delete_dictionary(db, dictionary_id)
