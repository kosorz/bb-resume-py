from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .util.schemas import InfoUpdate, Info, Skills, SkillsUpdate, SkillsGroup, SkillsGroupUpdate, Experience, ExperienceUpdate, ExperienceUnit, ExperienceUnitUpdate
from ..database import crud
from ..database.db import get_db as db
from .util.deps import get_owned_resume
from .util.fns import update_existing_resource, get_existing_resource, check_resource_appurtenance

router = APIRouter()


@router.patch("/{resume_id}/info", response_model=Info, tags=['Infos'])
def update_resume_info(info: InfoUpdate,
                       db: Session = Depends(db),
                       owned_resume: bool = Depends(get_owned_resume)):
    return update_existing_resource(db, owned_resume.id, info, Info,
                                    crud.get_resume_info,
                                    crud.update_resume_info)


@router.post("/{resume_id}/skills", response_model=Skills, tags=['Skills'])
def create_skills(db: Session = Depends(db),
                  owned_resume: bool = Depends(get_owned_resume)):
    stored_skills = crud.get_resume_skills(db, owned_resume.id)
    if stored_skills:
        if not stored_skills.deleted:
            return stored_skills
        return update_existing_resource(db, owned_resume.id,
                                        SkillsUpdate(deleted=False), Skills,
                                        crud.get_resume_skills,
                                        crud.update_resume_skills)
    db_skills = crud.create_resume_skills(db, owned_resume.id)
    crud.create_skills_group(db, db_skills.id)
    return db_skills


@router.patch("/{resume_id}/skills", response_model=Skills, tags=['Skills'])
def update_skills(skills: SkillsUpdate,
                  db: Session = Depends(db),
                  owned_resume: bool = Depends(get_owned_resume)):
    stored_skills = get_existing_resource(db, owned_resume.id,
                                          crud.get_resume_skills)
    check_resource_appurtenance(stored_skills, 'resume_id', owned_resume.id)
    return update_existing_resource(db, owned_resume.id, skills, Skills,
                                    crud.get_resume_skills,
                                    crud.update_resume_skills)


@router.post("/{resume_id}/skills/{skills_id}/skills_group",
             response_model=SkillsGroup,
             tags=['Skills'])
def create_skill_group(skills_id: int,
                       db: Session = Depends(db),
                       owned_resume: bool = Depends(get_owned_resume)):
    stored_skills = get_existing_resource(db, owned_resume.id,
                                          crud.get_resume_skills)
    check_resource_appurtenance(stored_skills, 'id', skills_id)
    return crud.create_skills_group(db, skills_id)


@router.patch("/{resume_id}/skills/{skills_id}/skills_group/{group_id}",
              response_model=SkillsGroup,
              tags=['Skills'])
def update_skill_group(skills_id: int,
                       group_id: int,
                       skills_group: SkillsGroupUpdate,
                       db: Session = Depends(db),
                       owned_resume: bool = Depends(get_owned_resume)):
    stored_skills = get_existing_resource(db, owned_resume.id,
                                          crud.get_resume_skills)
    check_resource_appurtenance(stored_skills, 'id', skills_id)
    stored_skills_group = get_existing_resource(db, group_id,
                                                crud.get_skills_group)
    check_resource_appurtenance(stored_skills_group, 'skills_id', skills_id)
    return update_existing_resource(db, group_id, skills_group, SkillsGroup,
                                    crud.get_skills_group,
                                    crud.update_skills_group)


@router.post("/{resume_id}/experience",
             response_model=Experience,
             tags=['Experience'])
def create_experience(db: Session = Depends(db),
                      owned_resume: bool = Depends(get_owned_resume)):
    stored_experience = crud.get_resume_experience(db, owned_resume.id)
    if stored_experience:
        if not stored_experience.deleted:
            return stored_experience
        return update_existing_resource(db, owned_resume.id,
                                        ExperienceUpdate(deleted=False),
                                        Experience, crud.get_resume_experience,
                                        crud.update_resume_experience)
    db_experience = crud.create_resume_experience(db, owned_resume.id)
    crud.create_experience_unit(db, db_experience.id)
    return db_experience


@router.patch("/{resume_id}/experience",
              response_model=Experience,
              tags=['Experience'])
def update_experience(experience: SkillsUpdate,
                      db: Session = Depends(db),
                      owned_resume: bool = Depends(get_owned_resume)):
    stored_experience = get_existing_resource(db, owned_resume.id,
                                              crud.get_resume_experience)
    check_resource_appurtenance(stored_experience, 'resume_id',
                                owned_resume.id)
    return update_existing_resource(db, owned_resume.id, experience,
                                    Experience, crud.get_resume_experience,
                                    crud.update_resume_experience)


@router.post("/{resume_id}/experience/{experience_id}/experience_unit",
             response_model=ExperienceUnit,
             tags=['Experience'])
def create_experience_unit(experience_id: int,
                           db: Session = Depends(db),
                           owned_resume: bool = Depends(get_owned_resume)):
    stored_experience = get_existing_resource(db, owned_resume.id,
                                              crud.get_resume_experience)
    check_resource_appurtenance(stored_experience, 'id', experience_id)
    return crud.create_experience_unit(db, experience_id)


@router.patch(
    "/{resume_id}/experience/{experience_id}/experience_unit/{unit_id}",
    response_model=ExperienceUnit,
    tags=['Experience'])
def update_experience_unit(experience_id: int,
                           unit_id: int,
                           experience_unit: ExperienceUnitUpdate,
                           db: Session = Depends(db),
                           owned_resume: bool = Depends(get_owned_resume)):
    stored_experience = get_existing_resource(db, owned_resume.id,
                                              crud.get_resume_experience)
    check_resource_appurtenance(stored_experience, 'id', experience_id)
    stored_experience_unit = get_existing_resource(db, unit_id,
                                                   crud.get_experience_unit)
    check_resource_appurtenance(stored_experience_unit, 'experience_id',
                                experience_id)
    return update_existing_resource(db, unit_id, experience_unit,
                                    ExperienceUnit, crud.get_experience_unit,
                                    crud.update_experience_unit)