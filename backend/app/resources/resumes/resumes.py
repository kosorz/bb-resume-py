from typing import List
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from .fns import adjust_resume_orders
from ..resumes.schemas import Resume, ResumeCreate, ResumeUpdate, ResumeFull, Content
from ..users.schemas import User
from ..parts.experience.schemas import Experience
from ...util.deps import get_current_active_user, get_owned_resume, db
from ...util.fns import update_existing_resource, find_item_with_key_value, delete_existing_resource
from ...db import crud

router = APIRouter()


@router.post(
    "/",
    response_model=Resume,
    name="resumes:create",
)
def create_resume(resume: ResumeCreate,
                  db: Session = Depends(db),
                  current_user: User = Depends(get_current_active_user)):
    db_resume = crud.create_user_resume(db, resume, current_user.id)
    crud.create_resume_info(db, db_resume.id, current_user.username)
    return db_resume


@router.patch(
    "/{resume_id}",
    response_model=Resume,
    name="resumes:update",
)
async def update_resume(
        resume: ResumeUpdate,
        db: Session = Depends(db),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    return update_existing_resource(db, owned_resume.id, resume, Resume,
                                    crud.get_resume, crud.update_resume)


@router.post(
    "/{resume_id}/column/{column}/reorganize",
    response_model=Content,
    name="resumes:reorganize",
)
async def reorganize_resume(
    column: str,
    requested_order: List[str],
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_resume_orders(db, owned_resume, requested_order, column)


@router.post(
    "/{resume_id}/section/{section}/migrate",
    response_model=Content,
    name="resumes:migrate-section",
)
async def migrate_resume_section(
    section: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_resume_orders(db, owned_resume, 'migrate', section)


@router.post(
    "/{resume_id}/section/{section}/unlist",
    response_model=Content,
    name="resumes:unlist-section",
)
async def unlist_resume_section(
    section: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_resume_orders(db, owned_resume, 'unlist', section)


@router.post(
    "/{resume_id}/section/{section}/list/{column}",
    response_model=Content,
    name="resumes:list-section",
)
async def list_resume_section(
    section: str,
    column: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_resume_orders(db, owned_resume, column, section)


@router.get(
    "/{resume_id}",
    response_model=ResumeFull,
    name="resumes:get",
)
def get_resume(
        db: Session = Depends(db),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    return owned_resume


@router.delete(
    "/{resume_id}/section/{section}",
    response_model=Content,
    name="resumes:delete-section",
)
def delete_resume_section(
        section: str,
        db: Session = Depends(db),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    delete_methods = {
        "experience": crud.delete_experience,
        "skills": crud.delete_skills
    }
    if section not in list(
            delete_methods.keys()) or not getattr(owned_resume, section):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    order = adjust_resume_orders(db, owned_resume, "remove", section)
    delete_existing_resource(
        db,
        owned_resume.id,
        delete_methods[section],
    )
    return order
