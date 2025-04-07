from sqlmodel import SQLModel, Field
from typing import Optional
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    password: Optional[str] = None  # Для Google-юзерів може бути порожнім
    google_id: Optional[str] = Field(default=None, unique=True)  # ID від Google
    provider: str = Field(default="local")  # "local" або "google"

    def set_password(self, password: str):
        self.password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        if not self.password:
            return False  # Google-юзери не мають пароля
        return pwd_context.verify(password, self.password)
