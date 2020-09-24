from typing import List
from fastapi import Depends, APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from . import schemas
from ..database import crud
from ..database.db import get_db as db
from ..routers.auth import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[schemas.UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(db)):
    users = crud.get_users(db=db, skip=skip, limit=limit)
    return users


@router.post("/items/", response_model=schemas.Item)
def create_item_for_user(
    item: schemas.ItemCreate,
    db: Session = Depends(db),
    current_user: schemas.User = Depends(get_current_active_user)):
    return crud.create_user_item(db=db, item=item, user_id=current_user.id)


@router.get("/me/", response_model=schemas.User)
def read_users_me(
        current_user: schemas.User = Depends(get_current_active_user)):
    return current_user