from sqlalchemy.orm import Session
from sqlalchemy import update

from . import models
from ..routers.util.schemas import UserCreate, Resume, ResumeCreate, Info, SkillsCreate, SkillsGroup
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


def create_resume_info(db: Session, resume_id: int, name: str):
    db_info = models.Info(resume_id=resume_id, name=name)
    db.add(db_info)
    db.commit()
    db.refresh(db_info)
    return db_info


def update_resume_info(db: Session, info: Info):
    old_info = db.query(
        models.Info).filter(models.Info.resume_id == info.resume_id).first()

    print(old_info)

    for key, value in info:
        setattr(old_info, key, value)

    db.commit()
    db.refresh(old_info)
    return old_info


def get_resume_info(db: Session, resume_id: int):
    return db.query(
        models.Info).filter(models.Info.resume_id == resume_id).first()


def get_resume_skills(db: Session, resume_id: int):
    return db.query(
        models.Skills).filter(models.Skills.resume_id == resume_id).first()


def create_resume_skills(db: Session, resume_id: int):
    db_skills = models.Skills(resume_id=resume_id)
    db.add(db_skills)
    db.commit()
    db.refresh(db_skills)
    return db_skills


def update_resume_skills(db: Session, skills: Info):
    old_skills = db.query(models.Skills).filter(
        models.Skills.resume_id == skills.resume_id).first()

    for key, value in skills:
        setattr(old_skills, key, value)

    db.commit()
    db.refresh(old_skills)
    return old_skills


def create_skills_group(db: Session, skills_id: int):
    db_skills_group = models.SkillsGroup(skills_id=skills_id)
    db.add(db_skills_group)
    db.commit()
    db.refresh(db_skills_group)
    return db_skills_group


def get_skills_group(db: Session, group_id: int):
    return db.query(
        models.SkillsGroup).filter(models.SkillsGroup.id == group_id).first()


def update_skills_group(db: Session, skills_group: SkillsGroup):
    old_skills_group = db.query(models.SkillsGroup).filter(
        models.SkillsGroup.id == skills_group.id).first()

    for key, value in skills_group:
        setattr(old_skills_group, key, value)

    db.commit()
    db.refresh(old_skills_group)
    return old_skills_group
