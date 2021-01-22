from typing import List
from pydantic import BaseModel

from ..resumes.schemas import ResumeFull
from ..parts.info.schemas import Email


class UserBase(BaseModel):
    username: Email


class UserCreate(UserBase):
    password: str
    password_confirm: str


class UserPublic(UserBase):
    id: int
    disabled: bool

    class Config:
        orm_mode = True


class User(UserPublic):
    resumes: List[ResumeFull] = []

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str

    class Config:
        orm_mode = True
