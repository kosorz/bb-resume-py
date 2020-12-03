import pytest
from starlette import status
from typing import Dict
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.util.fns import compare_while_excluding
from app.db.crud import get_resume_experience, get_experience_unit, get_resume

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
                "experience:create",
                resume_id=1,
                target='leftOrder',
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
                "experience:update",
                experience_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


@pytest.fixture
def relisted_experience():
    return {"title": "updated_title", "id": 2, "resume_id": 2}


class TestExperience:
    async def test_create_experience_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("experience:create",
                             resume_id=2,
                             target='leftOrder'))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_experience_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("experience:update", experience_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_resume_experience_does_not_exist(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        assert not get_resume_experience(app.state._db, 2)

    async def test_create_experience_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will be created
        res = await client.post(
            app.url_path_for("experience:create",
                             resume_id=2,
                             target='leftOrder'), )
        assert res.json() == {
            "title":
            "",
            "units": [{
                'company_name': '',
                'company_name_enabled': True,
                'date_end': None,
                'date_start': None,
                'description': '',
                'description_enabled': True,
                'id': 2,
                'link': '',
                'link_enabled': True,
                'location': '',
                'location_enabled': True,
                'period_enabled': True,
                'title': ''
            }],
            "id":
            2,
            "resume_id":
            2,
            "order": [2]
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_create_experience_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience, experience_unit and order on experience were created
        resume = get_resume(app.state._db, 2)
        assert resume.experience
        assert resume.experience.order == [2]
        assert resume.meta['content']['full']['order'] == ['skills']
        assert resume.meta['content']['full']['unlisted'] == ['experience']
        assert resume.meta['content']['split']['unlisted'] == ['skills']
        assert resume.meta['content']['split']['leftOrder'] == ['experience']

    async def test_update_experience_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Check if request with invalid body is rejected
        res = await client.patch(
            app.url_path_for(
                "experience:update",
                experience_id=2,
            ),
            json={"title": []},
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
                "experience:update",
                experience_id=2,
            ),
            json={"title": "updated_title"},
        )
        assert res.json() == {
            "title": "updated_title",
            "id": 2,
            "order": [2],
            "resume_id": 2
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_create_experience_rejection_if_already_created(
        self,
        app: FastAPI,
        client: AsyncClient,
        relisted_experience: Dict,
    ) -> None:
        # Checks if request will be rejected if user already has experience
        res = await client.post(
            app.url_path_for(
                "experience:create",
                resume_id=2,
                target="leftOrder",
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_create_experience_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will not be created when user doesn't own the resume
        res = await client.post(
            app.url_path_for(
                "experience:create",
                resume_id=1,
                target="leftOrder",
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
                "experience:update",
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
                "experience:create-unit",
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
                "experience:update-unit",
                unit_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_delete_experience_unit_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if delete experience unit endpoint is available
        res = await client.delete(
            app.url_path_for(
                "experience:delete-unit",
                unit_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_reorganize_experience_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if reorganize experience endpoint is available
        res = await client.post(
            app.url_path_for(
                "experience:reorganize",
                experience_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestExperienceUnits:
    async def test_create_experience_unit_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for("experience:create-unit", experience_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_experience_unit_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("experience:update-unit", unit_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_delete_experience_unit_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.delete(
            app.url_path_for("experience:delete-unit", unit_id=2), )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_reorganize_experience_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "experience:reorganize",
                experience_id=2,
            ))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_create_experience_unit_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will be created
        res = await client.post(
            app.url_path_for("experience:create-unit", experience_id=2))
        proper_response = {
            "title": "",
            "id": 3,
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

    async def test_create_experience_unit_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience order has newly created unit id
        assert get_resume_experience(app.state._db, 2).order == [2, 3]

    async def test_reorganize_experience_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will be reorganized
        res = await client.post(
            app.url_path_for(
                "experience:reorganize",
                experience_id=2,
            ),
            json=[3, 2],
        )
        assert res.json() == [3, 2]
        assert res.status_code == status.HTTP_200_OK

    async def test_reorganize_experience_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience will not be reorganized
        res = await client.post(
            app.url_path_for(
                "experience:reorganize",
                experience_id=2,
            ),
            json=[3, 2, 1],
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST

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
                "experience:update-unit",
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
        # Checks if experience unit will be updated when correct data submitted and user owns experience unit
        update_data = {
            "title": "updated_title",
            "company_name": "updated_company_name",
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
                "experience:update-unit",
                unit_id=2,
            ),
            json=update_data,
        )
        assert compare_while_excluding(
            res.json(),
            update_data,
            {"date_start", "date_end", "id"},
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_resume_experience_unit_update(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        experience_unit = get_experience_unit(app.state._db, 2)
        assert experience_unit.title == "updated_title"
        assert experience_unit.company_name == "updated_company_name"
        assert experience_unit.description == "updated_description"

    async def test_create_experience_unit_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be created when user doesn't own the experience
        res = await client.post(
            app.url_path_for(
                "experience:create-unit",
                experience_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_experience_unit_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be updated when user doesn't own the experience unit
        res = await client.patch(
            app.url_path_for(
                "experience:update-unit",
                unit_id=1,
            ),
            json={},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_delete_experience_unit_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be deleted when user doesn't own the experience unit
        res = await client.delete(
            app.url_path_for(
                "experience:delete-unit",
                unit_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_delete_experience_unit_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will be deleted when user owns the experience unit
        res = await client.delete(
            app.url_path_for(
                "experience:delete-unit",
                unit_id=2,
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json() == 2

    async def test_resume_experience_unit_delete_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        assert get_experience_unit(app.state._db, 2) == None
        assert get_resume_experience(app.state._db, 2).order == [3]

    async def test_delete_experience_unit_response_on_single_unit(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if experience unit will not be deleted when its only experience unit assigned to experience
        res = await client.delete(
            app.url_path_for(
                "experience:delete-unit",
                unit_id=3,
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST
