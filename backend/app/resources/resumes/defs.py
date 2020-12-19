from typing import List, Union
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from botocore.exceptions import ClientError
import logging

from .schemas import ServerResumeUpdate, Resume, ResumeFull
from ...db.crud import get_resume, update_resume
from ...util.defs import update_existing_resource


def remove_object_from_bucket(storage_client, bucket: str, key: str):
    try:
        storage_client.delete_object(Bucket=bucket, Key=key)
    except ClientError as e:
        logging.error(e)


def reorganize(
    requested_order: List[Union[str, int]],
    order: List[Union[str, int]],
):
    processed_requested_order = set(requested_order)
    processed_order = set(order)

    if bool(processed_requested_order.difference(processed_order)) or bool(
            processed_order.difference(processed_requested_order)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    return requested_order


def is_valid_column(target):
    if target not in ['order', 'mainOrder', 'secondaryOrder']:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")


def adjust_resume_orders(
    db: Session,
    resume: ResumeFull,
    action: str,
    target: str,
    creation_update: bool = False,
):
    exception = HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                              detail="Bad request")
    full_layout_in_use = resume.meta["paper"]["layout"] == "full"
    full_content = resume.meta["content"]["full"]
    split_content = resume.meta["content"]["split"]
    is_in_main_order = target in split_content["mainOrder"]
    is_in_secondary_order = target in split_content["secondaryOrder"]
    split_order = "mainOrder" if is_in_main_order else "secondaryOrder" if is_in_secondary_order else target

    content_update = None

    if (action == 'remove'):
        if target not in full_content[
                'unlisted'] or target not in split_content['unlisted']:
            raise exception

        content_update = {
            "full": {
                "unlisted":
                [*filter(lambda sec: sec != target, full_content["unlisted"])],
            },
            "split": {
                "unlisted": [
                    *filter(lambda sec: sec != target,
                            split_content["unlisted"])
                ],
            }
        }

    if (isinstance(action, list)):
        is_valid_column(target)
        if full_layout_in_use and not target == 'order':
            raise exception

        content_update = {
            "full": {
                "order": reorganize(action, full_content["order"])
            }
        } if full_layout_in_use else {
            "split": {
                split_order: reorganize(action, split_content[split_order])
            }
        }

    if (action == "unlist"):
        if full_layout_in_use and target in full_content['unlisted']:
            raise exception

        if not full_layout_in_use and target in split_content['unlisted']:
            raise exception

        content_update = {
            "full": {
                "order":
                [*filter(lambda sec: sec != target, full_content["order"])],
                "unlisted":
                [*resume.meta["content"]["full"]["unlisted"], target]
            }
        } if full_layout_in_use else {
            "split": {
                split_order: [
                    *filter(lambda sec: sec != target,
                            split_content[split_order])
                ],
                "unlisted":
                [*resume.meta["content"]["split"]["unlisted"], target]
            }
        }

    if (action in ['order', 'mainOrder', 'secondaryOrder']):
        if creation_update:
            content_update = {
                "split": {
                    action: [*split_content[action], target]
                },
                "full": {
                    "unlisted": [*full_content["unlisted"], target]
                }
            } if action in ["mainOrder", "secondaryOrder"] else {
                "full": {
                    action: [*full_content[action], target]
                },
                "split": {
                    "unlisted": [*split_content["unlisted"], target]
                }
            }

        else:
            if full_layout_in_use and target not in full_content['unlisted']:
                raise exception

            if not full_layout_in_use and target not in split_content[
                    'unlisted']:
                raise exception

            key = 'full' if action == 'order' else 'split'
            content_update = {
                key: {
                    action: [*resume.meta["content"][key][action], target],
                    "unlisted": [
                        *filter(
                            lambda sec: sec != target, full_content["unlisted"]
                            if key == 'full' else split_content['unlisted'])
                    ]
                }
            }

    if (action == 'migrate'):
        if (not is_in_main_order
                and not is_in_secondary_order) or full_layout_in_use:
            raise exception

        content_update = {
            'split': {
                "mainOrder": [
                    *filter(lambda sec: sec != target,
                            split_content['mainOrder'])
                ],
                "secondaryOrder": [*split_content['secondaryOrder'], target]
            } if is_in_main_order else {
                "secondaryOrder": [
                    *filter(lambda sec: sec != target,
                            split_content['secondaryOrder'])
                ],
                "mainOrder": [*split_content['mainOrder'], target]
            }
        }

    if content_update == None:
        raise exception

    return update_existing_resource(
        db,
        resume.id,
        ServerResumeUpdate(meta={"content": content_update}),
        Resume,
        get_resume,
        update_resume,
    ).meta["content"]