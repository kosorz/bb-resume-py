from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .schemas import Skills, SkillsUpdate, SkillsGroup, SkillsGroupUpdate, SkillsFull
from ...resumes.schemas import ResumeFull
from ....util.deps import get_owns_resume, get_current_user_skills, get_current_user_skills_groups, db
from ....util.fns import update_existing_resource, find_item_with_key_value, delete_existing_resource
from ....db import crud

router = APIRouter()


@router.post(
    "/{resume_id}/skills",
    response_model=Skills,
    name="skills:create-skills",
)
def create_skills(
    resume_id: int,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills),
    owns_resume: ResumeFull = Depends(get_owns_resume)):
    find_item_with_key_value(list=current_user_skills,
                             key="resume_id",
                             value=resume_id,
                             error=False,
                             throw_on_present=True)
    db_skills = crud.create_resume_skills(db, resume_id)
    crud.create_skills_group(db, db_skills.id)
    return db_skills


@router.patch(
    "/skills/{skills_id}",
    response_model=Skills,
    name="skills:update-skills",
)
def update_skills(
    skills_id: int,
    skills: SkillsUpdate,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, "id", skills_id)
    return update_existing_resource(db, skills_id, skills, Skills,
                                    crud.get_skills, crud.update_skills)


@router.post(
    "/{skills_id}/skills_group",
    response_model=SkillsGroup,
    name="skills:create-skills-group",
)
def create_skill_group(
    skills_id: int,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, "id", skills_id)
    return crud.create_skills_group(db, skills_id)


@router.patch(
    "/skills_group/{group_id}",
    response_model=SkillsGroup,
    name="skills:update-skills-group",
)
def update_skill_group(group_id: int,
                       skills_group: SkillsGroupUpdate,
                       db: Session = Depends(db),
                       current_user_skills_groups: List[SkillsGroup] = Depends(
                           get_current_user_skills_groups)):
    find_item_with_key_value(current_user_skills_groups, "id", group_id)
    return update_existing_resource(db, group_id, skills_group, SkillsGroup,
                                    crud.get_skills_group,
                                    crud.update_skills_group)


@router.delete(
    "/skills_group/{group_id}",
    response_model=int,
    name="skills:delete-skills-group",
)
def delete_skill_group(
    group_id: int,
    db: Session = Depends(db),
    current_user_skills_groups: List[SkillsGroup] = Depends(
        get_current_user_skills_groups),
):
    if len(current_user_skills_groups) <= 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    find_item_with_key_value(current_user_skills_groups, "id", group_id)
    return delete_existing_resource(db, group_id, SkillsGroup,
                                    crud.delete_skills_group)
