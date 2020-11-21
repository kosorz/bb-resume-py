import boto3
import logging
import os
from typing import Callable
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..core.config import DATABASE_URL, MINIO_URL, MINIO_ACCESS_KEY, MINIO_SECRET_KEY

logger = logging.getLogger(__name__)


async def connect_to_db(app: FastAPI) -> None:
    db_url = f"""{DATABASE_URL}{os.environ.get("DB_SUFFIX", "")}"""
    engine = create_engine(db_url)
    SessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    )
    app.state._db = SessionLocal()
    app.state._db_engine = engine


async def connect_to_s3(app: FastAPI) -> None:
    s3 = boto3.resource('s3',
                        endpoint_url=f"""{MINIO_URL}""",
                        aws_access_key_id=f"""{MINIO_ACCESS_KEY}""",
                        aws_secret_access_key=f"""{MINIO_SECRET_KEY}""",
                        config=boto3.session.Config(signature_version='s3v4'),
                        region_name='us-east-1')
    app.state._s3 = s3.meta.client


async def close_db_connection(app: FastAPI) -> None:
    app.state._db.close()
    app.state._db_engine.dispose()


def create_start_app_handler(app: FastAPI) -> Callable:
    async def start_app() -> None:
        await connect_to_db(app)
        await connect_to_s3(app)

    return start_app


def create_stop_app_handler(app: FastAPI) -> Callable:
    async def stop_app() -> None:
        await close_db_connection(app)

    return stop_app
