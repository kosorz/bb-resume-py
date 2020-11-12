from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from .schemas import ServerResumeUpdate, Resume, ResumeFull
from ...db.crud import get_resume, update_resume
from ...util.fns import update_existing_resource, move


def adjust_section_position(
    db: Session,
    resume: ResumeFull,
    section: str,
    action: str,
    creation_update: bool = False,
):
    exception = HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                              detail="Bad request")
    full_layout_in_use = resume.meta["paper"]["layout"] == "full"
    full_content = resume.meta["content"]["full"]
    split_content = resume.meta["content"]["split"]
    is_in_left_order = section in split_content["leftOrder"]
    is_in_right_order = section in split_content["rightOrder"]
    split_order = "leftOrder" if is_in_left_order else "rightOrder"

    content_update = None

    if (action in ['up', 'down']):
        content_update = {
            "full": {
                "order": move(action, full_content["order"], section)
            }
        } if full_layout_in_use else {
            "split": {
                split_order: move(action, split_content[split_order], section)
            }
        }

    if (action == "unlist"):
        if full_layout_in_use and section in full_content['unlisted']:
            raise exception

        if not full_layout_in_use and section in split_content['unlisted']:
            raise exception

        content_update = {
            "full": {
                "order":
                [*filter(lambda sec: sec != section, full_content["order"])],
                "unlisted":
                [*resume.meta["content"]["full"]["unlisted"], section]
            }
        } if full_layout_in_use else {
            "split": {
                split_order: [
                    *filter(lambda sec: sec != section,
                            split_content[split_order])
                ],
                "unlisted":
                [*resume.meta["content"]["split"]["unlisted"], section]
            }
        }

    if (action in ['order', 'leftOrder', 'rightOrder']):
        if creation_update:
            content_update = {
                "split": {
                    action: [*split_content[action], section]
                },
                "full": {
                    "unlisted": [*full_content["unlisted"], section]
                }
            } if action in ["leftOrder", "rightOrder"] else {
                "full": {
                    action: [*full_content[action], section]
                },
                "split": {
                    "unlisted": [*split_content["unlisted"], section]
                }
            }

        else:
            if full_layout_in_use and section not in full_content['unlisted']:
                raise exception

            if not full_layout_in_use and section not in split_content[
                    'unlisted']:
                raise exception

            key = 'full' if action == 'order' else 'split'
            content_update = {
                key: {
                    action: [*resume.meta["content"][key][action], section],
                    "unlisted": [
                        *filter(
                            lambda sec: sec != section,
                            full_content["unlisted"]
                            if key == 'full' else split_content['unlisted'])
                    ]
                }
            }

    if (action == 'migrate'):
        if (not is_in_left_order
                and not is_in_right_order) or full_layout_in_use:
            raise exception

        content_update = {
            'split': {
                "leftOrder": [
                    *filter(lambda sec: sec != section,
                            split_content['leftOrder'])
                ],
                "rightOrder": [*split_content['rightOrder'], section]
            } if is_in_left_order else {
                "rightOrder": [
                    *filter(lambda sec: sec != section,
                            split_content['rightOrder'])
                ],
                "leftOrder": [*split_content['leftOrder'], section]
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