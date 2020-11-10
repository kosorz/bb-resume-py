from typing import List
from sqlalchemy.orm import Session
from fastapi import Depends, status, HTTPException
from jose import JWTError, jwt
from starlette.requests import Request

from ..core.config import SECRET_KEY, ALGORITHM, oauth2_scheme
from ..resources.resumes.schemas import Resume, ResumeFull
from ..resources.auth.schemas import TokenData
from ..resources.users.schemas import User
from ..resources.parts.experience.schemas import ExperienceFull
from ..resources.parts.skills.schemas import SkillsFull
from ..db import crud


# DB session
def db(request: Request):
    return request.app.state._db


# Current user
def get_current_user(token: str = Depends(oauth2_scheme),
                     db: Session = Depends(db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    return current_user


def get_current_user_resumes(
        current_user: User = Depends(get_current_active_user)):
    return current_user.resumes


def get_current_user_skills(current_user_resumes: List[ResumeFull] = Depends(
    get_current_user_resumes)):
    return [
        skills for skills in list(
            map(lambda resume: resume.skills, current_user_resumes)) if skills
    ]


def get_current_user_skills_groups(
        current_user_skills: List[SkillsFull] = Depends(
            get_current_user_skills)):
    return [
        skills_group for skills in list(
            map(lambda skills: skills.groups, current_user_skills))
        for skills_group in skills
    ]


def get_current_user_experience(
        current_user_resumes: List[ResumeFull] = Depends(
            get_current_user_resumes)):
    return [
        experience for experience in list(
            map(lambda resume: resume.experience, current_user_resumes))
        if experience
    ]


def get_current_user_experience_units(
        current_user_experience: List[ExperienceFull] = Depends(
            get_current_user_experience)):
    return [
        experience_unit for experience in list(
            map(lambda experience: experience.units, current_user_experience))
        for experience_unit in experience
    ]


# Requested resume
def get_requested_resume(resume_id: str, db: Session = Depends(db)):
    requested_resume = crud.get_resume(db, resume_id)
    if not requested_resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found")
    return requested_resume


def get_owned_resume(db: Session = Depends(db),
                     requested_resume: Resume = Depends(get_requested_resume),
                     current_user: User = Depends(get_current_active_user)):
    if not requested_resume.owner_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
        )

    return requested_resume
