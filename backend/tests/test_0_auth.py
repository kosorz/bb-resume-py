import pytest

from httpx import AsyncClient
from fastapi import FastAPI
from app.db.crud import get_user_by_username
from app.resources.users.schemas import UserCreate
from typing import Dict
from jose import jwt
from app.core.config import SECRET_KEY, ALGORITHM

from starlette import status

pytestmark = pytest.mark.asyncio


class TestAuthRoutes:
    async def test_login_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if login endpoint is available
        res = await client.post(app.url_path_for("auth:token"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_registration_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if join endpoint is available
        res = await client.post(app.url_path_for("auth:join"))
        assert res.status_code != status.HTTP_404_NOT_FOUND


@pytest.fixture
def new_user_login():
    return {
        "username": "string",
        "password": "string",
    }


class TestAuth:
    @pytest.mark.parametrize(
        "body",
        (
            {
                "username": "string",
                "password": "string"
            },
            {
                "username": "string",
                "password_confirm": "string",
            },
            {
                "password": "string",
                "password_confirm": "string",
            },
            {
                "username": "string",
                "password": "string",
                "password_confirm": "string_not_match",
            },
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
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

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
        assert res.status_code == status.HTTP_200_OK

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
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    @pytest.mark.parametrize(
        "credentials",
        (
            {
                "username": "invalid_username",
            },
            {
                "password": "string",
            },
        ),
    )
    async def test_login_form_data_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
        credentials: str,
    ) -> None:
        client.headers["content-type"] = "application/x-www-form-urlencoded"
        # Checks if request will be rejected when invalid data submitted
        res = await client.post(app.url_path_for("auth:token"),
                                data=credentials)
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    @pytest.mark.parametrize(
        "credentials",
        (
            {
                "username": "invalid_username",
                "password": "string"
            },
            {
                "username": "string",
                "password": "invalid_password"
            },
        ),
    )
    async def test_login_with_invalid_credentials(
        self,
        app: FastAPI,
        client: AsyncClient,
        credentials: str,
    ) -> None:
        client.headers["content-type"] = "application/x-www-form-urlencoded"
        # Checks if will not authorize for invalid credentials
        res = await client.post(app.url_path_for("auth:token"),
                                data=credentials)
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_login_and_its__valid_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
        new_user_login: UserCreate,
    ) -> None:
        # Check if valid credentials will be accepted
        client.headers["content-type"] = "application/x-www-form-urlencoded"
        res = await client.post(app.url_path_for("auth:token"),
                                data=new_user_login)
        assert res.status_code == status.HTTP_200_OK

        # Check if response has a proper structure
        assert "token_type" in res.json()
        assert "access_token" in res.json()
        assert res.json()["token_type"] == "bearer"

        # Check if token can be decoded and it contains appropriate data inside
        token = res.json().get("access_token")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        assert "exp" in payload
        assert "sub" in payload
        assert payload["sub"] == new_user_login["username"]