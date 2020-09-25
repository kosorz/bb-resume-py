from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .schemas import Resume, ResumeCreate, User, ResumeUpdate
from ..database import crud
from ..database.db import get_db as db
from ..routers.auth import get_current_active_user

router = APIRouter()


@router.post("/", response_model=Resume)
def create_resume_for_user(
    resume: ResumeCreate,
    db: Session = Depends(db),
    current_user: User = Depends(get_current_active_user)):
    return crud.create_user_resume(db, resume, user_id=current_user.id)


@router.patch("/{resume_id}", response_model=Resume)
def update_resume(resume_id: int,
                  resume: ResumeUpdate,
                  db: Session = Depends(db),
                  current_user: User = Depends(get_current_active_user)):
    stored_resume_data = crud.get_resume(db, resume_id)
    if not stored_resume_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found")
    if not stored_resume_data.owner_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
        )
    stored_resume_model = Resume(**stored_resume_data.__dict__)
    update_data = resume.dict(exclude_unset=True)
    updated_resume = stored_resume_model.copy(update=update_data)
    crud.update_resume(db, updated_resume)
    return updated_resume
