from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import logging
import os

from ..core.config import DATABASE_URL

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


async def close_db_connection(app: FastAPI) -> None:
    app.state._db.close()
    app.state._db_engine.dispose()
