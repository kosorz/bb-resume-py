from typing import List, Optional
from pydantic import BaseModel


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
    owner_id: int

    class Config:
        orm_mode = True


class InfoUpdate(BaseModel):
    phone: Optional[str]
    link: Optional[str]
    email: Optional[str]
    location: Optional[str]
    role: Optional[str]


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


class ResumeUpdate(BaseModel):
    deleted: Optional[bool]
    title: Optional[str]


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    password_confirm: str


class UserPublic(UserBase):
    id: int
    disabled: bool

    class Config:
        orm_mode = True


class User(UserPublic):
    resumes: List[Resume] = []

    class Config:
        orm_mode = True


class UserInDB(User):
    hashed_password: str

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
