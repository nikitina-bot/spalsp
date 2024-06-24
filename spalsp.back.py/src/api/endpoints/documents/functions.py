from fastapi import HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models import document as DocumentModel
from src.schemas.documents import CreateDocument

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_document_by_id(db: Session, document_id: int):
    db_document = db.query(DocumentModel.DocumentRepo).filter(
        DocumentModel.DocumentRepo.id == document_id
        ).first()
    if db_document is None:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_document


def create_new_document(db: Session, document: CreateDocument):
    new_document = DocumentModel.DocumentRepo(name=document.name,
                                              path_id=document.path_id,
                                              content=document.content
                                              )
    db.add(new_document)
    db.commit()
    db.refresh(new_document)
    return new_document


def read_all_document(db: Session):
    return db.query(DocumentModel.DocumentRepo).all()


def update_document(db: Session, document_id: int,
                    document: CreateDocument):
    db_document = get_document_by_id(db, document_id)
    newdocument = document
    newdocument.content = document.content
    updated_data = newdocument.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(db_document, key, value)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document


def delete_document(db: Session, document_id: int):
    db_document = get_document_by_id(db, document_id)
    db.delete(db_document)
    db.commit()
    return {"msg": f"{db_document.name} deleted successfully"}
