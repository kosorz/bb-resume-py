from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .schemas import UserPublic, User
from ...db import crud
from ...util.deps import get_current_active_user, db

router = APIRouter()


@router.get(
    "/",
    response_model=List[UserPublic],
    name="users:get",
)
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(db)):
    users = crud.get_users(db, skip, limit)
    return users


@router.get(
    "/me/",
    response_model=User,
    name="users:get-me",
)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user