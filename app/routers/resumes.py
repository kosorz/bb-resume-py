from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .util.schemas import Resume, ResumeCreate, User, ResumeUpdate, ResumeFull
from ..database import crud
from ..database.db import get_db as db
from .util.deps import get_current_active_user, current_user_owns_resume
from .util.fns import execute_update

router = APIRouter()


@router.post("/", response_model=Resume)
def create_resume(resume: ResumeCreate,
                  db: Session = Depends(db),
                  current_user: User = Depends(get_current_active_user)):
    db_resume = crud.create_user_resume(db, resume, current_user.id)
    crud.create_resume_info(db, db_resume.id, current_user.username)
    return db_resume


@router.patch("/{resume_id}", response_model=Resume)
def update_resume(resume_id: int,
                  resume: ResumeUpdate,
                  db: Session = Depends(db),
                  owns_resume: bool = Depends(current_user_owns_resume)):
    return execute_update(db, resume_id, resume, Resume, crud.get_resume,
                          crud.update_resume)


@router.get("/{resume_id}", response_model=ResumeFull)
def get_resume(resume_id: int,
               db: Session = Depends(db),
               owns_resume: bool = Depends(current_user_owns_resume)):
    return crud.get_full_resume(db, resume_id)
