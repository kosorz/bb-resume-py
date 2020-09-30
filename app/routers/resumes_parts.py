from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import InfoUpdate, Info, Skills, SkillsUpdate, SkillsGroup, SkillsGroupUpdate
from ..database import crud
from ..database.db import get_db as db
from .util.deps import current_user_owns_resume
from .util.fns import execute_update

router = APIRouter()


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


@router.patch("/{resume_id}/skills", response_model=Skills)
def update_skills(resume_id: int,
                  skills: SkillsUpdate,
                  db: Session = Depends(db),
                  owns_resume: bool = Depends(current_user_owns_resume)):
    stored_skills = crud.get_resume_skills(db, resume_id)
    if not stored_skills:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not found")
    if not stored_skills.resume_id == resume_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    return execute_update(db, resume_id, skills, Skills,
                          crud.get_resume_skills, crud.update_resume_skills)


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
    if not stored_skills_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not found")
    if not stored_skills_group.skills_id == skills_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    return execute_update(db, group_id, skills_group, SkillsGroup,
                          crud.get_skills_group, crud.update_skills_group)
