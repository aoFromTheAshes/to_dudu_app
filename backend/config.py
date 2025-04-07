from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=r"C:\Users\vchep\Desktop\SEXY_codes\ToDoList\backend\.env")


DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASS = os.environ.get("DB_PASS")

GOOGLE_CLIENT_ID = os.environ.get('CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
GOOGLE_REDIRECT_URI = "http://127.0.0.1:8000/auth/google/callback"


# print(f"DB_HOST: {DB_HOST}, DB_PORT: {DB_PORT}, DB_NAME: {DB_NAME}, DB_USER: {DB_USER}, DB_PASS: {DB_PASS}")