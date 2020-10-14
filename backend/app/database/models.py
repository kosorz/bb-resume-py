import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from .db_config import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    disabled = Column(Boolean, default=False)
    resumes = relationship("Resume", back_populates="owner")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    deleted = Column(Boolean, default=False)

    owner = relationship("User", back_populates="resumes")
    owner_id = Column(Integer, ForeignKey("users.id"))

    info = relationship("Info", uselist=False, back_populates="resume")
    skills = relationship("Skills", uselist=False, back_populates="resume")
    experience = relationship("Experience",
                              uselist=False,
                              back_populates="resume")


class Info(Base):
    __tablename__ = "infos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, default="")
    link = Column(String, default="")
    email = Column(String, default="")
    location = Column(String, default="")
    role = Column(String, default="")
    phone_enabled = Column(Boolean, default=True)
    link_enabled = Column(Boolean, default=True)
    email_enabled = Column(Boolean, default=True)
    location_enabled = Column(Boolean, default=True)
    role_enabled = Column(Boolean, default=True)

    resume_id = Column(Integer, ForeignKey("resumes.id"))
    resume = relationship("Resume", back_populates="info")


class Skills(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="")
    deleted = Column(Boolean, default=False)

    groups = relationship("SkillsGroup", back_populates="skills")
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    resume = relationship("Resume", back_populates="skills")


class SkillsGroup(Base):
    __tablename__ = 'skills_groups'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="")
    values = Column(String, default="")
    deleted = Column(Boolean, default=False)

    skills_id = Column(Integer, ForeignKey("skills.id"))
    skills = relationship("Skills", back_populates="groups")


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="")
    deleted = Column(Boolean, default=False)

    units = relationship("ExperienceUnit", back_populates="experience")
    resume_id = Column(Integer, ForeignKey("resumes.id"))
    resume = relationship("Resume", back_populates="experience")


class ExperienceUnit(Base):
    __tablename__ = 'experience_units'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, default="")
    company_name = Column(String, default="")
    description = Column(String, default="")
    location = Column(String, default="")
    date_start = Column(DateTime, default=datetime.datetime.utcnow)
    date_end = Column(DateTime, default=datetime.datetime.utcnow)
    link = Column(String, default="")
    company_name_enabled = Column(Boolean, default=True)
    description_enabled = Column(Boolean, default=True)
    location_enabled = Column(Boolean, default=True)
    period_enabled = Column(Boolean, default=True)
    link_enabled = Column(Boolean, default=True)
    deleted = Column(Boolean, default=False)

    experience_id = Column(Integer, ForeignKey("experiences.id"))
    experience = relationship("Experience", back_populates="units")
