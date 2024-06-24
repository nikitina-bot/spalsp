import json
from pydantic import BaseModel


class CreateLsp(BaseModel):
    name: str
    path_id: int
    content: json

    class Config:
        arbitrary_types_allowed = True


class Lsp(CreateLsp):
    id: int
