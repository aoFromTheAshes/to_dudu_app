from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from backend.database import get_db
from backend.models.user import User
from backend.auth.auth import create_access_token
from datetime import timedelta
from passlib.context import CryptContext
from backend.config import GOOGLE_REDIRECT_URI

from starlette.requests import Request
from backend.auth.OAuth import oauth
import requests

from sqlmodel import SQLModel

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginData(SQLModel):
    email: str
    password: str

class RegisterData(SQLModel):
    email: str
    password: str

class GoogleAuthRequest(SQLModel):
    token: str

@router.post("/login")
def login_user(login_data: LoginData, db: Session = Depends(get_db)):
    # Шукаємо користувача за email
    user = db.exec(select(User).where(User.email == login_data.email)).first()
    
    # Якщо користувача не знайдено або пароль невірний
    if not user or not pwd_context.verify(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Неправильний email або пароль"
        )
    
    # Генеруємо токен доступу
    access_token = create_access_token({"sub": str(user.id)})
    
    return {
        "message": "Успішний вхід",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "email": user.email
        }
    }

@router.post("/register")
def register_user(register_data: RegisterData, db: Session = Depends(get_db)):
    existing_user = db.exec(select(User).where(User.email == register_data.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Користувач вже існує")
    
    hashed_password = pwd_context.hash(register_data.password)
    new_user = User(email=register_data.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Користувач успішно зареєстрований"}

@router.get("/google/login")
async def google_login(request: Request):
    return await oauth.google.authorize_redirect(request, GOOGLE_REDIRECT_URI)


@router.post("/google/callback")
async def google_callback(data: GoogleAuthRequest, db: Session = Depends(get_db)):
    google_verify_url = "https://oauth2.googleapis.com/tokeninfo"

    # Перевіряємо валідність токена Google
    response = requests.get(google_verify_url, params={"id_token": data.token})
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Помилка перевірки токена Google")
    
    user_info = response.json()
    google_id = user_info.get("sub")
    email = user_info.get("email")

    if not email or not google_id:
        raise HTTPException(status_code=400, detail="Некоректні дані користувача Google")

    # Шукаємо користувача в БД
    user = db.exec(select(User).where(User.email == email)).first()

    if not user:
        user = User(email=email, google_id=google_id, provider="google")
        db.add(user)
        db.commit()
        db.refresh(user)

    # Генеруємо свій JWT-токен
    access_token = create_access_token({"sub": str(user.id)})

    return {"message": "Успішний вхід", "access_token": access_token}
