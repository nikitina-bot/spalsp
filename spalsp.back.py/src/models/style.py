from sqlalchemy import Column, String
from src.core.db import Base
from src.models.common import CommonModel


class Style(CommonModel):
    __tablename__ = "styles"

    name = Column(String, nullable=False)

    def __repr__(self):
        return f"{self.name}"


metadata = Base.metadata
