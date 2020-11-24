import logging
import uuid
from botocore.exceptions import ClientError
from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, status, HTTPException
from sqlalchemy.orm import Session

from .schemas import Info, InfoUpdate, ServerInfoUpdate
from ...resumes.schemas import ResumeFull
from ...resumes.fns import remove_object_from_bucket
from ....util.deps import db, get_owned_resume, object_storage
from ....util.fns import update_existing_resource, find_item_with_key_value
from ....db import crud

router = APIRouter()


@router.patch(
    "/{resume_id}/info",
    response_model=Info,
    name="info:update",
)
def update_resume_info(
        info: InfoUpdate,
        db: Session = Depends(db),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    return update_existing_resource(db, owned_resume.id, info, Info,
                                    crud.get_resume_info,
                                    crud.update_resume_info)


@router.patch(
    "/{resume_id}/info-photo",
    response_model=str,
    name="info:update-photo",
)
async def update_photo(
        f: UploadFile = File(...),
        db: Session = Depends(db),
        object_storage=Depends(object_storage),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    current_photo = owned_resume.info.photo
    if (current_photo):
        remove_object_from_bucket(object_storage, 'resume-photos',
                                  current_photo)

    photo = str(uuid.uuid4())
    if (f.content_type not in ['image/jpeg', 'image/png']):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="Unprocessable Entity")
    try:
        object_storage.upload_fileobj(f.file, 'resume-photos', photo)
    except ClientError as e:
        logging.error(e)

    return update_existing_resource(db, owned_resume.id,
                                    ServerInfoUpdate(photo=photo), Info,
                                    crud.get_resume_info,
                                    crud.update_resume_info).photo


@router.delete(
    "/{resume_id}/info-photo",
    response_model=str,
    name="info:delete-photo",
)
async def delete_photo(
        db: Session = Depends(db),
        object_storage=Depends(object_storage),
        owned_resume: ResumeFull = Depends(get_owned_resume),
):
    current_photo = owned_resume.info.photo
    if (current_photo):
        remove_object_from_bucket(object_storage, 'resume-photos',
                                  current_photo)

        return update_existing_resource(db, owned_resume.id,
                                        ServerInfoUpdate(photo=""), Info,
                                        crud.get_resume_info,
                                        crud.update_resume_info).photo
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad Request")
