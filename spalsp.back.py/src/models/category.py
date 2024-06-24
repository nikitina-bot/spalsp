from sqlalchemy import Column, String
from src.core.db import Base
from src.models.common import CommonModel


class Category(CommonModel):
    __tablename__ = "categories"

    name = Column(String, nullable=False)

    def __repr__(self):
        return f"{self.name}"


metadata = Base.metadata
