import json
from pydantic import BaseModel


class CreateDictionary(BaseModel):
    name: str
    path_id: int
    content: json

    class Config:
        arbitrary_types_allowed = True


class Dictionary(CreateDictionary):
    id: int
