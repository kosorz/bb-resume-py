from sqlalchemy.orm import Session
from fastapi import Depends, status, HTTPException
from jose import JWTError, jwt

from .schemas import User, TokenData, Resume
from ...database import crud
from ...database.db import get_db as db
from .auth_config import SECRET_KEY, ALGORITHM, oauth2_scheme


def get_current_user(token: str = Depends(oauth2_scheme),
                     db: Session = Depends(db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Unauthorized",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Bad request")
    return current_user


def get_requested_resume(resume_id: str, db: Session = Depends(db)):
    requested_resume = crud.get_resume(db, resume_id)
    if not requested_resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found")
    return requested_resume


def get_owned_resume(requested_resume: Resume = Depends(get_requested_resume),
                     db: Session = Depends(db),
                     current_user: User = Depends(get_current_active_user)):
    if not requested_resume.owner_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden",
        )

    return requested_resume
