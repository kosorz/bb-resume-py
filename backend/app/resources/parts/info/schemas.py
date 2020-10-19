from typing import List, Optional
from pydantic import BaseModel, HttpUrl
from datetime import datetime


class InfoBase(BaseModel):
    name: str


class Info(InfoBase):
    id: int
    resume_id: int
    phone: str
    link: str
    email: str
    location: str
    role: str
    phone_enabled: bool
    link_enabled: bool
    email_enabled: bool
    location_enabled: bool
    role_enabled: bool

    class Config:
        orm_mode = True


class InfoUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    link: Optional[HttpUrl]
    email: Optional[str]
    location: Optional[str]
    role: Optional[str]
    phone_enabled: Optional[bool]
    link_enabled: Optional[bool]
    email_enabled: Optional[bool]
    location_enabled: Optional[bool]
    role_enabled: Optional[bool]
