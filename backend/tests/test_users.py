import pytest

from httpx import AsyncClient
from fastapi import FastAPI
from app.db.crud import get_user_by_username
from app.resources.users.schemas import UserCreate

from starlette.status import HTTP_404_NOT_FOUND, HTTP_200_OK

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
        assert res.status_code != HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_user_me_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.status_code != HTTP_404_NOT_FOUND


class TestAuth:
    @pytest.mark.asyncio
    async def test_get_user_me_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoints responds correctly
        res = await client.get(app.url_path_for("users:get-me"))
        assert res.json() == {
            'username': 'string',
            'id': 1,
            'disabled': False,
            'resumes': [],
        }
        assert res.status_code == HTTP_200_OK

    @pytest.mark.asyncio
    async def test_get_user_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoints responds correctly
        res = await client.get(app.url_path_for("users:get-users"))
        assert res.json() == [{
            'username': 'string',
            'id': 1,
            'disabled': False,
        }]
        assert res.status_code == HTTP_200_OK
