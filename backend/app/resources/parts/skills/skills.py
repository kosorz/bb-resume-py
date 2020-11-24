from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .schemas import Skills, SkillsUpdate, SkillsGroup, SkillsGroupUpdate, SkillsFull
from ..schemas import OrderUpdate
from ...resumes.fns import adjust_section_position, move, check_create_section_target
from ...resumes.schemas import ResumeFull
from ....util.deps import get_owned_resume, get_current_user_skills, get_current_user_skills_groups, db
from ....util.fns import update_existing_resource, find_item_with_key_value, delete_existing_resource
from ....db import crud

router = APIRouter()


@router.post(
    "/{resume_id}/skills/{target}",
    response_model=Skills,
    name="skills:create",
)
def create_skills(
    resume_id: int,
    target: str,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills),
    owned_resume: ResumeFull = Depends(get_owned_resume)):
    find_item_with_key_value(list=current_user_skills,
                             key="resume_id",
                             value=resume_id,
                             error=False,
                             throw_on_present=True)
    check_create_section_target(target)
    skills = crud.create_resume_skills(db, resume_id)
    group = crud.create_skills_group(db, skills.id)
    adjust_section_position(db, owned_resume, 'skills', target, True)
    return update_existing_resource(db, skills.id,
                                    OrderUpdate(order=[group.id]), Skills,
                                    crud.get_skills, crud.update_skills)


@router.patch(
    "/skills/{skills_id}",
    response_model=Skills,
    name="skills:update",
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
    name="skills:create-group",
)
def create_skill_group(
    skills_id: int,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    skills = find_item_with_key_value(current_user_skills, "id", skills_id)
    group = crud.create_skills_group(db, skills_id)
    update_existing_resource(db, skills_id,
                             OrderUpdate(order=[*skills.order, group.id]),
                             Skills, crud.get_skills, crud.update_skills)
    return group


@router.patch(
    "/skills_group/{group_id}",
    response_model=SkillsGroup,
    name="skills:update-group",
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


@router.post(
    "/skills_group/{group_id}/move/{direction}",
    response_model=List,
    name="skills:move-group",
)
def move_skill_group(
    group_id: int,
    direction: str,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills),
    current_user_skills_groups: List[SkillsGroup] = Depends(
        get_current_user_skills_groups),
):
    group = find_item_with_key_value(current_user_skills_groups, "id",
                                     group_id)
    skills = find_item_with_key_value(current_user_skills, "id",
                                      group.skills_id)
    return update_existing_resource(
        db, skills.id,
        OrderUpdate(order=move(direction, skills.order, group_id)), Skills,
        crud.get_skills, crud.update_skills).order


@router.delete(
    "/skills_group/{group_id}",
    response_model=int,
    name="skills:delete-group",
)
def delete_skill_group(
    group_id: int,
    db: Session = Depends(db),
    current_user_skills_groups: List[SkillsGroup] = Depends(
        get_current_user_skills_groups),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills),
):
    if len(current_user_skills_groups) <= 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    group = find_item_with_key_value(current_user_skills_groups, "id",
                                     group_id)
    skills = find_item_with_key_value(current_user_skills, "id",
                                      group.skills_id)
    update_existing_resource(
        db, skills.id,
        OrderUpdate(
            order=[*filter(lambda g_id: g_id != group_id, skills.order)]),
        Skills, crud.get_skills, crud.update_skills)
    return delete_existing_resource(db, group_id, crud.delete_skills_group)
