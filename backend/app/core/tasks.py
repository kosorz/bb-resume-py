import boto3
import logging
import os

from typing import Callable
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from botocore.client import ClientError

from ..core.config import DATABASE_URL, OBJECT_STORAGE_URL, OBJECT_STORAGE_ACCESS_KEY, OBJECT_STORAGE_SECRET_KEY, OBJECT_STORAGE_PORT

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
    object_storage = boto3.resource(
        's3',
        endpoint_url=
        f"""{OBJECT_STORAGE_URL}{os.environ.get("OBJECT_STORAGE_PORT") or OBJECT_STORAGE_PORT}""",
        aws_access_key_id=f"""{OBJECT_STORAGE_ACCESS_KEY}""",
        aws_secret_access_key=f"""{OBJECT_STORAGE_SECRET_KEY}""",
        config=boto3.session.Config(signature_version='s3v4'),
        region_name='us-east-1')

    client = object_storage.meta.client

    try:
        client.head_bucket(Bucket='resume-photos')
    except ClientError:
        client.create_bucket(Bucket='resume-photos')

    app.state._object_storage = client


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
