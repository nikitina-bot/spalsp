import json
from pydantic import BaseModel


class ExtractionInput(BaseModel):
    lsp_id: int
    document_id: int
    ontology_id: int
    dictionary_id: int

    class Config:
        arbitrary_types_allowed = True


class ExtractionOutput(BaseModel):
    matches: json
    concordances: json
    termins: json
    relations: json
    path: json

    class Config:
        arbitrary_types_allowed = True


class OntologyDictionaryInput(BaseModel):
    matches: json
    concordances: json
    termins: json
    relations: json
    path: json

    class Config:
        arbitrary_types_allowed = True


class OntologyDictionaryOutput(BaseModel):
    path: json

    class Config:
        arbitrary_types_allowed = True
