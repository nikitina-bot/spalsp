import json
from pydantic import BaseModel


class CreateOntology(BaseModel):
    name: str
    path_id: int
    content: json

    class Config:
        arbitrary_types_allowed = True


class Ontology(CreateOntology):
    id: int
