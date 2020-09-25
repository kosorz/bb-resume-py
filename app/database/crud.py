from sqlalchemy.orm import Session
from sqlalchemy import update

from . import models
from ..routers.schemas import UserCreate, Resume, ResumeCreate
from ..routers.auth import get_password_hash


def get_user_by_username(db: Session, username: str):
    return db.query(
        models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username,
                          hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_resume(db: Session, resume_id: int):
    return db.query(
        models.Resume).filter(models.Resume.id == resume_id).first()


def update_resume(db: Session, resume: Resume):
    old_resume = db.query(
        models.Resume).filter(models.Resume.id == resume.id).first()

    for key, value in resume:
        setattr(old_resume, key, value)

    db.commit()
    db.refresh(old_resume)
    return old_resume


def create_user_resume(db: Session, resume: ResumeCreate, user_id: int):
    db_resume = models.Resume(**resume.dict(), owner_id=user_id)
    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)
    return db_resume