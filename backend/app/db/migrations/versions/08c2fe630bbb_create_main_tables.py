"""create_main_tables

Revision ID: 08c2fe630bbb
Revises: 
Create Date: 2020-10-14 21:08:21.914699

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
import datetime

from app.util.consts import meta

# revision identifiers, used by Alembic
revision = "08c2fe630bbb"
down_revision = None
branch_labels = None
depends_on = None


def create_main_tables_seed_data() -> None:
    users = op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("username", sa.String, unique=True, index=True),
        sa.Column("hashed_password", sa.String),
        sa.Column("disabled", sa.Boolean, default=False),
    )

    resumes = op.create_table(
        "resumes",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("title", sa.String),
        sa.Column("deleted", sa.Boolean, default=False),
        sa.Column("meta", postgresql.JSONB, default=meta),
        sa.Column(
            "owner_id",
            sa.Integer,
            sa.ForeignKey("users.id"),
            nullable=False,
        ),
    )

    infos = op.create_table(
        "infos",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("name", sa.String),
        sa.Column("phone", sa.String, default=""),
        sa.Column("link", sa.String, default=""),
        sa.Column("email", sa.String, default=""),
        sa.Column("location", sa.String, default=""),
        sa.Column("photo", sa.String, default=""),
        sa.Column("quote", sa.String, default=""),
        sa.Column("cropped_photo", sa.String, default=""),
        sa.Column("role", sa.String, default=""),
        sa.Column("phone_enabled", sa.Boolean, default=True),
        sa.Column("link_enabled", sa.Boolean, default=True),
        sa.Column("email_enabled", sa.Boolean, default=True),
        sa.Column("location_enabled", sa.Boolean, default=True),
        sa.Column("role_enabled", sa.Boolean, default=True),
        sa.Column("photo_enabled", sa.Boolean, default=True),
        sa.Column("quote_enabled", sa.Boolean, default=True),
        sa.Column(
            "resume_id",
            sa.Integer,
            sa.ForeignKey("resumes.id"),
            nullable=False,
        ),
    )

    skills = op.create_table(
        "skills",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("title", sa.String, default=""),
        sa.Column("order", postgresql.ARRAY(sa.Integer), default=[]),
        sa.Column(
            "resume_id",
            sa.Integer,
            sa.ForeignKey("resumes.id"),
            nullable=False,
        ),
    )

    skills_groups = op.create_table(
        "skills_groups",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("title", sa.String, default=""),
        sa.Column("values", postgresql.ARRAY(sa.String), default=[]),
        sa.Column(
            "skills_id",
            sa.Integer,
            sa.ForeignKey("skills.id"),
            nullable=False,
        ),
    )

    experiences = op.create_table(
        "experiences",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("title", sa.String, default=""),
        sa.Column("order", postgresql.ARRAY(sa.Integer), default=[]),
        sa.Column(
            "resume_id",
            sa.Integer,
            sa.ForeignKey("resumes.id"),
            nullable=False,
        ),
    )

    experience_units = op.create_table(
        "experience_units",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("title", sa.String, default=""),
        sa.Column("company_name", sa.String, default=""),
        sa.Column("description", sa.String, default=""),
        sa.Column("location", sa.String, default=""),
        sa.Column("link", sa.String, default=""),
        sa.Column("date_start", sa.DateTime, default=datetime.datetime.utcnow),
        sa.Column("date_end", sa.DateTime, default=datetime.datetime.utcnow),
        sa.Column("company_name_enabled", sa.Boolean, default=True),
        sa.Column("description_enabled", sa.Boolean, default=True),
        sa.Column("location_enabled", sa.Boolean, default=True),
        sa.Column("period_enabled", sa.Boolean, default=True),
        sa.Column("link_enabled", sa.Boolean, default=True),
        sa.Column(
            "experience_id",
            sa.Integer,
            sa.ForeignKey("experiences.id"),
            nullable=False,
        ),
    )

    op.bulk_insert(users, [{
        "username": "seed_user",
        "hashed_password": "seed_hashed_password",
    }])
    op.bulk_insert(resumes, [{"title": "seed_title", "owner_id": 1}])
    op.bulk_insert(infos, [{"name": "seed_user", "resume_id": 1}])
    op.bulk_insert(skills, [{"resume_id": 1, "order": [1]}])
    op.bulk_insert(skills_groups, [{"skills_id": 1}])
    op.bulk_insert(experiences, [{"resume_id": 1, "order": [1]}])
    op.bulk_insert(experience_units, [{"experience_id": 1}])


def upgrade() -> None:
    create_main_tables_seed_data()


def downgrade() -> None:
    op.drop_table("experience_units")
    op.drop_table("experiences")
    op.drop_table("skills_groups")
    op.drop_table("skills")
    op.drop_table("infos")
    op.drop_table("resumes")
    op.drop_table("users")
