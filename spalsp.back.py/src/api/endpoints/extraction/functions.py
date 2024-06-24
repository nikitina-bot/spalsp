from json import dumps
from sqlalchemy.orm import Session
from src.api.endpoints.dictionaries.functions import get_dictionary_by_id
from src.api.endpoints.documents.functions import get_document_by_id
from src.api.endpoints.lsp.functions import get_lsp_by_id
from src.api.endpoints.ontologies.functions import get_ontology_by_id
from src.schemas.extraction import ExtractionInput, OntologyDictionaryInput
from src.models import ontology as OntologyModel


def create_new_extraction(db: Session, extraction: ExtractionInput):
    lsp = get_lsp_by_id(db, extraction.lsp_id)
    document = get_document_by_id(db, extraction.document_id)
    ontology = get_ontology_by_id(db, extraction.ontology_id)
    dictionary = get_dictionary_by_id(db, extraction.dictionary_id)
    
    extraction_trace = {
        "matches":
            {"match1": 1, "match2": 2, "match3": 3},
        "concordances":
            {"concordances1": "concordances2"},
        "termins":
            {"term1": "term2"},
        "relations":
            {"rel1": 1},
        "path": {"path1": 1},
    }

    new_ontology = OntologyModel.OntologyRepo(name=ontology.name,
                                              path_id=ontology.path_id,
                                              content=dumps(
                                                     ontology.content
                                                    )
                                              )
    db.add(new_ontology)
    db.commit()
    db.refresh(new_ontology)
    return extraction_trace


def create_new_dictionary(db: Session, extraction: OntologyDictionaryInput):
    return {"path": {"yes": "done"}}


def create_new_ontology(db: Session, extraction: OntologyDictionaryInput):
    return {"path": {"yes": "done"}}
