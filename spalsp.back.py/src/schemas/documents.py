import json
from pydantic import BaseModel


class CreateDocument(BaseModel):
    name: str
    path_id: int
    content: json

    class Config:
        arbitrary_types_allowed = True


class Document(CreateDocument):
    id: int
