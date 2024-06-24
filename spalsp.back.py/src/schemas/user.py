from pydantic import BaseModel
from typing import Optional


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str
    first_name: str | None = None
    last_name: str | None = None
    role_id: int


class UserLogin(UserBase):
    password: str


class User(UserBase):
    id: int
    first_name: Optional[str]
    last_name: Optional[str]
    role_id: int

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    password: str
    first_name: str | None = None
    last_name: str | None = None
    role_id: int | None = None


class Token(BaseModel):
    access_token: str
    token_type: str
