from sqlalchemy.orm import Session
from .schemas import ServerResumeUpdate, Resume, ResumeFull
from ...db.crud import get_resume, update_resume
from ...util.fns import update_existing_resource


def update_unlisted_after_section_creation(db: Session, resume: ResumeFull,
                                           order: str, section: str):
    update_existing_resource(
        db,
        resume.id,
        ServerResumeUpdate(
            meta={
                "content": {
                    "split": {
                        "unlisted":
                        [*resume.meta["content"]["split"][order], section]
                    },
                    "full": {
                        "unlisted":
                        [*resume.meta["content"]["full"][order], section]
                    }
                }
            }),
        Resume,
        get_resume,
        update_resume,
    )
