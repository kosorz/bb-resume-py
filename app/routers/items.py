from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from . import schemas
from ..database import crud
from ..database.db import get_db as db

router = APIRouter()


@router.get("/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items
