from typing import Callable, Iterable, Dict
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


def delete_existing_resource(
    db: Session,
    resource_id: int,
    model,
    delete_fn: Callable,
):
    delete_fn(db, resource_id)
    return resource_id


def find_item_with_key_value(list: Iterable,
                             key: str,
                             value: int,
                             error: bool = True,
                             throw_on_present: bool = False):
    for resource in list:
        if resource.__dict__.get(key) == value:
            if throw_on_present:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                    detail="Bad request")
            return resource
    else:
        if error:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                detail="Forbidden")
        return None


def compare_while_excluding(
    value: Dict,
    compare_value: Dict,
    exclude_keys: Dict,
):
    return {k
            for k, _ in value.items() ^ compare_value.items()} == exclude_keys
