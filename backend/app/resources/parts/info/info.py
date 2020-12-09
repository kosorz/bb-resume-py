import logging
import uuid
import tempfile
from io import BytesIO
from PIL import Image, ImageOps
from botocore.exceptions import ClientError
from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, status, HTTPException
from sqlalchemy.orm import Session

from .schemas import Info, InfoUpdate, ServerInfoUpdate
from ...resumes.schemas import ResumeFull, ServerResumeUpdate, Resume, ResumePhotos, PhotoSettingsUpdate
from ...resumes.defs import remove_object_from_bucket
from ....util.deps import db, storage, storage_client, get_owned_resume, get_owned_resume_photos
from ....util.defs import update_existing_resource, find_item_with_key_value, ext_from_ct
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
    "/{resume_id}/info_photo",
    response_model=str,
    name="info:update-photo",
)
async def update_photo(
        resume_id: int,
        f: UploadFile = File(...),
        db: Session = Depends(db),
        storage_client=Depends(storage_client),
        resume_photos: ResumePhotos = Depends(get_owned_resume_photos),
):
    if (f.content_type not in ['image/jpeg', 'image/png']):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail="Unprocessable Entity")

    try:
        img = Image.open(f.file)
        ImageOps.exif_transpose(img)
        buffer = BytesIO()
        img.save(buffer, ext_from_ct(f.content_type))
        buffer.seek(0)
    except ClientError as e:
        logging.error(e)

    new_photo = str(uuid.uuid4())
    try:
        storage_client.upload_fileobj(
            buffer,
            'resume-photos',
            new_photo,
            ExtraArgs={'ContentType': f.content_type},
        )
    except ClientError as e:
        logging.error(e)

    if (resume_photos["photo"] or resume_photos["cropped_photo"]):
        if (resume_photos["photo"]):
            remove_object_from_bucket(storage_client, 'resume-photos',
                                      resume_photos["photo"])
        if (resume_photos["cropped_photo"]):
            remove_object_from_bucket(storage_client, 'resume-cropped-photos',
                                      resume_photos["cropped_photo"])

    return update_existing_resource(
        db, resume_id, ServerInfoUpdate(photo=new_photo, cropped_photo=""),
        Info, crud.get_resume_info, crud.update_resume_info).photo


@router.patch(
    "/{resume_id}/info_photo_crop",
    response_model=str,
    name="info:update-cropped-photo",
)
async def update_photo_crop(
        resume_id: int,
        photo_settings: PhotoSettingsUpdate,
        db: Session = Depends(db),
        storage=Depends(storage),
        resume_photos: ResumePhotos = Depends(get_owned_resume_photos),
):
    if not resume_photos['photo']:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    try:
        obj = storage.Object(
            bucket_name='resume-photos',
            key=resume_photos["photo"],
        )
    except ClientError as e:
        logging.error(e)

    photo_ct = obj.content_type

    try:
        obj_body = obj.get()['Body'].read()
        img = Image.open(BytesIO(obj_body))
        img = img.rotate(angle=-photo_settings.rotation).crop((
            photo_settings.x,
            photo_settings.y,
            photo_settings.x + photo_settings.width,
            photo_settings.y + photo_settings.height,
        ))
        buffer = BytesIO()
        img.save(buffer, ext_from_ct(photo_ct))
        buffer.seek(0)
    except ClientError as e:
        logging.error(e)

    new_cropped_photo = str(uuid.uuid4())

    try:
        obj = storage.Object(
            bucket_name='resume-cropped-photos',
            key=new_cropped_photo,
        )
        obj.put(Body=buffer, ContentType=photo_ct)
    except ClientError as e:
        logging.error(e)

    if (resume_photos["cropped_photo"]):
        remove_object_from_bucket(storage.meta.client, 'resume-cropped-photos',
                                  resume_photos["cropped_photo"])

    update_existing_resource(
        db,
        resume_id,
        ServerResumeUpdate(meta={"photoSettings": photo_settings}),
        Resume,
        crud.get_resume,
        crud.update_resume,
    )

    return update_existing_resource(
        db, resume_id, ServerInfoUpdate(cropped_photo=new_cropped_photo), Info,
        crud.get_resume_info, crud.update_resume_info).cropped_photo


@router.delete(
    "/{resume_id}/info_photo",
    response_model=str,
    name="info:delete-photo",
)
async def delete_photo(
        resume_id: int,
        db: Session = Depends(db),
        storage_client=Depends(storage_client),
        resume_photos: ResumePhotos = Depends(get_owned_resume_photos),
):
    if (resume_photos["photo"] or resume_photos["cropped_photo"]):
        if (resume_photos["photo"]):
            remove_object_from_bucket(storage_client, 'resume-photos',
                                      resume_photos["photo"])
        if (resume_photos["cropped_photo"]):
            remove_object_from_bucket(storage_client, 'resume-cropped-photos',
                                      resume_photos["cropped_photo"])

        update_existing_resource(
            db,
            resume_id,
            ServerResumeUpdate(
                meta={
                    "photoSettings": {
                        "x": 0,
                        "y": 0,
                        "width": 0,
                        "height": 0,
                        "rotation": 0
                    }
                }),
            Resume,
            crud.get_resume,
            crud.update_resume,
        )

        return update_existing_resource(
            db, resume_id, ServerInfoUpdate(photo="", cropped_photo=""), Info,
            crud.get_resume_info, crud.update_resume_info).photo
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad Request")
