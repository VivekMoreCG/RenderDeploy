# Workspace Guide

This workspace contains a FastAPI backend in `backend/` and a React/Vite frontend in `frontend/`.

- Keep API routes under `/api` and preserve CORS access for the local Vite development server.
- Start the backend from `backend/` with `uvicorn main:app --reload`.
- Start the frontend from `frontend/` with `npm run dev`.
- The frontend expects the backend at `http://localhost:8000` unless `VITE_API_URL` is set.
- Update `README.md` when run or setup steps change.
