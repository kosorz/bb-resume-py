from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class SkillsBase(BaseModel):
    title: str


class SkillsUpdate(BaseModel):
    deleted: Optional[bool]
    title: Optional[str]


class Skills(SkillsBase):
    id: int
    title: str
    deleted: bool
    resume_id: int

    class Config:
        orm_mode = True


class SkillsGroupBase(BaseModel):
    title: str


class SkillsGroup(SkillsGroupBase):
    id: int
    values: List[str] = []
    deleted: bool

    class Config:
        orm_mode = True


class SkillsGroupUpdate(BaseModel):
    title: Optional[str]
    values: Optional[List[str]]
    deleted: Optional[bool]


class SkillsFull(Skills):
    groups: List[SkillsGroup] = []

    class Config:
        orm_mode = True