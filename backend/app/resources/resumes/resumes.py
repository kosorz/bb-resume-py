from typing import List
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from .fns import adjust_section_position
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
    name="resumes:create-resume",
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
    name="resumes:update-resume",
)
async def update_resume(
        resume: ResumeUpdate,
        db: Session = Depends(db),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    return update_existing_resource(db, owned_resume.id, resume, Resume,
                                    crud.get_resume, crud.update_resume)


@router.post(
    "/{resume_id}/section/{section}/move/{direction}",
    response_model=Content,
    name="resumes:move-resume-section",
)
async def move_resume_section(
    section: str,
    direction: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_section_position(db, owned_resume, section, direction)


@router.post(
    "/{resume_id}/section/{section}/migrate",
    response_model=Content,
    name="resumes:migrate-resume-section",
)
async def migrate_resume_section(
    section: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_section_position(db, owned_resume, section, 'migrate')


@router.post(
    "/{resume_id}/section/{section}/unlist",
    response_model=Content,
    name="resumes:unlist-resume-section",
)
async def unlist_resume_section(
    section: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_section_position(db, owned_resume, section, 'unlist')


@router.post(
    "/{resume_id}/section/{section}/list/{column}",
    response_model=Content,
    name="resumes:list-resume-section",
)
async def list_resume_section(
    section: str,
    column: str,
    db: Session = Depends(db),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    return adjust_section_position(db, owned_resume, section, column)


@router.get(
    "/{resume_id}",
    response_model=ResumeFull,
    name="resumes:get-resume",
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

    order = adjust_section_position(db, owned_resume, section, "remove")
    delete_existing_resource(
        db,
        owned_resume.id,
        delete_methods[section],
    )
    return order
