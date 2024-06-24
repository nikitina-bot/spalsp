from fastapi import FastAPI
from src.api.routers.api import router


def init_routers(app_: FastAPI) -> None:
    app_.include_router(router)
    # admin dashboard
    # admin = Admin(app_, engine)
    # admin.add_view(UserAdmin)
