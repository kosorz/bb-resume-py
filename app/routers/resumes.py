from typing import List, Callable, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import Resume, ResumeCreate, User, ResumeUpdate, InfoUpdate, Info
from ..database import crud
from ..database.db import get_db as db
from ..routers.util.deps import get_current_active_user, current_user_owns_resume

router = APIRouter()


def execute_update(
    db: Session,
    resource_id: int,
    data: Any,
    model: Any,
    read_fn: Callable,
    update_fn: Callable,
):
    stored_data = read_fn(db, resource_id)
    stored_model = model(**stored_data.__dict__)
    update_data = data.dict(exclude_unset=True)
    updated_data = stored_model.copy(update=update_data)
    update_fn(db, updated_data)
    return updated_data


@router.post("/", response_model=Resume)
def create_resume(resume: ResumeCreate,
                  db: Session = Depends(db),
                  current_user: User = Depends(get_current_active_user)):
    db_resume = crud.create_user_resume(db, resume, current_user.id)
    crud.create_resume_info(db, db_resume.id, current_user.username,
                            current_user.id)
    return crud.get_resume(db, resume_id=db_resume.id)


@router.patch("/{resume_id}", response_model=Resume)
def update_resume(resume_id: int,
                  resume: ResumeUpdate,
                  db: Session = Depends(db),
                  owns_resume: bool = Depends(current_user_owns_resume)):
    return execute_update(db, resume_id, resume, Resume, crud.get_resume,
                          crud.update_resume)


@router.patch("/{resume_id}/info", response_model=Info)
def update_info(resume_id: int,
                info: InfoUpdate,
                db: Session = Depends(db),
                owns_resume: bool = Depends(current_user_owns_resume)):
    return execute_update(db, resume_id, info, Info, crud.get_resume_info,
                          crud.update_resume_info)
