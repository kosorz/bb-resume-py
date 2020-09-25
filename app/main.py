from typing import List
from fastapi import FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from .database import models
from .routers import users, resumes, auth
from .database.db_config import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(
    auth.router,
    tags=["auth"],
)

app.include_router(
    users.router,
    prefix="/users",
    tags=["users"],
)

app.include_router(
    resumes.router,
    prefix="/resumes",
    tags=["resumes"],
)