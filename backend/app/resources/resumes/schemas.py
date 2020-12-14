from typing import List, Optional
from pydantic import BaseModel, validator, conint
from datetime import datetime
from fastapi import HTTPException, status
from ..parts.skills.schemas import SkillsFull
from ..parts.experience.schemas import ExperienceFull
from ..parts.info.schemas import Info


class Colors(BaseModel):
    main: str
    secondary: str


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


class PhotoSettings(BaseModel):
    x: float
    y: float
    width: float
    height: float
    rotation: int


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
    split: Optional[SplitContentUpdate]
    full: Optional[FullContentUpdate]


class PhotoSettingsUpdate(PhotoSettings):
    rotation: int

    @validator("rotation")
    def must_be_right_angle(cls, v):
        if v % 90 != 0:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


class Meta(BaseModel):
    colors: Colors
    fontSize: FontSize
    paper: Paper
    photoSettings: PhotoSettings
    fontFamily: str
    background: str
    content: Content


class ColorsUpdate(BaseModel):
    main: Optional[str]
    secondary: Optional[str]

    @validator("main")
    def must_be_main_color(cls, v):
        if v not in [
                "#038cff",
                "#ff0105",
                "#ff6e04",
                "#88b04b",
                "#92a8d1",
                "#a303cb",
        ]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v

    @validator("secondary")
    def must_be_secondary_color(cls, v):
        if v not in ["#000000", "#1f1f1f", "#434343"]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


class FontSizeUpdate(BaseModel):
    small: Optional[conint(ge=10, le=12)]
    main: Optional[conint(ge=13, le=14)]
    medium: Optional[conint(ge=15, le=17)]
    large: Optional[conint(ge=20, le=24)]
    big: Optional[conint(ge=34, le=42)]


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
        if v not in [40, 45, 50, 55, 60]:
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
    background: Optional[str]

    @validator("fontFamily")
    def must_be_family(cls, v):
        if v not in [
                "Roboto", "Rubik", "Exo", "Chivo", "Montserrat", "Oswald",
                "Lato", "Bitter"
        ]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v

    @validator("background")
    def must_be_background(cls, v):
        if v not in [
                "X-parts", "Wood", "Triangles", "Waves", "Net", "Hectagons",
                "Crossings", ''
        ]:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Unprocessable Entity")
        return v


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


class ServerMetaUpdate(MetaUpdate):
    content: Optional[ContentUpdate]
    photoSettings: Optional[PhotoSettings]


class ServerResumeUpdate(ResumeUpdate):
    meta: Optional[ServerMetaUpdate]


class ResumePhotos(BaseModel):
    photo: str
    cropped_photo: str
