import pytest

from httpx import AsyncClient
from fastapi import FastAPI
from app.resources.util.deps import get_current_user

from starlette import status

pytestmark = pytest.mark.asyncio


class TestResumesRoutes:
    @pytest.mark.asyncio
    async def test_create_resume_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint is available
        res = await client.post(app.url_path_for("resumes:create-resume"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_get_resume_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.get(
            app.url_path_for("resumes:get-resume", resume_id=1))
        print(res)
        assert res.status_code != status.HTTP_404_NOT_FOUND

    @pytest.mark.asyncio
    async def test_update_resume_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.patch(
            app.url_path_for("resumes:update-resume", resume_id=1))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestResumes:
    @pytest.mark.asyncio
    async def test_create_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create resume endpoint properly validates data
        res = await client.post(app.url_path_for("resumes:create-resume"))
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    @pytest.mark.asyncio
    async def test_create_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        new_resume = {"title": "string"}
        # Checks if resume will be created when correct data submitted
        res = await client.post(
            app.url_path_for("resumes:create-resume"),
            json=new_resume,
        )
        assert res.json() == {
            "title": "string",
            "id": 2,
            "owner_id": 2,
            "deleted": False
        }
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_create_resume_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        new_resume = {"title": "string"}
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("resumes:create-resume"),
            json=new_resume,
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    @pytest.mark.asyncio
    async def test_update_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will not be updated when no key matches the resume stored
        res = await client.patch(
            app.url_path_for(
                "resumes:update-resume",
                resume_id=2,
            ),
            json={"not_existing_key": "nothing"},
        )
        assert res.json() == {
            "title": "string",
            "id": 2,
            "owner_id": 2,
            "deleted": False
        }
        assert res.status_code == status.HTTP_200_OK

        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "resumes:update-resume",
                resume_id=2,
            ),
            json={"deleted": "not boolean value"},
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    @pytest.mark.asyncio
    async def test_update_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will be updated when correct data submitted and user owns resume
        res = await client.patch(
            app.url_path_for(
                "resumes:update-resume",
                resume_id=2,
            ),
            json={
                "deleted": True,
                "title": "updated_string"
            },
        )
        assert res.json() == {
            "title": "updated_string",
            "id": 2,
            "owner_id": 2,
            "deleted": True
        }
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.asyncio
    async def test_update_resume_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "resumes:update-resume",
                resume_id=1,
            ),
            json={
                "deleted": True,
                "title": "updated_string"
            },
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN
