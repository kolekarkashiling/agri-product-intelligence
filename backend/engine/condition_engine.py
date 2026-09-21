import math
from typing import Dict, Any, List

def calculate_delta_t(temp_c: float, rh_percent: float) -> float:
    T = temp_c
    RH = rh_percent

    # Stull's empirical formula for wet bulb temperature
    tw = (
        T * math.atan(0.151977 * math.pow(RH + 8.313659, 0.5)) +
        math.atan(T + RH) -
        math.atan(RH - 1.676331) +
        0.00391838 * math.pow(RH, 1.5) * math.atan(0.023101 * RH) -
        4.686035
    )
    delta_t = T - tw
    return max(0.0, round(delta_t, 1))


def evaluate_application_conditions(data: Dict[str, Any]) -> Dict[str, Any]:
    temp_c = float(data.get("temperatureC", 25.0))
    rh_percent = float(data.get("relativeHumidityPercent", 60.0))
    wind_kmh = float(data.get("windSpeedKmh", 8.0))
    rain_hours = float(data.get("rainForecastHours", 12.0))
    water_ph = float(data.get("waterPh", 6.8))
    water_hardness = float(data.get("waterHardnessPpm", 150.0))
    soil_moisture = str(data.get("soilMoisture", "optimal")).lower()
    irrigation_method = str(data.get("irrigationMethod", "foliar")).lower()

    recommendations: List[str] = []
    contraindications: List[str] = []
    water_quality_issues: List[str] = []

    score = 100

    # 1. Delta T
    delta_t = calculate_delta_t(temp_c, rh_percent)
    if delta_t < 2:
        delta_t_status = "marginal_low"
        score -= 10
        recommendations.append(
            f"Delta T is low ({delta_t}°C) due to high humidity ({rh_percent}%). Spray droplets dry slowly, potentially elevating disease risk if foliage remains wet overnight."
        )
    elif 2 <= delta_t <= 8:
        delta_t_status = "ideal"
        recommendations.append(f"Delta T ({delta_t}°C) is in the OPTIMAL zone (2°C - 8°C). Ideal droplet survival and cuticular absorption.")
    elif 8 < delta_t <= 10:
        delta_t_status = "marginal_high"
        score -= 20
        contraindications.append(
            f"Delta T is high ({delta_t}°C). Fine spray droplets will evaporate quickly before absorption. Use coarse droplets or anti-evaporation adjuvant."
        )
    else:
        delta_t_status = "poor_evaporation"
        score -= 40
        contraindications.append(
            f"Delta T is critical ({delta_t}°C > 10°C). Extreme droplet evaporation causes premature crystallization and wasted chemical."
        )

    # 2. Temperature
    if temp_c > 35:
        score -= 30
        contraindications.append(f"High temperature ({temp_c}°C). Foliar spray risks leaf burn and rapid stomatal shutdown.")
    elif temp_c < 12:
        score -= 20
        contraindications.append(f"Low temperature ({temp_c}°C). Plant metabolic activity and chemical absorption are severely slowed.")

    # 3. Wind & Drift Risk
    if wind_kmh < 3:
        drift_risk = "moderate"
        score -= 10
        recommendations.append("Calm wind (<3 km/h). Beware of thermal inversion holding fine spray droplets aloft.")
    elif 3 <= wind_kmh <= 15:
        drift_risk = "low"
        recommendations.append(f"Wind speed is optimal ({wind_kmh} km/h) for uniform crop canopy penetration.")
    elif 15 < wind_kmh <= 20:
        drift_risk = "high"
        score -= 25
        contraindications.append(f"High wind speed ({wind_kmh} km/h). Severe drift risk onto non-target vegetation.")
    else:
        drift_risk = "severe"
        score -= 50
        contraindications.append(f"Severe wind ({wind_kmh} km/h > 20 km/h). DO NOT SPRAY. Extreme drift hazard.")

    # 4. Rainfast Risk
    if rain_hours <= 2:
        rainfast_risk = "washout_imminent"
        score -= 45
        contraindications.append(f"Rain expected within {rain_hours}h. Chemical film will be washed off before uptake.")
    elif 2 < rain_hours <= 4:
        rainfast_risk = "borderline"
        score -= 15
        recommendations.append(f"Rain window is tight ({rain_hours}h). Add a silicone sticker to accelerate rainfastness.")
    else:
        rainfast_risk = "safe"
        recommendations.append(f"Good rainfastness window ({rain_hours}+ hours dry weather).")

    # 5. Water Quality
    if water_ph > 7.8:
        score -= 15
        water_quality_issues.append(f"Alkaline water (pH {water_ph}). Organophosphates, pyrethroids, and PGRs suffer alkaline hydrolysis. Acidify to pH 6.0 - 6.5.")
    elif water_ph < 5.0:
        score -= 10
        water_quality_issues.append(f"Acidic water (pH {water_ph}). Copper compounds dissolve excessively fast, raising phytotoxicity risk.")

    if water_hardness > 250:
        score -= 15
        water_quality_issues.append(f"Hard water ({water_hardness} ppm CaCO3). Divalent cations inactivate glyphosate and weaken emulsifiers.")

    # 6. Soil Moisture & Method
    if soil_moisture == "dry" and irrigation_method == "drip":
        recommendations.append("Pre-irrigate with plain water for 30 minutes before fertigating to prevent root osmotic shock.")
    elif soil_moisture == "waterlogged":
        score -= 15
        contraindications.append("Waterlogged soil. Roots lack oxygen; avoid heavy drenching or fertigation.")

    score = max(0, min(100, score))

    if score < 45 or drift_risk == "severe" or rainfast_risk == "washout_imminent":
        overall_suitability = "avoid"
    elif score < 70:
        overall_suitability = "caution"
    elif score < 85:
        overall_suitability = "suitable"
    else:
        overall_suitability = "best"

    best_window = "Early morning (6:00 AM – 9:30 AM) or late afternoon (4:30 PM – 6:30 PM)"
    if temp_c > 30:
        best_window = "Early morning (6:00 AM – 8:30 AM) strictly before temperature rises"

    return {
        "overall_suitability": overall_suitability,
        "suitability_score": score,
        "delta_t": delta_t,
        "delta_t_status": delta_t_status,
        "drift_risk": drift_risk,
        "rainfast_risk": rainfast_risk,
        "water_quality_issues": water_quality_issues,
        "recommendations": recommendations,
        "contraindications": contraindications,
        "best_application_window": best_window
    }
