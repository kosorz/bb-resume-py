from sqlalchemy.orm import Session
from fastapi import Depends, status, HTTPException
from jose import JWTError, jwt

from .schemas import User, TokenData
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
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user