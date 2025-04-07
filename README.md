# 📝 ToDo List App

A fullstack ToDo List application built with **FastAPI** and **React**.

## 🚀 Technologies Used

### Backend:
- Python
- FastAPI
- SQLModel
- OAuth2 (Google Authentication)
- PostgreSQL

### Frontend:
- React
- JavaScript
- Vite

## ⚙️ Running Locally

### 1. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload

cd frontend
npm install
npm run dev

🔐 Features
Register / Login with Google

Create, update, delete tasks

User authentication

Full API with FastAPI


📦 Environment Variables
Create a .env file in the backend/ folder with the following:
DATABASE_URL=your_postgres_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret


👨‍💻 Author
GitHub: @aoFromTheAshes