from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .schemas import Info, InfoUpdate
from ...resumes.schemas import ResumeFull
from ...util.deps import get_owns_resume, get_current_user_skills, get_current_user_skills_groups, get_current_user_resumes, get_current_user_experience, get_current_user_experience_units
from ...util.fns import update_existing_resource, find_item_with_key_value
from ....database import crud
from ....database.db import get_db as db

router = APIRouter()


@router.patch("/{resume_id}/info", response_model=Info)
def update_resume_info(resume_id: int,
                       info: InfoUpdate,
                       db: Session = Depends(db),
                       current_user_resumes: List[ResumeFull] = Depends(
                           get_current_user_resumes)):
    find_item_with_key_value(current_user_resumes, 'id', resume_id)
    return update_existing_resource(db, resume_id, info, Info,
                                    crud.get_resume_info,
                                    crud.update_resume_info)
