from typing import List, Optional
from pydantic import BaseModel, validator, constr, conint
from datetime import datetime
from fastapi import HTTPException, status
from ..parts.skills.schemas import SkillsFull
from ..parts.experience.schemas import ExperienceFull
from ..parts.info.schemas import Info

Color = constr(regex="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")


class Colors(BaseModel):
    main: Color
    secondary: Color


class FontSize(BaseModel):
    small: int
    main: int
    medium: int
    large: int
    big: int


class Paper(BaseModel):
    size: str
    space: int
    layout: str


class SplitContent(BaseModel):
    leftOrder: List[str] = []
    rightOrder: List[str] = []
    unlisted: List[str] = []


class SplitContentUpdate(BaseModel):
    leftOrder: Optional[List[str]]
    rightOrder: Optional[List[str]]
    unlisted: Optional[List[str]]


class FullContent(BaseModel):
    order: List[str] = []
    unlisted: List[str] = []


class FullContentUpdate(BaseModel):
    order: Optional[List[str]]
    unlisted: Optional[List[str]]


class Content(BaseModel):
    split: SplitContent
    full: FullContent


class ContentUpdate(BaseModel):
    split: SplitContentUpdate
    full: FullContentUpdate


class Meta(BaseModel):
    colors: Colors
    fontSize: FontSize
    paper: Paper
    fontFamily: str
    content: Content


class ColorsUpdate(BaseModel):
    main: Optional[Color]
    secondary: Optional[Color]


class FontSizeUpdate(BaseModel):
    small: Optional[conint(ge=10, le=11)]
    main: Optional[conint(ge=13, le=14)]
    medium: Optional[conint(ge=16, le=17)]
    large: Optional[conint(ge=20, le=24)]
    big: Optional[int]

    @validator("big")
    def must_be_big(cls, v):
        if v not in [34, 38, 42]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


class PaperUpdate(BaseModel):
    size: Optional[str]
    space: Optional[int]
    layout: Optional[str]

    @validator("size")
    def must_be_size(cls, v):
        if v not in ["A4"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v

    @validator("space")
    def must_be_space(cls, v):
        if v not in [40, 50, 60]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v

    @validator("layout")
    def must_be_layout(cls, v):
        if v not in ['full', 'split']:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


class MetaUpdate(BaseModel):
    colors: Optional[ColorsUpdate]
    paper: Optional[PaperUpdate]
    fontSize: Optional[FontSizeUpdate]
    fontFamily: Optional[str]

    @validator("fontFamily")
    def must_be_family(cls, v):
        if v not in ["Roboto"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


class ServerMetaUpdate(MetaUpdate):
    content: Optional[ContentUpdate]


class ResumeBase(BaseModel):
    title: str


class ResumeCreate(ResumeBase):
    pass


class Resume(ResumeBase):
    id: int
    owner_id: int
    deleted: bool
    meta: Meta

    class Config:
        orm_mode = True


class ResumeFull(Resume):
    info: Info
    skills: Optional[SkillsFull]
    experience: Optional[ExperienceFull]

    class Config:
        orm_mode = True


class ResumeUpdate(BaseModel):
    deleted: Optional[bool]
    title: Optional[str]
    meta: Optional[MetaUpdate]


class ServerResumeUpdate(ResumeUpdate):
    meta: Optional[ServerMetaUpdate]
