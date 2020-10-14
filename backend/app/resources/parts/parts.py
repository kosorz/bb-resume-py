from typing import List
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session

from .info import info
from .skills import skills
from .experience import experience
from ..resumes.schemas import ResumeFull
from ..util.deps import get_owns_resume, get_current_user_skills, get_current_user_skills_groups, get_current_user_resumes, get_current_user_experience, get_current_user_experience_units
from ..util.fns import update_existing_resource, find_item_with_key_value
from ...database import crud
from ...database.db import get_db as db

router = APIRouter()

router.include_router(skills.router, tags=['Skills'])

router.include_router(experience.router, tags=['Experience'])

router.include_router(info.router, tags=['Infos'])
