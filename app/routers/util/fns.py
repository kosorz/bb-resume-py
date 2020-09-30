from typing import Callable
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


def execute_update(
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