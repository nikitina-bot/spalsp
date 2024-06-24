import json
from typing import Optional
from pydantic import BaseModel


class CreatePath(BaseModel):
    country_id: int
    style_id: int
    category_id: int
    domain_id: int
    subdomain_id: int
    user_id: Optional[int]


class Path(CreatePath):
    id: int


class FullPath(BaseModel):
    content: json

    class Config:
        arbitrary_types_allowed = True


class CreateCountry(BaseModel):
    name: str


class Country(CreateCountry):
    id: int


class CreateStyle(BaseModel):
    name: str


class Style(CreateStyle):
    id: int


class CreateCategory(BaseModel):
    name: str


class Category(CreateCategory):
    id: int


class CreateDomain(BaseModel):
    name: str


class Domain(CreateDomain):
    id: int


class CreateSubdomain(BaseModel):
    name: str


class Subdomain(CreateSubdomain):
    id: int
