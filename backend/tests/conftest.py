import warnings
import uuid
import os
import pytest
import docker as pydocker
from pathlib import Path
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
def testing_postgres(docker: pydocker.APIClient) -> None:
    warnings.filterwarnings("ignore", category=DeprecationWarning)

    postgres_image = "postgres:12.1-alpine"
    docker.pull(postgres_image)
    db_container = docker.create_container(
        image=postgres_image,
        name=f"test-postgres-{uuid.uuid4()}",
        detach=True,
    )
    docker.start(container=db_container["Id"])

    config = alembic.config.Config("alembic.ini")
    os.environ["DB_SUFFIX"] = "_test"

    try:
        alembic.command.upgrade(config, "head")
        yield db_container
        alembic.command.downgrade(config, "base")
    finally:
        docker.kill(db_container["Id"])
        docker.remove_container(db_container["Id"])


@pytest.fixture(scope="session", autouse=True)
def testing_minio(docker: pydocker.APIClient) -> None:
    warnings.filterwarnings("ignore", category=DeprecationWarning)

    minio_image = "minio/minio:RELEASE.2020-08-18T19-41-00Z"
    docker.pull(minio_image)
    minio_container = docker.create_container(
        detach=True,
        image=minio_image,
        name=f"test-minio-{uuid.uuid4()}",
        environment={
            "MINIO_ACCESS_KEY": "admin",
            "MINIO_SECRET_KEY": "password"
        },
        ports=[9000],
        command="minio server /data/dir",
        volumes="data",
        host_config=docker.create_host_config(port_bindings={9000: 9002}),
    )
    docker.start(container=minio_container["Id"])
    os.environ["OBJECT_STORAGE_PORT"] = "9002"

    try:
        yield minio_container
    finally:
        docker.kill(minio_container["Id"])
        docker.remove_container(minio_container["Id"])


@pytest.fixture
def app() -> FastAPI:
    from app.main import get_application

    return get_application()


@pytest.fixture
async def app_with_test_overrides(app: FastAPI) -> FastAPI:
    async def override_get_current_user():
        user = get_user_by_username(
            app.state._db,
            username="string",
        )
        return user

    app.dependency_overrides[get_current_user] = override_get_current_user

    yield app


@pytest.fixture
async def base_client(app_with_test_overrides: FastAPI) -> AsyncClient:

    async with LifespanManager(app_with_test_overrides):
        async with AsyncClient(app=app_with_test_overrides,
                               base_url="http://testserver") as client:
            yield client


@pytest.fixture
async def client(app_with_test_overrides: FastAPI) -> AsyncClient:

    async with LifespanManager(app_with_test_overrides):
        async with AsyncClient(app=app_with_test_overrides,
                               base_url="http://testserver",
                               headers={"Content-Type":
                                        "application/json"}) as client:
            yield client


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
async def jpeg_file():
    fpath = Path('/backend/tests/util', 'testfile.jpg')
    with open(fpath, "rb") as f:
        yield ("filename", f, "image/jpeg")


@pytest.fixture
async def png_file():
    fpath = Path('/backend/tests/util', 'testfile.png')
    with open(fpath, "rb") as f:
        yield ("filename", f, "image/png")


@pytest.fixture
async def txt_file():
    fpath = Path('/backend/tests/util', 'testfile.txt')
    with open(fpath, "rb") as f:
        yield ("filename", f, "plain/text")