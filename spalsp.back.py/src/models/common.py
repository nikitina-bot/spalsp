from sqlalchemy import Column, Integer
from src.core.db import Base


class CommonModel(Base):
    __abstract__ = True

    id = Column(Integer, primary_key=True, index=True)
