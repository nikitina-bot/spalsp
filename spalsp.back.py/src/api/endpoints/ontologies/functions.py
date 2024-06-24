from json import dumps
from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import ontology as OntologyModel
from src.schemas.ontologies import CreateOntology

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_ontology_by_id(db: Session, ontology_id: int):
    db_ontology = db.query(OntologyModel.OntologyRepo).filter(
        OntologyModel.OntologyRepo.id == ontology_id
        ).first()
    if db_ontology is None:
        raise HTTPException(status_code=404, detail="Ontology not found")
    return db_ontology


def create_new_ontology(db: Session, ontology: CreateOntology):
    new_ontology = OntologyModel.OntologyRepo(name=ontology.name,
                                              path_id=ontology.path_id,
                                              content=dumps(
                                                     ontology.content
                                                    )
                                              )
    db.add(new_ontology)
    db.commit()
    db.refresh(new_ontology)
    return new_ontology


def read_all_ontology(db: Session):
    return db.query(OntologyModel.OntologyRepo).all()


def update_ontology(db: Session, ontology_id: int,
                    ontology: CreateOntology):
    db_ontology = get_ontology_by_id(db, ontology_id)
    newontology = ontology
    newontology.content = dumps(ontology.content)
    updated_data = newontology.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_ontology, key, value)
    db.add(db_ontology)
    db.commit()
    db.refresh(db_ontology)
    return db_ontology


def delete_ontology(db: Session, ontology_id: int):
    db_ontology = get_ontology_by_id(db, ontology_id)
    db.delete(db_ontology)
    db.commit()
    return {"msg": f"{db_ontology.name} deleted successfully"}
