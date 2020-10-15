from fastapi import APIRouter

from .info import info
from .skills import skills
from .experience import experience

router = APIRouter()

router.include_router(skills.router, tags=['Skills'])

router.include_router(experience.router, tags=['Experience'])

router.include_router(info.router, tags=['Infos'])
