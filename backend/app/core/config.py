import socket

from databases import DatabaseURL
from starlette.config import Config
from starlette.datastructures import Secret
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

config = Config(".env")

PROJECT_NAME = "bbresume"
VERSION = "1.0.0"

POSTGRES_USER = config("POSTGRES_USER", cast=str)
POSTGRES_PASSWORD = config("POSTGRES_PASSWORD", cast=Secret)
POSTGRES_SERVER = config("POSTGRES_SERVER", cast=str, default="db")
POSTGRES_PORT = config("POSTGRES_PORT", cast=str, default="5432")
POSTGRES_DB = config("POSTGRES_DB", cast=str)

DATABASE_URL = config(
    "DATABASE_URL",
    default=
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
)

OBJECT_STORAGE_PORT = config("OBJECT_STORAGE_PORT", default=f"9001")
OBJECT_STORAGE_URL = config("OBJECT_STORAGE_URL",
                            default=f"http://host.docker.internal:")
OBJECT_STORAGE_ACCESS_KEY = config("OBJECT_STORAGE_ACCESS_KEY",
                                   cast=str,
                                   default=f"admin")
OBJECT_STORAGE_SECRET_KEY = config("OBJECT_STORAGE_SECRET_KEY",
                                   cast=str,
                                   default=f"password")

SECRET_KEY = config("SECRET_KEY", cast=str)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440
