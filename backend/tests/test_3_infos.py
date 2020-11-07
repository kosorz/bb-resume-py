import pytest
from starlette import status
from typing import Dict
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.db.crud import get_resume_info

pytestmark = pytest.mark.asyncio


class TestInfosRoutes:
    async def test_update_info_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update info endpoint is available
        res = await client.patch(
            app.url_path_for(
                "info:update-info",
                resume_id=1,
            ),
            json={},
        )
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestInfos:
    async def test_update_info_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        info_update = {"phone": "updated_phone"}
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("info:update-info", resume_id=2),
            json=info_update,
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_resume_info_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if info will not be updated when no key matches the resume stored
        res = await client.patch(
            app.url_path_for(
                "info:update-info",
                resume_id=2,
            ),
            json={"not_existing_key": "nothing"},
        )
        assert res.json() == {
            "name": "string",
            "id": 2,
            "resume_id": 2,
            "phone": "",
            "link": "",
            "email": "",
            "location": "",
            "role": "",
            "phone_enabled": True,
            "link_enabled": True,
            "email_enabled": True,
            "location_enabled": True,
            "role_enabled": True
        }
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.parametrize(
        "body",
        (
            {
                "link": "not_really_a_link",
            },
            {
                "phone": [],
            },
            {
                "email": [],
            },
            {
                "location": [],
            },
            {
                "role": [],
            },
            {
                "phone_enabled": "not_a_boolean_value",
            },
            {
                "link_enabled": "not_a_boolean_value",
            },
            {
                "email_enabled": "not_a_boolean_value",
            },
            {
                "location_enabled": "not_a_boolean_value",
            },
            {
                "role_enabled": "not_a_boolean_value",
            },
        ),
    )
    async def test_update_resume_info_validation_error(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "info:update-info",
                resume_id=2,
            ),
            json=body,
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_resume_info_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will be updated when correct data submitted and user owns resume
        res = await client.patch(
            app.url_path_for(
                "info:update-info",
                resume_id=2,
            ),
            json={
                "phone": "updated_string",
                "link": "https://heeeeeeeey.com/",
                "email": "kosorz.artur@gmail.com",
                "location": "updated_string",
                "role": "updated_string",
                "phone_enabled": False,
                "link_enabled": False,
                "email_enabled": False,
                "location_enabled": False,
                "role_enabled": False
            },
        )
        assert res.json() == {
            "name": "string",
            "id": 2,
            "resume_id": 2,
            "phone": "updated_string",
            "link": "https://heeeeeeeey.com/",
            "email": "kosorz.artur@gmail.com",
            "location": "updated_string",
            "role": "updated_string",
            "phone_enabled": False,
            "link_enabled": False,
            "email_enabled": False,
            "location_enabled": False,
            "role_enabled": False
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_update_resume_info_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will be updated when correct data submitted and user owns resume
        info = get_resume_info(app.state._db, 2)
        assert info.link == "https://heeeeeeeey.com/"
        assert info.role == "updated_string"
        assert info.phone == "updated_string"
        assert info.email == "kosorz.artur@gmail.com"
        assert info.location == "updated_string"
        assert info.phone_enabled == False
        assert info.link_enabled == False
        assert info.email_enabled == False
        assert info.location_enabled == False
        assert info.role_enabled == False

    async def test_update_resume_info_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if info will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "info:update-info",
                resume_id=1,
            ),
            json={"title": "updated_string"},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN
