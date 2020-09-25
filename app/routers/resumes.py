from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import Resume, ResumeCreate, User, ResumeUpdate, InfoUpdate, Info
from ..database import crud
from ..database.db import get_db as db
from ..routers.util.deps import get_current_active_user, current_user_owns_resume

router = APIRouter()


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
    stored_resume_data = crud.get_resume(db, resume_id)
    stored_resume_model = Resume(**stored_resume_data.__dict__)
    update_data = resume.dict(exclude_unset=True)
    updated_resume = stored_resume_model.copy(update=update_data)
    crud.update_resume(db, updated_resume)
    return updated_resume


@router.patch("/{resume_id}/info", response_model=Info)
def update_info(resume_id: int,
                info: InfoUpdate,
                db: Session = Depends(db),
                owns_resume: bool = Depends(current_user_owns_resume)):
    stored_info_data = crud.get_resume_info(db, resume_id)
    stored_info_model = Info(**stored_info_data.__dict__)
    update_data = info.dict(exclude_unset=True)
    updated_resume_info = stored_info_model.copy(update=update_data)
    crud.update_resume_info(db, updated_resume_info)
    return updated_resume_info
