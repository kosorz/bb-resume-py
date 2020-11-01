from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .schemas import Experience, ExperienceUpdate, ExperienceFull, ExperienceUnit, ExperienceUnitUpdate
from ...resumes.schemas import ResumeFull
from ....util.deps import get_owns_resume, get_current_user_experience, get_current_user_experience_units, db
from ....util.fns import update_existing_resource, find_item_with_key_value
from ....db import crud

router = APIRouter()


@router.post(
    "/{resume_id}/experience",
    response_model=Experience,
    name="experience:create-experience",
)
def create_experience(resume_id: int,
                      db: Session = Depends(db),
                      current_user_experience: List[ExperienceFull] = Depends(
                          get_current_user_experience),
                      owns_resume: ResumeFull = Depends(get_owns_resume)):
    find_item_with_key_value(list=current_user_experience,
                             key="resume_id",
                             value=resume_id,
                             error=False,
                             throw_on_present=True)
    db_experience = crud.create_resume_experience(db, resume_id)
    crud.create_experience_unit(db, db_experience.id)
    return db_experience


@router.patch(
    "/experience/{experience_id}",
    response_model=Experience,
    name="experience:update-experience",
)
def update_experience(experience_id: int,
                      experience: ExperienceUpdate,
                      db: Session = Depends(db),
                      current_user_experience: List[ExperienceFull] = Depends(
                          get_current_user_experience)):
    find_item_with_key_value(current_user_experience, "id", experience_id)
    return update_existing_resource(db, experience_id, experience, Experience,
                                    crud.get_experience,
                                    crud.update_experience)


@router.post(
    "/{experience_id}/experience_unit",
    response_model=ExperienceUnit,
    name="experience:create-experience-unit",
)
def create_experience_unit(
    experience_id: int,
    db: Session = Depends(db),
    current_user_experience: List[ExperienceFull] = Depends(
        get_current_user_experience)):
    find_item_with_key_value(current_user_experience, "id", experience_id)
    return crud.create_experience_unit(db, experience_id)


@router.patch(
    "/experience_unit/{unit_id}",
    response_model=ExperienceUnit,
    name="experience:update-experience-unit",
)
def update_experience_unit(
    unit_id: int,
    experience_unit: ExperienceUnitUpdate,
    db: Session = Depends(db),
    current_user_experience_units: List[ExperienceUnit] = Depends(
        get_current_user_experience_units)):
    find_item_with_key_value(current_user_experience_units, "id", unit_id)
    return update_existing_resource(db, unit_id, experience_unit,
                                    ExperienceUnit, crud.get_experience_unit,
                                    crud.update_experience_unit)