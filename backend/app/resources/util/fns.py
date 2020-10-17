from typing import Callable, Iterable
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


def update_existing_resource(
    db: Session,
    resource_id: int,
    data,
    model,
    read_fn: Callable,
    update_fn: Callable,
):
    stored_data = read_fn(db, resource_id)
    stored_model = model(**stored_data.__dict__)
    update_data = data.dict(exclude_unset=True)
    updated_data = stored_model.copy(update=update_data)
    update_fn(db, updated_data)
    return updated_data


def find_item_with_key_value(list: Iterable,
                             key: str,
                             value: int,
                             error: bool = True):
    for resource in list:
        if resource.__dict__.get(key) == value:
            return resource
    else:
        if error:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Forbidden")
        return None
