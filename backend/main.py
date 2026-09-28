from math import sqrt

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Render Sample API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/message")
def get_sample_message() -> dict[str, object]:
    return {
        "eyebrow": "A small full-stack starting point",
        "title": "Your Python API is connected.",
        "description": "This sample response came from FastAPI and was rendered by React.",
        "items": [
            {"number": "01", "label": "Python", "detail": "FastAPI service"},
            {"number": "02", "label": "React", "detail": "Vite-powered interface"},
            {"number": "03", "label": "Local", "detail": "Ready to make your own"},
        ],
    }


@app.get("/api/square-root")
def calculate_square_root(number: float = Query(ge=0)) -> dict[str, float]:
    return {"number": number, "square_root": sqrt(number)}
