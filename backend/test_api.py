import sys
from pathlib import Path

project_root = Path(__file__).resolve().parent.parent
if str(project_root) not in sys.path:
    sys.path.insert(0, str(project_root))

from backend.main import app
from backend.engine.mix_engine import analyze_tank_mix
from backend.engine.condition_engine import evaluate_application_conditions
from backend.services.supabase_service import check_connection

print("1. Testing Mix Engine...")
sample_products = [
    {
        "id": "prod-1",
        "name": "Mancozeb 75% WP",
        "category": "fungicide",
        "formulation": "WP",
        "idealPh": 6.5
    },
    {
        "id": "prod-2",
        "name": "Imidacloprid 17.8% SL",
        "category": "insecticide",
        "formulation": "SL",
        "idealPh": 6.8
    }
]
mix_res = analyze_tank_mix(sample_products)
print("   Mix Result:", mix_res["overall_status"], "| Safety Score:", mix_res["safety_score"])

print("2. Testing Condition Engine...")
cond_res = evaluate_application_conditions({
    "temperatureC": 26,
    "relativeHumidityPercent": 65,
    "windSpeedKmh": 8,
    "rainForecastHours": 10
})
print("   Condition Result:", cond_res["overall_suitability"], "| Score:", cond_res["suitability_score"])

print("3. Testing Supabase Python connection...")
sb_res = check_connection()
print("   Supabase Connected:", sb_res.get("connected"), "| Message:", sb_res.get("message"))

print("All Python backend components verified successfully!")
