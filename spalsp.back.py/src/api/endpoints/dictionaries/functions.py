from json import dumps
from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import dictionary as DictionaryModel
from src.schemas.dictionaries import CreateDictionary

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_dictionary_by_id(db: Session, dictionary_id: int):
    db_dictionary = db.query(DictionaryModel.DictionaryRepo).filter(
        DictionaryModel.DictionaryRepo.id == dictionary_id
        ).first()
    if db_dictionary is None:
        raise HTTPException(status_code=404, detail="Dictionary not found")
    return db_dictionary


def create_new_dictionary(db: Session, dictionary: CreateDictionary):
    new_dictionary = DictionaryModel.DictionaryRepo(name=dictionary.name,
                                                    path_id=dictionary.path_id,
                                                    content=dumps(
                                                        dictionary.content
                                                        )
                                                    )
    db.add(new_dictionary)
    db.commit()
    db.refresh(new_dictionary)
    return new_dictionary


def read_all_dictionary(db: Session):
    return db.query(DictionaryModel.DictionaryRepo).all()


def update_dictionary(db: Session, dictionary_id: int,
                      dictionary: CreateDictionary):
    db_dictionary = get_dictionary_by_id(db, dictionary_id)
    newdictionary = dictionary
    newdictionary.content = dumps(dictionary.content)
    updated_data = newdictionary.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_dictionary, key, value)
    db.add(db_dictionary)
    db.commit()
    db.refresh(db_dictionary)
    return db_dictionary


def delete_dictionary(db: Session, dictionary_id: int):
    db_dictionary = get_dictionary_by_id(db, dictionary_id)
    db.delete(db_dictionary)
    db.commit()
    return {"msg": f"{db_dictionary.name} deleted successfully"}
