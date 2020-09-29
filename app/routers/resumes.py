from typing import List, Callable, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import Resume, ResumeCreate, User, ResumeUpdate, InfoUpdate, Info, Skills, SkillsCreate, SkillsUpdate, SkillsGroup, SkillsGroupUpdate
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
    if not stored_data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found")
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
    crud.create_resume_info(db, db_resume.id, current_user.username)
    return db_resume


@router.patch("/{resume_id}", response_model=Resume)
def update_resume(resume_id: int,
                  resume: ResumeUpdate,
                  db: Session = Depends(db),
                  owns_resume: bool = Depends(current_user_owns_resume)):
    return execute_update(db, resume_id, resume, Resume, crud.get_resume,
                          crud.update_resume)


@router.patch("/{resume_id}/info", response_model=Info)
def update_resume_info(resume_id: int,
                       info: InfoUpdate,
                       db: Session = Depends(db),
                       owns_resume: bool = Depends(current_user_owns_resume)):
    return execute_update(db, resume_id, info, Info, crud.get_resume_info,
                          crud.update_resume_info)


@router.post("/{resume_id}/skills", response_model=Skills)
def create_skills(resume_id: int,
                  db: Session = Depends(db),
                  owns_resume: bool = Depends(current_user_owns_resume)):
    stored_skills = crud.get_resume_skills(db, resume_id)
    if stored_skills:
        if not stored_skills.deleted:
            return stored_skills
        return execute_update(db, resume_id, SkillsUpdate(deleted=False),
                              Skills, crud.get_resume_skills,
                              crud.update_resume_skills)
    db_skills = crud.create_resume_skills(db, resume_id)
    crud.create_skills_group(db, db_skills.id)
    return db_skills


@router.post("/{resume_id}/skills/{skills_id}/skills_group",
             response_model=SkillsGroup)
def create_skill_group(resume_id: int,
                       skills_id: int,
                       db: Session = Depends(db),
                       owns_resume: bool = Depends(current_user_owns_resume)):
    stored_skills = crud.get_resume_skills(db, resume_id)
    if not stored_skills:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not found")
    if not stored_skills.id == skills_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    return crud.create_skills_group(db, skills_id)


@router.patch("/{resume_id}/skills/{skills_id}/group{group_id}",
              response_model=SkillsGroupUpdate)
def update_skill_group(resume_id: int,
                       group_id: int,
                       skills_id: int,
                       skills_group: SkillsGroupUpdate,
                       db: Session = Depends(db),
                       owns_resume: bool = Depends(current_user_owns_resume)):
    stored_skills_group = crud.get_skills_group(db, group_id)
    if not stored_skills_group.skills_id == skills_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    return execute_update(db, group_id, skills_group, SkillsGroup,
                          crud.get_skills_group, crud.update_skills_group)
