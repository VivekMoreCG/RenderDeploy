# Render Sample

A lightweight full-stack starter with a Python FastAPI API and a React frontend built with Vite.

## Prerequisites

- Python 3.10 or newer
- Node.js 20.19+ or 22.12+

## Run the API

From the `backend` folder, create and activate a virtual environment, then install the requirements:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`; interactive API docs are at `http://localhost:8000/docs`.

## Run the frontend

Open a second terminal in `frontend` and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The page fetches `/api/message` from the Python API. Set `VITE_API_URL` if the API is hosted at a different address.
