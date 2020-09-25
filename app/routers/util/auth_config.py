from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "bc01f6cece24df9cf151e5f772618bba6f0a1ee0ba8bb5ff286d29204f6c1e26"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")