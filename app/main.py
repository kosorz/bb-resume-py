from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from .database import models
from .routers import users, items
from .database.db_config import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(
    users.router,
    prefix="/users",
    tags=["users"],
)

app.include_router(
    items.router,
    prefix="/items",
    tags=["items"],
)