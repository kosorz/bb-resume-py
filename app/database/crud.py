from sqlalchemy.orm import Session
from sqlalchemy import update

from . import models
from ..routers.util.schemas import UserCreate, Resume, ResumeCreate, Info, SkillsGroup, Experience, ExperienceUnit, Skills
from ..routers.auth import get_password_hash


def finalize_create(db: Session, resource):
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource


def finalize_update(db: Session, old_resource, updated_resource):
    for key, value in updated_resource:
        setattr(old_resource, key, value)

    db.commit()
    db.refresh(old_resource)
    return old_resource


# Users
def get_user_by_username(db: Session, username: str):
    return db.query(
        models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    return finalize_create(
        db, models.User(username=user.username,
                        hashed_password=hashed_password))


# Resumes
def get_resume(db: Session, resume_id: int):
    return db.query(
        models.Resume).filter(models.Resume.id == resume_id).first()


def update_resume(db: Session, resume: Resume):
    return finalize_update(db, get_resume(db, resume.id), resume)


def create_user_resume(db: Session, resume: ResumeCreate, user_id: int):
    return finalize_create(db, models.Resume(**resume.dict(),
                                             owner_id=user_id))


# Infos
def create_resume_info(db: Session, resume_id: int, name: str):
    return finalize_create(db, models.Info(resume_id=resume_id, name=name))


def get_resume_info(db: Session, resume_id: int):
    return db.query(
        models.Info).filter(models.Info.resume_id == resume_id).first()


def update_resume_info(db: Session, info: Info):
    return finalize_update(db, get_resume_info(db, info.resume_id), info)


# Skills
def get_resume_skills(db: Session, resume_id: int):
    return db.query(
        models.Skills).filter(models.Skills.resume_id == resume_id).first()


def get_skills(db: Session, skills_id: int):
    return db.query(
        models.Skills).filter(models.Skills.id == skills_id).first()


def update_skills(db: Session, skills: Skills):
    return finalize_update(db, get_skills(db, skills.id), skills)


def create_resume_skills(db: Session, resume_id: int):
    return finalize_create(db, models.Skills(resume_id=resume_id))


def update_resume_skills(db: Session, skills: Skills):
    return finalize_update(db, get_resume_skills(db, skills.resume_id), skills)


def create_skills_group(db: Session, skills_id: int):
    return finalize_create(db, models.SkillsGroup(skills_id=skills_id))


def get_skills_group(db: Session, group_id: int):
    return db.query(
        models.SkillsGroup).filter(models.SkillsGroup.id == group_id).first()


def update_skills_group(db: Session, skills_group: SkillsGroup):
    return finalize_update(db, get_skills_group(db, skills_group.id),
                           skills_group)


# Experiences
def get_experience(db: Session, experience_id: int):
    return db.query(models.Experience).filter(
        models.Experience.id == experience_id).first()


def update_experience(db: Session, experience: Experience):
    return finalize_update(db, get_experience(db, experience.id), experience)


def create_resume_experience(db: Session, resume_id: int):
    return finalize_create(db, models.Experience(resume_id=resume_id))


def get_resume_experience(db: Session, resume_id: int):
    return db.query(models.Experience).filter(
        models.Experience.resume_id == resume_id).first()


def update_resume_experience(db: Session, skills: Info):
    return finalize_update(db, get_resume_experience(db, skills.resume_id),
                           skills)


def create_experience_unit(db: Session, experience_id: int):
    return finalize_create(db,
                           models.ExperienceUnit(experience_id=experience_id))


def get_experience_unit(db: Session, unit_id: int):
    return db.query(models.ExperienceUnit).filter(
        models.ExperienceUnit.id == unit_id).first()


def update_experience_unit(db: Session, experience_unit: ExperienceUnit):
    return finalize_update(db, get_experience_unit(db, experience_unit.id),
                           experience_unit)
