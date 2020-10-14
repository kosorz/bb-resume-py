from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .schemas import Skills, SkillsUpdate, SkillsGroup, SkillsGroupUpdate, SkillsFull
from ...resumes.schemas import ResumeFull
from ...util.deps import get_owns_resume, get_current_user_skills, get_current_user_skills_groups, get_current_user_resumes, get_current_user_experience, get_current_user_experience_units
from ...util.fns import update_existing_resource, find_item_with_key_value
from ....database import crud
from ....database.db import get_db as db

router = APIRouter()


@router.post("/{resume_id}/skills", response_model=Skills)
def create_skills(
    resume_id: int,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills),
    owns_resume: ResumeFull = Depends(get_owns_resume)):
    stored_skills = find_item_with_key_value(current_user_skills, 'resume_id',
                                             resume_id, False)
    if stored_skills:
        if not stored_skills.deleted:
            return stored_skills
        return update_existing_resource(db, resume_id,
                                        SkillsUpdate(deleted=False), Skills,
                                        crud.get_resume_skills,
                                        crud.update_resume_skills)
    db_skills = crud.create_resume_skills(db, resume_id)
    crud.create_skills_group(db, db_skills.id)
    return db_skills


@router.patch("/skills/{skills_id}", response_model=Skills)
def update_skills(
    skills_id: int,
    skills: SkillsUpdate,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, 'id', skills_id)
    return update_existing_resource(db, skills_id, skills, Skills,
                                    crud.get_skills, crud.update_skills)


@router.post("/{skills_id}/skills_group", response_model=SkillsGroup)
def create_skill_group(
    skills_id: int,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, 'id', skills_id)
    return crud.create_skills_group(db, skills_id)


@router.patch("/skills_group/{group_id}", response_model=SkillsGroup)
def update_skill_group(group_id: int,
                       skills_group: SkillsGroupUpdate,
                       db: Session = Depends(db),
                       current_user_skills_groups: List[SkillsGroup] = Depends(
                           get_current_user_skills_groups)):
    find_item_with_key_value(current_user_skills_groups, 'id', group_id)
    return update_existing_resource(db, group_id, skills_group, SkillsGroup,
                                    crud.get_skills_group,
                                    crud.update_skills_group)
