from sqlalchemy import Column, ForeignKey, Integer, String
from src.core.db import Base
from .common import CommonModel


class User(CommonModel):
    __tablename__ = "users"

    email = Column(String, unique=True, nullable=False)
    password = Column(String)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    role_id = Column(Integer,
                     ForeignKey('roles.id', ondelete='CASCADE'),
                     nullable=False,
                     )

    def __repr__(self):
        return f"{self.email}"


metadata = Base.metadata


class Role(CommonModel):
    __tablename__ = "roles"

    role = Column(String,
                  nullable=False
                  )

    def __repr__(self):
        return f"{self.role}"


metadata = Base.metadata
