import warnings
import uuid
import os

import pytest
import docker as pydocker
from asgi_lifespan import LifespanManager

from fastapi import FastAPI
from httpx import AsyncClient
from databases import Database

import alembic
from alembic.config import Config
from app.util.deps import get_current_user
from app.db.crud import get_user_by_username, create_user
from app.resources.users.schemas import UserCreate


@pytest.fixture(scope="session")
def docker() -> pydocker.APIClient:
    return pydocker.APIClient(base_url="unix://var/run/docker.sock",
                              version="auto")


@pytest.fixture(scope="session", autouse=True)
def postgres_container(docker: pydocker.APIClient) -> None:
    warnings.filterwarnings("ignore", category=DeprecationWarning)

    image = "postgres:12.1-alpine"
    docker.pull(image)
    container = docker.create_container(
        image=image,
        name=f"test-postgres-{uuid.uuid4()}",
        detach=True,
    )

    docker.start(container=container["Id"])

    config = alembic.config.Config("alembic.ini")

    try:
        os.environ["DB_SUFFIX"] = "_test"
        alembic.command.upgrade(config, "head")
        yield container
        alembic.command.downgrade(config, "base")
    finally:
        docker.kill(container["Id"])
        docker.remove_container(container["Id"])


@pytest.fixture
def app() -> FastAPI:
    from app.main import get_application

    return get_application()


@pytest.fixture
def db(app: FastAPI):
    return app.state._db


@pytest.fixture
def new_user():
    return {
        "username": "string",
        "password": "string",
        "password_confirm": "string"
    }


@pytest.fixture
async def client(app: FastAPI) -> AsyncClient:
    async def override_get_current_user():
        user = get_user_by_username(
            app.state._db,
            username="string",
        )
        return user

    app.dependency_overrides[get_current_user] = override_get_current_user

    async with LifespanManager(app):
        async with AsyncClient(app=app,
                               base_url="http://testserver",
                               headers={"Content-Type":
                                        "application/json"}) as client:
            yield client
