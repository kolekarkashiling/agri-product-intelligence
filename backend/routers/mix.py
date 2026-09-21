from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from backend.engine.mix_engine import analyze_tank_mix
from backend.services.supabase_service import get_supabase

router = APIRouter(prefix="/api", tags=["Mix Analyzer"])

class AnalyzeMixRequest(BaseModel):
    products: List[Dict[str, Any]]

class SaveMixRequest(BaseModel):
    mix_name: str
    overall_status: str
    safety_score: int
    products: List[Dict[str, Any]]
    critical_warnings: Optional[List[str]] = Field(default_factory=list)
    conditional_notes: Optional[List[str]] = Field(default_factory=list)
    notes: Optional[str] = None

@router.post("/analyze-mix")
async def api_analyze_mix(req: AnalyzeMixRequest):
    result = analyze_tank_mix(req.products)
    return result

@router.post("/save-mix")
async def api_save_mix(req: SaveMixRequest):
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase is not configured on the backend.")

    record = {
        "mix_name": req.mix_name,
        "overall_status": req.overall_status,
        "safety_score": req.safety_score,
        "products": req.products,
        "critical_warnings": req.critical_warnings,
        "conditional_notes": req.conditional_notes,
        "notes": req.notes
    }

    try:
        res = supabase.table("saved_tank_mixes").insert([record]).execute()
        return {"success": True, "data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.get("/saved-mixes")
async def api_get_saved_mixes():
    supabase = get_supabase()
    if not supabase:
        return {"success": False, "data": [], "message": "Supabase not configured"}

    try:
        res = supabase.table("saved_tank_mixes").select("*").order("created_at", desc=True).execute()
        return {"success": True, "data": res.data or []}
    except Exception as e:
        return {"success": False, "data": [], "error": str(e)}

@router.delete("/saved-mixes/{mix_id}")
async def api_delete_saved_mix(mix_id: str):
    supabase = get_supabase()
    if not supabase:
        raise HTTPException(status_code=503, detail="Supabase not configured")

    try:
        res = supabase.table("saved_tank_mixes").delete().eq("id", mix_id).execute()
        return {"success": True, "data": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
