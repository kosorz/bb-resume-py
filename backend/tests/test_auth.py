import pytest

from httpx import AsyncClient
from fastapi import FastAPI, Depends
from app.db.crud import get_user_by_username
from app.resources.users.schemas import UserCreate
from typing import Dict

from starlette.status import (
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
    HTTP_422_UNPROCESSABLE_ENTITY,
)

pytestmark = pytest.mark.asyncio


class TestAuthRoutes:
    @pytest.mark.asyncio
    async def test_login_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if login endpoint is available
        res = await client.post(app.url_path_for("auth:token"))
        assert res.status_code != HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_registration_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if join endpoint is available
        res = await client.post(app.url_path_for("auth:join"))
        assert res.status_code != HTTP_404_NOT_FOUND


@pytest.fixture
def new_user():
    return {
        "username": "string",
        "password": "string",
        "password_confirm": "string"
    }


class TestAuth:
    @pytest.mark.parametrize(
        "body",
        (
            ({
                "username": "string",
                "password": "string"
            }),
            ({
                "username": "string",
                "password_confirm": "string",
            }),
            ({
                "password": "string",
                "password_confirm": "string",
            }),
            ({
                "username": "string",
                "password": "string",
                "password_confirm": "string_not_match",
            }),
        ),
    )
    async def test_registration_body_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Check if request with invalid body is rejected
        res = await client.post(app.url_path_for("auth:join"), json=body)
        assert res.status_code == HTTP_422_UNPROCESSABLE_ENTITY

    async def test_registration(
        self,
        app: FastAPI,
        client: AsyncClient,
        new_user: UserCreate,
    ) -> None:
        # Checks if user does not exist and creates it when body is valid
        user_in_db = get_user_by_username(app.state._db, new_user["username"])
        assert user_in_db is None
        res = await client.post(
            app.url_path_for("auth:join"),
            json=new_user,
        )
        assert res.status_code == HTTP_200_OK

    async def test_registration_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
        new_user: UserCreate,
    ) -> None:
        # Checks if user with relevant username was created
        user_in_db = get_user_by_username(app.state._db, new_user["username"])
        assert user_in_db is not None
        assert user_in_db.username == new_user["username"]

        # Check if request is rejected if username was already used
        res = await client.post(
            app.url_path_for("auth:join"),
            json=new_user,
        )
        assert res.status_code == HTTP_400_BAD_REQUEST
