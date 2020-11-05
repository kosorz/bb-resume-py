from typing import List, Optional
from pydantic import BaseModel, HttpUrl
from datetime import datetime


class ExperienceBase(BaseModel):
    title: str


class ExperienceUpdate(BaseModel):
    unlisted: Optional[bool]
    title: Optional[str]


class Experience(ExperienceBase):
    id: int
    title: str
    unlisted: bool
    resume_id: int
    order: List[int] = []

    class Config:
        orm_mode = True


class ExperienceUnitBase(BaseModel):
    title: str


class ExperienceUnit(ExperienceUnitBase):
    id: int
    company_name: str
    description: str
    location: str
    date_start: datetime
    date_end: Optional[datetime]
    link: str
    company_name_enabled: bool
    description_enabled: bool
    location_enabled: bool
    period_enabled: bool
    link_enabled: bool

    class Config:
        orm_mode = True


class ExperienceUnitUpdate(BaseModel):
    title: Optional[str]
    values: Optional[str]
    company_name: Optional[str]
    description: Optional[str]
    location: Optional[str]
    date_start: Optional[datetime]
    date_end: Optional[datetime]
    link: Optional[HttpUrl]
    company_name_enabled: Optional[bool]
    description_enabled: Optional[bool]
    location_enabled: Optional[bool]
    period_enabled: Optional[bool]
    link_enabled: Optional[bool]


class ExperienceFull(Experience):
    units: List[ExperienceUnit] = []

    class Config:
        orm_mode = True
