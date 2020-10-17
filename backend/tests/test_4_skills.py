import pytest
from starlette import status
from typing import Dict
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.db.crud import get_resume_skills, get_skills_group

pytestmark = pytest.mark.asyncio


class TestSkillsRoutes:
    async def test_create_skills_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create skills endpoint is available
        res = await client.post(
            app.url_path_for(
                "skills:create-skills",
                resume_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_skills_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update skills endpoint is available
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills",
                skills_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_create_skills_group_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create skills group endpoint is available
        res = await client.patch(
            app.url_path_for(
                "skills:create-skills-group",
                skills_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_skills_group_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update skills group endpoint is available
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills-group",
                group_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestSkills:
    async def test_create_skills_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("skills:create-skills", resume_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_skills_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("skills:update-skills", skills_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_create_skills_group_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("skills:create-skills-group", skills_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_skills_group_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("skills:update-skills-group", group_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED