from fastapi import FastAPI
import uvicorn
from src.core.modules import init_routers
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    app_ = FastAPI(
        title="FastAPI starter kit",
        description="FastAPI starter kit",
        version="1.0.0",
        # dependencies=[Depends(Logging)],
        # middleware=make_middleware(),
    )
    origins = ["*"]
    app_.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    init_routers(app_=app_)
    return app_


app = create_app()


if __name__ == "__main__":
    uvicorn.run("main:app", host='127.0.0.1', port=8000, reload=True)
