from sqlalchemy import Column, ForeignKey, Integer
from src.core.db import Base
from src.models.common import CommonModel
from .category import Category
from .country import Country
from .domain import Domain
from .style import Style
from .subdomain import Subdomain


class Path(CommonModel):
    __tablename__ = "paths"

    country_id = Column(Integer,
                        ForeignKey('countries.id', ondelete='CASCADE'),
                        nullable=False,
                        )
    style_id = Column(Integer,
                      ForeignKey('styles.id', ondelete='CASCADE'),
                      nullable=False,
                      )
    category_id = Column(Integer,
                         ForeignKey('categories.id', ondelete='CASCADE'),
                         nullable=False,
                         )
    domain_id = Column(Integer,
                       ForeignKey('domains.id', ondelete='CASCADE'),
                       nullable=False,
                       )
    subdomain_id = Column(Integer,
                          ForeignKey('subdomains.id', ondelete='CASCADE'),
                          nullable=True,
                          )
    user_id = Column(Integer,
                     ForeignKey('users.id', ondelete='CASCADE'),
                     nullable=True,
                     )

    def __repr__(self):
        return f"{self.id}"


metadata = Base.metadata
