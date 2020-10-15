from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import models
from .resources.auth import auth
from .resources.parts import parts
from .resources.resumes import resumes
from .resources.users import users
from .core import config, tasks


def get_application():
    app = FastAPI(title=config.PROJECT_NAME, version=config.VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_event_handler("startup", tasks.create_start_app_handler(app))
    app.add_event_handler("shutdown", tasks.create_stop_app_handler(app))
    app.include_router(auth.router, tags=["Auth"])
    app.include_router(users.router, prefix="/users", tags=["Users"])
    app.include_router(resumes.router, prefix="/resumes", tags=["Resumes"])
    app.include_router(parts.router, prefix="/parts")

    return app


app = get_application()
