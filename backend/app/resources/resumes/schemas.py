from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from ..parts.skills.schemas import SkillsFull
from ..parts.experience.schemas import ExperienceFull
from ..parts.info.schemas import Info


class ResumeBase(BaseModel):
    title: str


class ResumeCreate(ResumeBase):
    pass


class Resume(ResumeBase):
    id: int
    owner_id: int
    deleted: bool

    class Config:
        orm_mode = True


class ResumeFull(Resume):
    skills: Optional[SkillsFull]
    experience: Optional[ExperienceFull]
    info: Info

    class Config:
        orm_mode = True


class ResumeUpdate(BaseModel):
    deleted: Optional[bool]
    title: Optional[str]
