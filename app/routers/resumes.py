from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .util.schemas import Resume, ResumeCreate, User, ResumeUpdate, ResumeFull
from ..database import crud
from ..database.db import get_db as db
from .util.deps import get_current_active_user, get_owned_resume
from .util.fns import update_existing_resource

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
                  owned_resume: bool = Depends(get_owned_resume)):
    return update_existing_resource(db, resume_id, resume, Resume,
                                    crud.get_resume, crud.update_resume)


@router.get("/{resume_id}", response_model=ResumeFull)
def get_resume(resume_id: int,
               db: Session = Depends(db),
               owned_resume: bool = Depends(get_owned_resume)):
    return owned_resume
