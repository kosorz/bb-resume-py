from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .schemas import Experience, ExperienceUpdate, ExperienceFull, ExperienceUnit, ExperienceUnitUpdate
from ..schemas import OrderUpdate
from ...resumes.defs import adjust_resume_orders, reorganize, is_valid_column
from ...resumes.schemas import ResumeFull, ServerResumeUpdate, Resume
from ....util.deps import get_owned_resume, get_current_user_experience, get_current_user_experience_units, db
from ....util.defs import update_existing_resource, find_item_with_key_value, delete_existing_resource
from ....db import crud

router = APIRouter()


@router.post(
    "/{resume_id}/experience/{target}",
    response_model=ExperienceFull,
    name="experience:create",
)
def create_experience(
        resume_id: int,
        target: str,
        db: Session = Depends(db),
        current_user_experience: List[ExperienceFull] = Depends(
            get_current_user_experience),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    find_item_with_key_value(list=current_user_experience,
                             key="resume_id",
                             value=resume_id,
                             error=False,
                             throw_on_present=True)
    is_valid_column(target)
    experience = crud.create_resume_experience(db, resume_id)
    unit = crud.create_experience_unit(db, experience.id)
    adjust_resume_orders(db, owned_resume, target, 'experience', True)
    update_existing_resource(db, experience.id, OrderUpdate(order=[unit.id]),
                             Experience, crud.get_experience,
                             crud.update_experience)
    return crud.get_experience(db, experience.id)


@router.patch(
    "/experience/{experience_id}",
    response_model=Experience,
    name="experience:update",
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
    "/experience/{experience_id}/reorganize",
    response_model=List,
    name="experience:reorganize",
)
def reorganize_skills(
    experience_id: int,
    requested_order: List[int],
    db: Session = Depends(db),
    current_user_experience: List[ExperienceFull] = Depends(
        get_current_user_experience),
):
    experience = find_item_with_key_value(current_user_experience, "id",
                                          experience_id)
    return update_existing_resource(
        db, experience.id,
        OrderUpdate(order=reorganize(requested_order, experience.order)),
        Experience, crud.get_experience, crud.update_experience).order


@router.post(
    "/{experience_id}/experience_unit",
    response_model=ExperienceUnit,
    name="experience:create-unit",
)
def create_experience_unit(
    experience_id: int,
    db: Session = Depends(db),
    current_user_experience: List[ExperienceFull] = Depends(
        get_current_user_experience)):
    experience = find_item_with_key_value(current_user_experience, "id",
                                          experience_id)
    unit = crud.create_experience_unit(db, experience.id)
    update_existing_resource(db, experience_id,
                             OrderUpdate(order=[*experience.order, unit.id]),
                             Experience, crud.get_experience,
                             crud.update_experience)
    return unit


@router.patch(
    "/experience_unit/{unit_id}",
    response_model=ExperienceUnit,
    name="experience:update-unit",
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


@router.delete(
    "/experience_unit/{unit_id}",
    response_model=int,
    name="experience:delete-unit",
)
def delete_experience_unit(
    unit_id: int,
    db: Session = Depends(db),
    current_user_experience_units: List[ExperienceUnit] = Depends(
        get_current_user_experience_units),
    current_user_experience: List[ExperienceFull] = Depends(
        get_current_user_experience),
):
    if len(current_user_experience_units) <= 1:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    unit = find_item_with_key_value(current_user_experience_units, "id",
                                    unit_id)
    experience = find_item_with_key_value(current_user_experience, "id",
                                          unit.experience_id)
    update_existing_resource(
        db, experience.id,
        OrderUpdate(
            order=[*filter(lambda u_id: u_id != unit_id, experience.order)]),
        Experience, crud.get_experience, crud.update_experience)
    return delete_existing_resource(db, unit_id, crud.delete_experience_unit)
