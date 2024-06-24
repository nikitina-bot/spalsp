from sqlalchemy import Column, ForeignKey, Integer, String
from src.core.db import Base
from src.models.common import CommonModel
from .path import Path


class DictionaryRepo(CommonModel):
    __tablename__ = "dictionaries"

    name = Column(String,
                  nullable=False
                  )
    path_id = Column(Integer,
                     ForeignKey('paths.id', ondelete='CASCADE'),
                     nullable=False,
                     )
    content = Column(String,
                     nullable=False
                     )

    def __repr__(self):
        return f"{self.path_id}"


metadata = Base.metadata
