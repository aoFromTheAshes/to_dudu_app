from fastapi import FastAPI
from .routers.tasks import router
from .database import get_db
from fastapi.middleware.cors import CORSMiddleware

from backend.database import create_tables
from backend.routers.users import router as auth_router
from backend.create_tables import create_all_tables

create_all_tables()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Дозволяємо запити з фронта
    allow_credentials=True,
    allow_methods=["*"],  # Дозволяємо всі методи (GET, POST, DELETE тощо)
    allow_headers=["*"],  # Дозволяємо всі заголовки
)

@app.on_event("startup")
def startup():
    get_db()  # Створення таблиць

app.include_router(router)
app.include_router(auth_router)

@app.get("/")
def home():
    return {"message": "Welcome to To-Do API"}
