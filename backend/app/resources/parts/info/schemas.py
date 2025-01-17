from typing import List, Optional, Union
from pydantic import BaseModel, HttpUrl, constr
from datetime import datetime
from ..schemas import EmptyString

Email = constr(regex="(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")


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
    quote: str
    cropped_photo: str
    photo: str
    phone_enabled: bool
    link_enabled: bool
    email_enabled: bool
    location_enabled: bool
    role_enabled: bool
    photo_enabled: bool
    photo_locked: bool
    quote_enabled: bool

    class Config:
        orm_mode = True


class InfoUpdate(BaseModel):
    name: Optional[str]
    phone: Optional[str]
    link: Optional[Union[HttpUrl, EmptyString]]
    email: Optional[Union[Email, EmptyString]]
    location: Optional[str]
    role: Optional[str]
    quote: Optional[str]
    phone_enabled: Optional[bool]
    link_enabled: Optional[bool]
    email_enabled: Optional[bool]
    location_enabled: Optional[bool]
    role_enabled: Optional[bool]
    photo_enabled: Optional[bool]
    photo_locked: Optional[bool]
    quote_enabled: Optional[bool]


class ServerInfoUpdate(InfoUpdate):
    photo: Optional[str]
    cropped_photo: Optional[str]
