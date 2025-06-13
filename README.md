# 📝 To-Do List App

A modern full-stack To-Do List application built with:

- ⚙️ **FastAPI** (Python) for backend
- 💻 **Next.js** + **Mantine** for frontend
- 🛠️ REST API integration between backend and frontend

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.10+
- Node.js 18+
- `npm` or `yarn`
- `virtualenv` or `venv` (recommended for backend)

---

## ⚙️ Backend (FastAPI)

### 📦 Setup & Run

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

pip install -r requirements.txt
uvicorn main:app --reload

🔌 API Endpoints (Example)
GET /tasks - Get all tasks

POST /tasks - Create a task

PUT /tasks/{id} - Update a task

DELETE /tasks/{id} - Delete a task

🔗 API Documentation
Swagger UI: http://localhost:8000/docs

Redoc: http://localhost:8000/redoc

💻 Frontend (Next.js + Mantine)
🧰 Setup & Run

cd frontend
npm install         # or yarn install
npm run dev         # or yarn dev

📍 Dev Server
App runs at: http://localhost:3000

🔗 Connect to Backend
If needed, create .env.local file in /frontend:

NEXT_PUBLIC_API_URL=http://localhost:8000

✅ Features
Create, update, and delete tasks

Multi-select and filtering

Beautiful responsive UI with Mantine

Fully typed and scalable codebase (TypeScript + Pydantic)
