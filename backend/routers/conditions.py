from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Any
from backend.engine.condition_engine import evaluate_application_conditions

router = APIRouter(prefix="/api", tags=["Condition Analyzer"])

class WeatherConditionInputModel(BaseModel):
    crop: str = "General Crop"
    growthStage: str = "Vegetative"
    temperatureC: float = 25.0
    relativeHumidityPercent: float = 60.0
    windSpeedKmh: float = 8.0
    rainForecastHours: float = 12.0
    soilMoisture: str = "optimal"
    irrigationMethod: str = "foliar"
    waterPh: float = 6.8
    waterHardnessPpm: float = 150.0

@router.post("/analyze-conditions")
async def api_analyze_conditions(input_data: WeatherConditionInputModel):
    result = evaluate_application_conditions(input_data.model_dump())
    return result
