import pytest
from typing import Dict
from starlette import status
from httpx import AsyncClient
from fastapi import FastAPI

from app.util.deps import get_current_user
from app.db.crud import get_resume

pytestmark = pytest.mark.asyncio


class TestResumesRoutes:
    async def test_create_resume_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users endpoint is available
        res = await client.post(app.url_path_for("resumes:create"))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_get_resume_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.get(app.url_path_for("resumes:get", resume_id=1))
        assert res.status_code != status.HTTP_404_NOT_FOUND

    async def test_update_resume_endpoint_existence(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if get users me endpoint is available
        res = await client.patch(
            app.url_path_for("resumes:update", resume_id=1))
        assert res.status_code != status.HTTP_404_NOT_FOUND


class TestResumes:
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
            app.url_path_for("resumes:create"),
            json=new_resume,
        )
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_update_resume_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.patch(
            app.url_path_for("resumes:update", resume_id=1))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_get_resume_authorization_check(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Replace get_current_user dependency override with it's genuine counterpart
        app.dependency_overrides[get_current_user] = get_current_user

        # Checks if request will be rejected if user is not authorized
        res = await client.get(app.url_path_for("resumes:get", resume_id=1))
        assert res.status_code == status.HTTP_401_UNAUTHORIZED

    async def test_create_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if create resume endpoint properly validates data
        res = await client.post(app.url_path_for("resumes:create"))
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    async def test_create_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        new_resume = {"title": "string"}
        # Checks if resume will be created when correct data submitted
        res = await client.post(
            app.url_path_for("resumes:create"),
            json=new_resume,
        )
        assert res.json() == {
            "title": "string",
            "id": 2,
            "meta": {
                "colors": {
                    "main": "#038cff",
                    "secondary": "#000000"
                },
                "fontSize": {
                    "small": 11,
                    "main": 13,
                    "medium": 16,
                    "large": 22,
                    "big": 38
                },
                "photoSettings": {
                    "x": 0,
                    "y": 0,
                    "width": 0,
                    "height": 0,
                    "rotation": 0,
                },
                "paper": {
                    "size": "A4",
                    "space": 50,
                    "layout": "split"
                },
                "fontFamily": "Roboto",
                "template": "classic",
                "background": "X-parts",
                "content": {
                    "split": {
                        "mainOrder": [],
                        "secondaryOrder": [],
                        "unlisted": [],
                    },
                    "full": {
                        "order": [],
                        "unlisted": [],
                    }
                }
            },
            "owner_id": 2,
            "deleted": False
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_get_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if received resume will be appropriate and will have it's related keys
        res = await client.get(app.url_path_for("resumes:get", resume_id=2))
        assert res.json() == {
            "title": "string",
            "id": 2,
            "owner_id": 2,
            "deleted": False,
            "skills": None,
            "experience": None,
            "meta": {
                "colors": {
                    "main": "#038cff",
                    "secondary": "#000000"
                },
                "fontSize": {
                    "small": 11,
                    "main": 13,
                    "medium": 16,
                    "large": 22,
                    "big": 38
                },
                "photoSettings": {
                    "x": 0,
                    "y": 0,
                    "width": 0.0,
                    "height": 0.0,
                    "rotation": 0,
                },
                "paper": {
                    "size": "A4",
                    "space": 50,
                    "layout": "split"
                },
                "fontFamily": "Roboto",
                "template": "classic",
                "background": "X-parts",
                "content": {
                    "split": {
                        "mainOrder": [],
                        "secondaryOrder": [],
                        "unlisted": [],
                    },
                    "full": {
                        "order": [],
                        "unlisted": [],
                    }
                }
            },
            "info": {
                "name": "",
                "id": 2,
                "resume_id": 2,
                "phone": "",
                "link": "",
                "email": "test@email.com",
                "cropped_photo": "",
                "quote": "",
                "location": "",
                "photo": "",
                "photo_enabled": True,
                "photo_locked": False,
                "role": "",
                "phone_enabled": True,
                "link_enabled": True,
                "email_enabled": True,
                "location_enabled": True,
                "role_enabled": True,
                "quote_enabled": True
            }
        }
        assert res.status_code == status.HTTP_200_OK

    async def test_update_resume_not_existing_key(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will not be updated when no key matches the resume stored
        res = await client.patch(
            app.url_path_for(
                "resumes:update",
                resume_id=2,
            ),
            json={"not_existing_key": "nothing"},
        )
        assert res.json() == {
            "title": "string",
            "id": 2,
            "meta": {
                "colors": {
                    "main": "#038cff",
                    "secondary": "#000000"
                },
                "fontSize": {
                    "small": 11,
                    "main": 13,
                    "medium": 16,
                    "large": 22,
                    "big": 38
                },
                "photoSettings": {
                    "x": 0,
                    "y": 0,
                    "width": 0,
                    "height": 0,
                    "rotation": 0,
                },
                "paper": {
                    "size": "A4",
                    "space": 50,
                    "layout": "split"
                },
                "fontFamily": "Roboto",
                "template": "classic",
                "background": "X-parts",
                "content": {
                    "split": {
                        "mainOrder": [],
                        "secondaryOrder": [],
                        "unlisted": [],
                    },
                    "full": {
                        "order": [],
                        "unlisted": [],
                    }
                }
            },
            "owner_id": 2,
            "deleted": False
        }
        assert res.status_code == status.HTTP_200_OK

    @pytest.mark.parametrize("body", ({
        "deleted": "not boolean value"
    }, {
        "meta": {
            "colors": {
                "main": "not a hex"
            }
        },
    }, {
        "meta": {
            "colors": {
                "secondary": "not a hex"
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "small": 9
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "small": 13
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "main": 12
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "main": 15
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "medium": 14
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "medium": 18
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "large": 19
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "large": 25
            }
        },
    }, {
        "meta": {
            "fontSize": {
                "big": 30
            }
        },
    }, {
        "meta": {
            "fontFamily": "not roboto"
        },
    }, {
        "meta": {
            "template": "not classic"
        },
    }, {
        "meta": {
            "background": "not background"
        },
    }, {
        "meta": {
            "paper": {
                "size": "not A4",
            }
        },
    }, {
        "meta": {
            "paper": {
                "space": 30
            }
        },
    }, {
        "meta": {
            "paper": {
                "layout": "not_full_not_split",
            }
        },
    }))
    async def test_update_resume_validation(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "resumes:update",
                resume_id=2,
            ),
            json=body,
        )
        assert res.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY

    @pytest.mark.parametrize("body", (
        {
            "deleted": True
        },
        {
            "title": "updated_string"
        },
        {
            "meta": {
                "colors": {
                    "main": "#038cff"
                }
            },
        },
        {
            "meta": {
                "colors": {
                    "secondary": "#1f1f1f"
                }
            },
        },
        {
            "meta": {
                "fontSize": {
                    "small": 10
                }
            },
        },
        {
            "meta": {
                "fontSize": {
                    "main": 14
                }
            },
        },
        {
            "meta": {
                "fontSize": {
                    "medium": 16
                }
            },
        },
        {
            "meta": {
                "fontSize": {
                    "large": 20
                }
            },
        },
        {
            "meta": {
                "fontSize": {
                    "big": 42
                }
            },
        },
        {
            "meta": {
                "template": "classic",
            },
        },
        {
            "meta": {
                "fontFamily": "Roboto"
            },
        },
        {
            "meta": {
                "background": "X-parts",
            },
        },
        {
            "meta": {
                "paper": {
                    "size": "A4",
                }
            },
        },
        {
            "meta": {
                "paper": {
                    "space": 40
                }
            },
        },
        {
            "meta": {
                "paper": {
                    "layout": "full",
                }
            },
        },
    ))
    async def test_update_resume_response(
        self,
        app: FastAPI,
        client: AsyncClient,
        body: Dict,
    ) -> None:
        # Checks if request will be rejected when invalid data submitted
        res = await client.patch(
            app.url_path_for(
                "resumes:update",
                resume_id=2,
            ),
            json=body,
        )
        assert res.status_code == status.HTTP_200_OK

    async def test_update_resume_outcome(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will be updated when correct data submitted and user owns resume
        resume = get_resume(app.state._db, 2)
        assert resume.title == "updated_string"
        assert resume.deleted == True
        assert resume.meta["colors"]["main"] == "#038cff"
        assert resume.meta["colors"]["secondary"] == "#1f1f1f"
        assert resume.meta["fontSize"]["small"] == 10
        assert resume.meta["fontSize"]["main"] == 14
        assert resume.meta["fontSize"]["medium"] == 16
        assert resume.meta["fontSize"]["large"] == 20
        assert resume.meta["template"] == "classic"
        assert resume.meta["fontSize"]["big"] == 42
        assert resume.meta["fontFamily"] == "Roboto"
        assert resume.meta["background"] == "X-parts"
        assert resume.meta["paper"]["size"] == "A4"
        assert resume.meta["paper"]["space"] == 40
        assert resume.meta["paper"]["layout"] == "full"

    async def test_update_resume_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will not be updated when user doesn't own the resume
        res = await client.patch(
            app.url_path_for(
                "resumes:update",
                resume_id=1,
            ),
            json={
                "deleted": True,
                "title": "updated_string"
            },
        )
        assert res.status_code == status.HTTP_403_FORBIDDEN

    async def test_get_resume_access(
        self,
        app: FastAPI,
        client: AsyncClient,
    ) -> None:
        # Checks if resume will not be presented when user doesn't own the resume
        res = await client.get(app.url_path_for(
            "resumes:get",
            resume_id=1,
        ))
        assert res.status_code == status.HTTP_403_FORBIDDEN
