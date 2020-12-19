import pytest
from typing import Dict
from starlette import status
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.db.crud import get_resume

pytestmark = pytest.mark.asyncio


class TestResumesRoutes:
    async def test_list_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='experience',
                column='order',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_delete_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.delete(
            app.url_path_for(
                "resumes:delete-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_unlist_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_reorganize_resume_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column='mainOrder',
            ),
            json=["skills", "experience"],
        )
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_migrate_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:migrate-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestResumes:
    async def test_reorganize_resume_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column='mainOrder',
            ),
            json=["skills", "experience"],
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_migrate_resume_section_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "resumes:migrate-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_unlist_resume_section_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_list_resume_section_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='experience',
                column="secondaryOrder",
            ))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_reorganize_full_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if reorganize will be rejected
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column="mainOrder",
            ),
            json=["skills", "experience", "other"],
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_reorganize_full_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will be made reorganized
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column="order",
            ),
            json=["skills", "experience"],
        )
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['skills', 'experience']

    async def test_list_full_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is not unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='experience',
                column='order',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_unlist_full_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if section will be unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['skills']
        assert res.json()['full']['unlisted'] == ['experience']

    async def test_unlist_full_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is not listed
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_list_full_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if section will be listed
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='experience',
                column='order',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['skills', 'experience']
        # Checks if section will be unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='experience',
            ))
        # Checks if section will be unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='skills',
            ))
        assert res.json()['full']['unlisted'] == ['experience', 'skills']

    async def test_switching_layout(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.patch(
            app.url_path_for(
                "resumes:update",
                resume_id=2,
            ),
            json={"meta": {
                "paper": {
                    "layout": "split",
                }
            }})
        assert res.status_code == status.HTTP_200_OK

    async def test_reorganize_split_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if reorganize will be rejected
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column="secondaryOrder",
            ),
            json=["skills", "experience", "other"],
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_list_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks section will be listed in relevant order
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='skills',
                column='mainOrder',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['mainOrder'] == ['experience', 'skills']

    async def test_list_split_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is already listed
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=2,
                section='skills',
                column='mainOrder',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_reorganize_split_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=2,
                column="mainOrder",
            ),
            json=["skills", "experience"],
        )
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['mainOrder'] == ['skills', 'experience']

    async def test_migrate_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if section will be migrated
        res = await client.post(
            app.url_path_for(
                "resumes:migrate-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['mainOrder'] == ['skills']
        assert res.json()['split']['secondaryOrder'] == ['experience']

    async def test_delete_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if delete will be rejected if section is listed somewhere
        res = await client.delete(
            app.url_path_for(
                "resumes:delete-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_unlist_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if sections will be unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK

        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='skills',
            ))
        assert res.status_code == status.HTTP_200_OK

        assert res.json()['split']['secondaryOrder'] == []
        assert res.json()['split']['unlisted'] == ['experience', 'skills']

    async def test_delete_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if delete will be successfull
        res = await client.delete(
            app.url_path_for(
                "resumes:delete-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK

    async def test_re_delete_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if already deleted
        res = await client.delete(
            app.url_path_for(
                "resumes:delete-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_unlist_split_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is not listed
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=2,
                section='skills',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_list_resume_section_endpoint_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:list-section",
                resume_id=1,
                section='experience',
                column='order',
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_delete_resume_section_endpoint_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.delete(
            app.url_path_for(
                "resumes:delete-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_unlist_resume_section_endpoint_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_reorganize_resume_endpoint_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:reorganize",
                resume_id=1,
                column="mainOrder",
            ),
            json=["skills", "experience"],
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN