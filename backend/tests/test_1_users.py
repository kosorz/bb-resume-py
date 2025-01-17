import pytest

from httpx import AsyncClient
from fastapi import FastAPI
from app.db.crud import get_user_by_username
from app.resources.users.schemas import UserCreate
from app.util.deps import get_current_user

from starlette import status

pytestmark = pytest.mark.asyncio


class TestUsersRoutes:
    async def test_get_users_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint is available
        res = await client.get(app.url_path_for("users:get"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_get_user_me_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestUsers:
    async def test_get_user_me_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint responds correctly
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.json() == {
            "username": "test@email.com",
            "id": 2,
            "disabled": False,
            "resumes": [],
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_create_resume_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.get(app.url_path_for("users:get-me"), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_get_user_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint responds correctly
        res = await client.get(app.url_path_for("users:get"))
        assert res.json() == [{
            "disabled": False,
            "id": 1,
            "username": "seed@email.com"
        }, {
            "disabled": False,
            "id": 2,
            "username": "test@email.com"
        }]
        assert res.status_code == status.HTTP_200_OK
