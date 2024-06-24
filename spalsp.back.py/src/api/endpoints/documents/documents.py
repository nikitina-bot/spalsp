from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.core.dependencies import get_db
from src.schemas.documents import Document, CreateDocument
from src.api.endpoints.documents import functions as document_functions

documents_module = APIRouter()


@documents_module.post('/', response_model=Document)
async def create_new_document(document: CreateDocument,
                              db: Session = Depends(get_db)):
    new_document = document_functions.create_new_document(db, document)
    return new_document


@documents_module.get('/',
                      response_model=list[Document],
                      )
async def read_all_document(db: Session = Depends(get_db)):
    return document_functions.read_all_document(db)


@documents_module.get('/{document_id}',
                      response_model=Document,
                      )
async def read_document_by_id(document_id: int,
                              db: Session = Depends(get_db)):
    return document_functions.get_document_by_id(db, document_id)


@documents_module.patch('/{document_id}',
                        response_model=Document,
                        )
async def update_document(document_id: int,
                          document: CreateDocument,
                          db: Session = Depends(get_db)):
    print(f"Received data: {document.model_dump()}")
    return document_functions.update_document(db,
                                              document_id,
                                              document)


@documents_module.delete('/{document_id}')
async def delete_document(document_id: int, db: Session = Depends(get_db)):
    return document_functions.delete_document(db, document_id)
