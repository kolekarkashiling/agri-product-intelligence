from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from backend.services.supabase_service import get_supabase

router = APIRouter(prefix="/api", tags=["Schedules"])

class CropScheduleModel(BaseModel):
    crop_name: str
    rows: List[Dict[str, Any]]
    total_cost: Optional[float] = 0.0

@router.post("/schedules")
async def api_save_schedule(item: CropScheduleModel):
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not configured on backend")

    try:
        record = {
            "crop_name": item.crop_name,
            "rows": item.rows,
            "total_cost": item.total_cost
        }
        res = supabase.table("saved_schedules").insert([record]).execute()
        return {"success": True, "data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/schedules")
async def api_get_schedules():
    supabase = get_supabase()
    if not supabase:
        return {"success": False, "data": [], "message": "Supabase not configured"}

    try:
        res = supabase.table("saved_schedules").select("*").order("created_at", desc=True).execute()
        return {"success": True, "data": res.data or []}
    except Exception as e:
        return {"success": False, "data": [], "error": str(e)}
