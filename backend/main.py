import sys
from pathlib import Path

# Add project root to sys.path so backend modules can import cleanly
project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.services.supabase_service import check_connection, is_configured
from backend.routers import mix, conditions, schedules

app = FastAPI(
    title="Agri Product Intelligence API",
    description="Python FastAPI backend powering agricultural tank mix analysis, weather suitability, and Supabase integration.",
    version="1.0.0"
)

# Enable CORS for Vite dev server and production clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(mix.router)
app.include_router(conditions.router)
app.include_router(schedules.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Agri Product Intelligence Python Backend",
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    supabase_status = check_connection()
    return {
        "status": "healthy",
        "backend": "python-fastapi",
        "supabase_configured": is_configured(),
        "supabase": supabase_status
    }

if __name__ == "__main__":
    import uvicorn
    print("[INFO] Starting FastAPI server on http://127.0.0.1:8000 ...")
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
