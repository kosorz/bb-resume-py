from typing import Callable
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from .schemas import SkillsGroup


def update_existing_resource(
    db: Session,
    resource_id: int,
    data,
    model,
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


def get_existing_resource(db: Session, resource_id: int, read_fn: Callable):
    stored_resource = read_fn(db, resource_id)
    if not stored_resource:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not found")
    return stored_resource


def check_resource_appurtenance(resource, foreign_key: str, key: str):
    if not resource.__dict__[foreign_key] == key:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
