import pytest
from starlette import status
from typing import Dict
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.util.fns import compare_while_excluding
from app.db.crud import get_resume, get_experience_unit

pytestmark = pytest.mark.asyncio


class TestExperienceRoutes:
    async def test_create_experience_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create experience endpoint is available
        res = await client.post(
            app.url_path_for(
                "experience:create-experience",
                resume_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_experience_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update experience endpoint is available
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience",
                experience_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


@pytest.fixture
def recreated_experience():
    return {
        "title": "updated_title",
        "id": 2,
        "deleted": False,
        "resume_id": 2
    }


class TestExperience:
    async def test_create_experience_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it"s genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("experience:create-experience", resume_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_experience_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it"s genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("experience:update-experience", experience_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_resume_experience_does_not_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        resume = get_resume(app.state._db, 2)
        assert not resume.experience

    async def test_create_experience_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will be created
        res = await client.post(
            app.url_path_for("experience:create-experience", resume_id=2), )
        assert res.json() == {
            "title": "",
            "id": 2,
            "deleted": False,
            "resume_id": 2,
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_create_experience_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience were created
        resume = get_resume(app.state._db, 2)
        assert resume.experience

    async def test_update_experience_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Check if request with invalid body is rejected
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience",
                experience_id=2,
            ),
            json={
                "deleted": "this_is_not_boolean",
                "title": []
            },
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_experience_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will be updated when correct data submitted and user owns resume
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience",
                experience_id=2,
            ),
            json={
                "deleted": True,
                "title": "updated_title"
            },
        )
        assert res.json() == {
            "title": "updated_title",
            "id": 2,
            "deleted": True,
            "resume_id": 2
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_resume_experience_existence_and_its_soft_deletion(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        resume = get_resume(app.state._db, 2)
        assert resume.experience.deleted

    async def test_recreation_of_experience_response(
        self,
        app: FastAPI,
        client: AsyncClient,
        recreated_experience: Dict,
    ) -> None:
        # Checks if experience will be recreated
        res = await client.post(
            app.url_path_for("experience:create-experience", resume_id=2))
        assert res.json() == recreated_experience
        assert res.status_code == status.HTTP_200_OK

    async def test_not_creating_experience_if_it_already_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
        recreated_experience: Dict,
    ) -> None:
        # Checks if will return the same experience
        res = await client.post(
            app.url_path_for("experience:create-experience", resume_id=2), )
        assert res.json() == recreated_experience
        assert res.status_code == status.HTTP_200_OK

    async def test_create_experience_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will not be created when user doesn't own the resume
        res = await client.post(
            app.url_path_for(
                "experience:create-experience",
                resume_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_experience_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience",
                experience_id=1,
            ),
            json={},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN


class TestExperienceUnitsRoutes:
    async def test_create_experience_unit_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create experience unit endpoint is available
        res = await client.patch(
            app.url_path_for(
                "experience:create-experience-unit",
                experience_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_experience_unit_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update experience unit endpoint is available
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience-unit",
                unit_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestExperienceUnits:
    async def test_create_experience_unit_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it"s genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("experience:create-experience-unit",
                             experience_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_experience_unit_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it"s genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("experience:update-experience-unit", unit_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_create_experience_unit_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will be created
        res = await client.post(
            app.url_path_for("experience:create-experience-unit",
                             experience_id=2))
        proper_response = {
            "title": "",
            "id": 3,
            "deleted": False,
            "company_name": "",
            "description": "",
            "location": "",
            "link": "",
            "company_name_enabled": True,
            "description_enabled": True,
            "location_enabled": True,
            "period_enabled": True,
            "link_enabled": True
        }
        assert compare_while_excluding(
            res.json(),
            proper_response,
            {"date_start", "date_end"},
        )
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.parametrize("body", (
        {
            "title": []
        },
        {
            "company_name": [],
        },
        {
            "description": [],
        },
        {
            "location": [],
        },
        {
            "link": "not_a_link",
        },
        {
            "deleted": "not_really_a_boolean_value",
        },
        {
            "company_name_enabled": "not_really_a_boolean_value",
        },
        {
            "description_enabled": "not_really_a_boolean_value",
        },
        {
            "location_enabled": "not_really_a_boolean_value",
        },
        {
            "period_enabled": "not_really_a_boolean_value",
        },
    ))
    async def test_update_experience_unit_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience-unit",
                unit_id=2,
            ),
            json=body,
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_experience_unit_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will be updated when correct data submitted and user owns resume
        update_data = {
            "deleted": True,
            "title": "updated_title",
            "company_name": "updated_company_name",
            "description": "updated_description",
            "description": "updated_description",
            "location": "updated_location",
            "link": "https://heeeeeeeey.com/",
            "company_name_enabled": False,
            "description_enabled": False,
            "location_enabled": False,
            "period_enabled": False,
            "link_enabled": False,
        }
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience-unit",
                unit_id=2,
            ),
            json=update_data,
        )
        print(res.json())
        assert compare_while_excluding(
            res.json(),
            update_data,
            {"date_start", "date_end", "id"},
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_resume_experience_unit_update_and_its_soft_deletion(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        experience_unit = get_experience_unit(app.state._db, 2)
        assert experience_unit.deleted
        assert experience_unit.title == "updated_title"
        assert experience_unit.company_name == "updated_company_name"
        assert experience_unit.description == "updated_description"

    async def test_create_experience_unit_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be created when user doesn't own the resume
        res = await client.post(
            app.url_path_for(
                "experience:create-experience-unit",
                experience_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_experience_unit_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "experience:update-experience-unit",
                unit_id=1,
            ),
            json={},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN