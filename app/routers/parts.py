from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import InfoUpdate, Info, Skills, SkillsFull, SkillsUpdate, SkillsGroup, SkillsGroupUpdate, Experience, ExperienceUpdate, ExperienceUnit, ExperienceUnitUpdate, ExperienceFull, ResumeFull
from ..database import crud
from ..database.db import get_db as db
from .util.deps import get_owns_resume, get_current_user_skills, get_current_user_skills_groups, get_current_user_resumes, get_current_user_experience, get_current_user_experience_units
from .util.fns import update_existing_resource, find_item_with_key_value

router = APIRouter()


# Info
@router.patch("/{resume_id}/info", response_model=Info, tags=['Infos'])
def update_resume_info(resume_id: int,
                       info: InfoUpdate,
                       db: Session = Depends(db),
                       current_user_resumes: List[ResumeFull] = Depends(
                           get_current_user_resumes)):
    find_item_with_key_value(current_user_resumes, 'id', resume_id)
    return update_existing_resource(db, resume_id, info, Info,
                                    crud.get_resume_info,
                                    crud.update_resume_info)


# Skills
@router.post("/{resume_id}/skills", response_model=Skills, tags=['Skills'])
def create_skills(
    resume_id: int,
    db: Session = Depends(db),
    current_user_skills: List[Skills] = Depends(get_current_user_skills),
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


@router.patch("/skills/{skills_id}", response_model=Skills, tags=['Skills'])
def update_skills(
    skills_id: int,
    skills: SkillsUpdate,
    db: Session = Depends(db),
    current_user_skills: List[SkillsFull] = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, 'id', skills_id)
    return update_existing_resource(db, skills_id, skills, Skills,
                                    crud.get_skills, crud.update_skills)


@router.post("/{skills_id}/skills_group",
             response_model=SkillsGroup,
             tags=['Skills'])
def create_skill_group(
    skills_id: int,
    db: Session = Depends(db),
    current_user_skills: bool = Depends(get_current_user_skills)):
    find_item_with_key_value(current_user_skills, 'id', skills_id)
    return crud.create_skills_group(db, skills_id)


@router.patch("/skills_group/{group_id}",
              response_model=SkillsGroup,
              tags=['Skills'])
def update_skill_group(group_id: int,
                       skills_group: SkillsGroupUpdate,
                       db: Session = Depends(db),
                       current_user_skills_groups: bool = Depends(
                           get_current_user_skills_groups)):
    find_item_with_key_value(current_user_skills_groups, 'id', group_id)
    return update_existing_resource(db, group_id, skills_group, SkillsGroup,
                                    crud.get_skills_group,
                                    crud.update_skills_group)


# Experience
@router.post("/{resume_id}/experience",
             response_model=Experience,
             tags=['Experience'])
def create_experience(resume_id: int,
                      db: Session = Depends(db),
                      current_user_experience: List[Skills] = Depends(
                          get_current_user_experience),
                      owns_resume: ResumeFull = Depends(get_owns_resume)):
    stored_experience = find_item_with_key_value(current_user_experience,
                                                 'resume_id', resume_id, False)
    if stored_experience:
        if not stored_experience.deleted:
            return stored_experience
        return update_existing_resource(db, resume_id,
                                        ExperienceUpdate(deleted=False),
                                        Experience, crud.get_resume_experience,
                                        crud.update_resume_experience)
    db_experience = crud.create_resume_experience(db, resume_id)
    crud.create_experience_unit(db, db_experience.id)
    return db_experience


@router.patch("/experience/{experience_id}",
              response_model=Experience,
              tags=['Experience'])
def update_experience(experience_id: int,
                      experience: ExperienceUpdate,
                      db: Session = Depends(db),
                      current_user_experience: List[ExperienceFull] = Depends(
                          get_current_user_experience)):
    find_item_with_key_value(current_user_experience, 'id', experience_id)
    return update_existing_resource(db, experience_id, experience, Experience,
                                    crud.get_experience,
                                    crud.update_experience)


@router.post("/{experience_id}/experience_unit",
             response_model=ExperienceUnit,
             tags=['Experience'])
def create_experience_unit(
    experience_id: int,
    db: Session = Depends(db),
    current_user_experience: bool = Depends(get_current_user_experience)):
    find_item_with_key_value(current_user_experience, 'id', experience_id)
    return crud.create_experience_unit(db, experience_id)


@router.patch("/experience_unit/{experience_id}",
              response_model=ExperienceUnit,
              tags=['Experience'])
def update_experience_unit(experience_id: int,
                           experience_unit: ExperienceUnitUpdate,
                           db: Session = Depends(db),
                           current_user_experience_units: bool = Depends(
                               get_current_user_experience_units)):
    find_item_with_key_value(current_user_experience_units, 'id',
                             experience_id)
    return update_existing_resource(db, experience_id, experience_unit,
                                    ExperienceUnit, crud.get_experience_unit,
                                    crud.update_experience_unit)