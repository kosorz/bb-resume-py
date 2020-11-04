from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class SkillsBase(BaseModel):
    title: str


class SkillsUpdate(BaseModel):
    unlisted: Optional[bool]
    title: Optional[str]


class Skills(SkillsBase):
    id: int
    title: str
    unlisted: bool
    resume_id: int
    order: List[int] = []

    class Config:
        orm_mode = True


class SkillsGroupBase(BaseModel):
    title: str


class SkillsGroup(SkillsGroupBase):
    id: int
    values: List[str] = []

    class Config:
        orm_mode = True


class SkillsGroupUpdate(BaseModel):
    title: Optional[str]
    values: Optional[List[str]]


class SkillsFull(Skills):
    groups: List[SkillsGroup] = []

    class Config:
        orm_mode = True