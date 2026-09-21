@echo off
echo Starting Agri Product Intelligence Python FastAPI Backend...
backend\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload --reload-dir backend
pause
