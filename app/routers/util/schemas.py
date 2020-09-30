from typing import List, Optional
from pydantic import BaseModel


class SkillsBase(BaseModel):
    title: str


class SkillsCreate(SkillsBase):
    pass


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
    values: str
    deleted: bool

    class Config:
        orm_mode = True


class SkillsGroupUpdate(BaseModel):
    title: Optional[str]
    values: Optional[str]
    deleted: Optional[bool]


class FullSkills(Skills):
    groups: List[SkillsGroup] = []

    class Config:
        orm_mode = True


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
    phone: Optional[str]
    link: Optional[str]
    email: Optional[str]
    location: Optional[str]
    role: Optional[str]
    phone_enabled: Optional[bool]
    link_enabled: Optional[bool]
    email_enabled: Optional[bool]
    location_enabled: Optional[bool]
    role_enabled: Optional[bool]


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


class FullResume(Resume):
    skills: FullSkills
    info: Info

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
