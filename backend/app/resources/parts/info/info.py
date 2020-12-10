import logging
import uuid
import tempfile
from io import BytesIO
from typing import List
from fastapi import APIRouter, Depends, File, UploadFile, status, HTTPException, Form
from PIL import Image, ImageOps
from botocore.exceptions import ClientError
from sqlalchemy.orm import Session

from .schemas import Info, InfoUpdate, ServerInfoUpdate
from ...resumes.defs import remove_object_from_bucket
from ...resumes.schemas import ResumeFull, ServerResumeUpdate, Resume, ResumePhotos, PhotoSettingsUpdate
from ....util.deps import db, storage_client, get_owned_resume, get_owned_resume_photos, get_photo_settings, get_f_image
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
        f: UploadFile = Depends(get_f_image),
        db: Session = Depends(db),
        storage_client=Depends(storage_client),
        resume_photos: ResumePhotos = Depends(get_owned_resume_photos),
):

    new_photo = str(uuid.uuid4())
    ext = ext_from_ct(f.content_type)
    file_name = '{name}.{ext}'.format(name=new_photo, ext=ext)

    try:
        img = Image.open(f.file)
        ImageOps.exif_transpose(img)
        buffer = BytesIO()
        img.save(buffer, ext_from_ct(f.content_type))
        buffer.seek(0)
    except ClientError as e:
        logging.error(e)

    try:
        storage_client.upload_fileobj(
            buffer,
            'resume-photos',
            file_name,
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
        db, resume_id, ServerInfoUpdate(photo=file_name, cropped_photo=""),
        Info, crud.get_resume_info, crud.update_resume_info).photo


@router.patch(
    "/{resume_id}/info_photo_crop",
    response_model=str,
    name="info:update-cropped-photo",
)
async def update_photo_crop(
        resume_id: int,
        photo_settings: PhotoSettingsUpdate = Depends(get_photo_settings),
        f: UploadFile = Depends(get_f_image),
        db: Session = Depends(db),
        storage_client=Depends(storage_client),
        resume_photos: ResumePhotos = Depends(get_owned_resume_photos),
):
    if not resume_photos['photo']:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")

    new_cropped_photo = str(uuid.uuid4())
    ext = ext_from_ct(f.content_type)
    file_name = '{name}.{ext}'.format(name=new_cropped_photo, ext=ext)

    try:
        storage_client.upload_fileobj(
            f.file,
            'resume-cropped-photos',
            file_name,
            ExtraArgs={'ContentType': f.content_type},
        )
    except ClientError as e:
        logging.error(e)

    if (resume_photos["cropped_photo"]):
        remove_object_from_bucket(storage_client, 'resume-cropped-photos',
                                  resume_photos["cropped_photo"])

    update_existing_resource(
        db,
        resume_id,
        ServerResumeUpdate(meta={"photoSettings": photo_settings}),
        Resume,
        crud.get_resume,
        crud.update_resume,
    )

    return update_existing_resource(db, resume_id,
                                    ServerInfoUpdate(cropped_photo=file_name),
                                    Info, crud.get_resume_info,
                                    crud.update_resume_info).cropped_photo


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
