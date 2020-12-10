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
                "info:update",
                resume_id=1,
            ),
            json={},
        )
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_photo_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update photo endpoint is available
        res = await client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_cropped_photo_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if update photo endpoint is available
        res = await client.patch(
            app.url_path_for(
                "info:update-cropped-photo",
                resume_id=1,
            ))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_delete_photo_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if delete photo endpoint is available
        res = await client.delete(
            app.url_path_for(
                "info:delete-photo",
                resume_id=1,
            ))
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
            app.url_path_for("info:update", resume_id=2),
            json=info_update,
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_photo_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("info:update-photo", resume_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_cropped_photo_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("info:update-cropped-photo", resume_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_delete_photo_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.delete(
            app.url_path_for("info:delete-photo", resume_id=2))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_photo_validation(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        txt_file,
    ) -> None:
        # Checks if photo not will be updated when incorrect file type is submitted
        res = await base_client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=2,
            ),
            files={"f": txt_file},
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_cropped_photo_no_base_validation(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if cropped photo not will be updated when there's no base photo
        res = await base_client.patch(
            app.url_path_for(
                "info:update-cropped-photo",
                resume_id=2,
            ),
            data={
                "photo_settings":
                '{"rotation":0,"width":354,"height":354,"x":337,"y":111}'
            },
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_update_resume_info_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if info will not be updated when no key matches the resume stored
        res = await client.patch(
            app.url_path_for(
                "info:update",
                resume_id=2,
            ),
            json={"not_existing_key": "nothing"},
        )
        assert res.json() == {
            "cropped_photo": "",
            "name": "string",
            "id": 2,
            "resume_id": 2,
            "phone": "",
            "link": "",
            "email": "",
            "location": "",
            "role": "",
            "phone_enabled": True,
            "photo": "",
            "photo_enabled": True,
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
                "info:update",
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
                "info:update",
                resume_id=2,
            ),
            json={
                "phone": "updated_string",
                "link": "https://heeeeeeeey.com/",
                "email": "kosorz.artur@gmail.com",
                "location": "updated_string",
                "role": "updated_string",
                "phone_enabled": False,
                "photo": "",
                "photo_enabled": True,
                "link_enabled": False,
                "email_enabled": False,
                "location_enabled": False,
                "role_enabled": False
            },
        )
        assert res.json() == {
            'cropped_photo': '',
            "name": "string",
            "id": 2,
            "resume_id": 2,
            "phone": "updated_string",
            "link": "https://heeeeeeeey.com/",
            "email": "kosorz.artur@gmail.com",
            "location": "updated_string",
            "role": "updated_string",
            "photo": "",
            "photo_enabled": True,
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

    async def test_update_photo_with_jpeg(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if photo will be updated when correct data submitted and user owns resume
        res = await base_client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=2,
            ),
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_update_photo_with_png(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        png_file,
    ) -> None:
        # Checks if photo will be updated when correct data submitted and user owns resume
        res = await base_client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=2,
            ),
            files={"f": png_file},
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_update_photo_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks outcome of photo update
        info = get_resume_info(app.state._db, 2)
        assert info.photo

    async def test_update_cropped_photo_rotation_validation(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if cropped photo not will be updated when invalid rotation requested
        res = await base_client.patch(
            app.url_path_for(
                "info:update-cropped-photo",
                resume_id=2,
            ),
            data={
                "photo_settings":
                '{"rotation":1,"width":354,"height":354,"x":337,"y":111}'
            },
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_cropped_photo_file_validation(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        txt_file,
    ) -> None:
        # Checks if cropped photo not will be updated when invalid rotation requested
        res = await base_client.patch(
            app.url_path_for(
                "info:update-cropped-photo",
                resume_id=2,
            ),
            data={
                "photo_settings":
                '{"rotation":0,"width":354,"height":354,"x":337,"y":111}'
            },
            files={"f": txt_file},
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_update_cropped_photo(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if cropped photo will be updated when settins correct and base photo present
        res = await base_client.patch(
            app.url_path_for(
                "info:update-cropped-photo",
                resume_id=2,
            ),
            data={
                "photo_settings":
                '{"rotation":0,"width":354,"height":354,"x":337,"y":111}'
            },
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_update_cropped_photo_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks outcome of cropped photo update
        info = get_resume_info(app.state._db, 2)
        assert info.cropped_photo

    async def test_delete_photo(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if photos will be deleted when correct data submitted and user owns resume
        res = await client.delete(
            app.url_path_for(
                "info:delete-photo",
                resume_id=2,
            ))
        assert res.status_code == status.HTTP_200_OK

    async def test_re_delete_photo(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if request will be rejected when theres no photo
        res = await client.delete(
            app.url_path_for(
                "info:delete-photo",
                resume_id=2,
            ))
        assert res.status_code == status.HTTP_400_BAD_REQUEST

    async def test_delete_photo_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks outcome of photo delete
        info = get_resume_info(app.state._db, 2)
        assert not info.photo
        assert not info.cropped_photo

    async def test_update_resume_info_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if info will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "info:update",
                resume_id=1,
            ),
            json={"title": "updated_string"},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_photo_access(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if photo will not be updated when user doesn't own the resume
        res = await base_client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=1,
            ),
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_update_cropped_photo_access(
        self,
        app: FastAPI,
        base_client: AsyncClient,
        jpeg_file,
    ) -> None:
        # Checks if cropped photo will not be updated when user doesn't own the resume
        res = await base_client.patch(
            app.url_path_for(
                "info:update-photo",
                resume_id=1,
            ),
            files={"f": jpeg_file},
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_delete_photo_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if photo will not be deleted when user doesn't own the resume
        res = await client.delete(
            app.url_path_for(
                "info:delete-photo",
                resume_id=1,
            ))
        assert res.status_code == status.HTTP_403_FORBIDDEN
