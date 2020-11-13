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
                "resumes:list-resume-section",
                resume_id=2,
                section='experience',
                column='order',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_unlist_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-resume-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_move_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:

        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='skills',
                direction='down',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_migrate_resume_section_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.post(
            app.url_path_for(
                "resumes:migrate-resume-section",
                resume_id=1,
                section='experience',
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestResumes:
    async def test_move_resume_section_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=1,
                section='experience',
                direction='up',
            ))
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
                "resumes:migrate-resume-section",
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
                "resumes:unlist-resume-section",
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
                "resumes:list-resume-section",
                resume_id=2,
                section='experience',
                column='rightOrder',
            ))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_move_full_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if move will be rejected if section is first in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='up',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_move_full_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if move will be made if section is not last in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='down',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['skills', 'experience']

        # Checks if move will be made if section is not first in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='up',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['experience', 'skills']

    async def test_list_full_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is not unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:list-resume-section",
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
                "resumes:unlist-resume-section",
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
                "resumes:unlist-resume-section",
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
                "resumes:list-resume-section",
                resume_id=2,
                section='experience',
                column='order',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['full']['order'] == ['skills', 'experience']

    async def test_switching_layout(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        res = await client.patch(
            app.url_path_for(
                "resumes:update-resume",
                resume_id=2,
            ),
            json={"meta": {
                "paper": {
                    "layout": "split",
                }
            }})
        assert res.status_code == status.HTTP_200_OK

    async def test_move_split_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if move will be rejected if section is first in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='up',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

        # Checks if move will be rejected if section is last in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='down',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_list_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks section will be listed in relevant order
        res = await client.post(
            app.url_path_for(
                "resumes:list-resume-section",
                resume_id=2,
                section='skills',
                column='leftOrder',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['leftOrder'] == ['experience', 'skills']

    async def test_list_split_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is already listed
        res = await client.post(
            app.url_path_for(
                "resumes:list-resume-section",
                resume_id=2,
                section='skills',
                column='leftOrder',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_move_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if move will be made if section is not last in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='down',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['leftOrder'] == ['skills', 'experience']

        # Checks if move will be made if section is not first in order
        res = await client.post(
            app.url_path_for(
                "resumes:move-resume-section",
                resume_id=2,
                section='experience',
                direction='up',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['leftOrder'] == ['experience', 'skills']

    async def test_migrate_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if section will be migrated
        res = await client.post(
            app.url_path_for(
                "resumes:migrate-resume-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['leftOrder'] == ['skills']
        assert res.json()['split']['rightOrder'] == ['experience']

    async def test_unlist_split_resume_section_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if section will be unlisted
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-resume-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_200_OK

        res = await client.post(
            app.url_path_for(
                "resumes:unlist-resume-section",
                resume_id=2,
                section='skills',
            ))
        assert res.status_code == status.HTTP_200_OK
        assert res.json()['split']['rightOrder'] == []
        assert res.json()['split']['unlisted'] == ['experience', 'skills']

    async def test_unlist_split_resume_section_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected if section is not listed
        res = await client.post(
            app.url_path_for(
                "resumes:unlist-resume-section",
                resume_id=2,
                section='experience',
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST