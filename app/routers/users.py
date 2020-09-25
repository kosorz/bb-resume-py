from typing import List
from fastapi import Depends, APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from .util.schemas import UserPublic, User
from ..database import crud
from ..database.db import get_db as db
from ..routers.util.deps import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[UserPublic])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(db)):
    users = crud.get_users(db, skip, limit)
    return users


@router.get("/me/", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user