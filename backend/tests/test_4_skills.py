import pytest
from starlette import status
from typing import Dict
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.util.fns import compare_while_excluding
from app.db.crud import get_resume, get_skills_group

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


@pytest.fixture
def relisted_skills():
    return {
        "title": "updated_title",
        "id": 2,
        "unlisted": False,
        "resume_id": 2
    }


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

    async def test_resume_skills_does_not_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        resume = get_resume(app.state._db, 2)
        assert not resume.skills

    async def test_create_skills_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills will be created
        res = await client.post(
            app.url_path_for("skills:create-skills", resume_id=2), )
        assert res.json() == {
            "title": "",
            "id": 2,
            "unlisted": False,
            "resume_id": 2,
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_create_skills_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills were created
        resume = get_resume(app.state._db, 2)
        assert resume.skills

    async def test_update_skills_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Check if request with invalid body is rejected
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills",
                skills_id=2,
            ),
            json={
                "unlisted": "this_is_not_boolean",
                "title": []
            },
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_skills_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills will be updated when correct data submitted and user owns resume
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills",
                skills_id=2,
            ),
            json={
                "unlisted": True,
                "title": "updated_title"
            },
        )
        assert res.json() == {
            "title": "updated_title",
            "id": 2,
            "unlisted": True,
            "resume_id": 2
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_resume_skills_existence_and_its_unlisted_property(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        resume = get_resume(app.state._db, 2)
        assert resume.skills.unlisted

    async def test_create_skills_rejection_if_already_created(
        self,
        app: FastAPI,
        client: AsyncClient,
        relisted_skills: Dict,
    ) -> None:
        # Checks if skills will be recreated
        res = await client.post(
            app.url_path_for("skills:create-skills", resume_id=2), )
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_create_skills_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills will not be created when user doesn't own the resume
        res = await client.post(
            app.url_path_for(
                "skills:create-skills",
                resume_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_skills_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills",
                skills_id=1,
            ),
            json={},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN


class TestSkillsGroupsRoutes:
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


class TestSkillsGroups:
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

    async def test_create_skills_group_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills group will be created
        res = await client.post(
            app.url_path_for("skills:create-skills-group", skills_id=2), )
        assert res.json() == {"title": "", "id": 3, "values": []}
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.parametrize("body", (
        {
            "values": False
        },
        {
            "title": [],
        },
    ))
    async def test_update_skills_group_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills-group",
                group_id=2,
            ),
            json=body,
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_skills_group_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills group will be updated when correct data submitted and user owns resume
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills-group",
                group_id=2,
            ),
            json={
                "title": "updated_title",
                "values": ["Added value"],
            },
        )
        assert res.json() == {
            "title": "updated_title",
            "id": 2,
            "values": ["Added value"]
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_resume_skills_group_update(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        skills_group = get_skills_group(app.state._db, 2)
        assert skills_group.title == "updated_title"
        assert skills_group.values == ["Added value"]

    async def test_create_skills_group_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills group will not be created when user doesn't own the resume
        res = await client.post(
            app.url_path_for(
                "skills:create-skills-group",
                skills_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_skills_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if skills group will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "skills:update-skills-group",
                group_id=1,
            ),
            json={},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN