import pytest

from httpx import AsyncClient
from fastapi import FastAPI
from app.db.crud import get_user_by_username
from app.resources.users.schemas import UserCreate
from app.resources.util.deps import get_current_user

from starlette import status

pytestmark = pytest.mark.asyncio


class TestUsersRoutes:
    @pytest.mark.asyncio
    async def test_get_users_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint is available
        res = await client.get(app.url_path_for("users:get-users"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_user_me_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestAuth:
    @pytest.mark.asyncio
    async def test_get_user_me_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint responds correctly
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.json() == {
            'username': 'string',
            'id': 2,
            'disabled': False,
            'resumes': [],
        }
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
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

    @pytest.mark.asyncio
    async def test_get_user_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint responds correctly
        res = await client.get(app.url_path_for("users:get-users"))
        assert res.json() == [{
            'disabled': False,
            'id': 1,
            'username': 'seed_user'
        }, {
            'disabled': False,
            'id': 2,
            'username': 'string'
        }]
        assert res.status_code == status.HTTP_200_OK
