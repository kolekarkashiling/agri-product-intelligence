import { WeatherConditionInput, ConditionEvaluationResult, ConditionSuitability } from '../types/agri';

export function calculateDeltaT(tempC: number, rhPercent: number): number {
  // Approximate Wet Bulb Temperature using Stull's empirical formula
  const T = tempC;
  const RH = rhPercent;
  
  const Tw =
    T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
    Math.atan(T + RH) -
    Math.atan(RH - 1.676331) +
    0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
    4.686035;

  const deltaT = T - Tw;
  return Math.max(0, parseFloat(deltaT.toFixed(1)));
}

export function evaluateApplicationConditions(
  input: WeatherConditionInput
): ConditionEvaluationResult {
  const recommendations: string[] = [];
  const contraindications: string[] = [];
  const waterQualityIssues: string[] = [];

  let score = 100;

  // 1. Delta T Calculation
  const deltaT = calculateDeltaT(input.temperatureC, input.relativeHumidityPercent);
  let deltaTStatus: ConditionEvaluationResult['deltaTStatus'] = 'ideal';

  if (deltaT < 2) {
    deltaTStatus = 'marginal_low';
    score -= 10;
    recommendations.push(
      `Delta T is low (${deltaT}°C) due to high humidity (${input.relativeHumidityPercent}%). Spray droplets will remain wet on foliage for extended periods, which may increase risk of fungal infection if leaves stay wet overnight.`
    );
  } else if (deltaT >= 2 && deltaT <= 8) {
    deltaTStatus = 'ideal';
    recommendations.push(
      `Delta T (${deltaT}°C) is in the OPTIMAL zone (2°C - 8°C). Ideal droplet survival and stomatal absorption.`
    );
  } else if (deltaT > 8 && deltaT <= 10) {
    deltaTStatus = 'marginal_high';
    score -= 20;
    contraindications.push(
      `Delta T is high (${deltaT}°C). Spray droplets will evaporate rapidly before penetrating leaf cuticles. Use coarse droplets or anti-evaporation adjuvant.`
    );
  } else {
    deltaTStatus = 'poor_evaporation';
    score -= 40;
    contraindications.push(
      `Delta T is critical (${deltaT}°C > 10°C). High evaporation rate will cause rapid droplet crystallization and poor chemical efficacy.`
    );
  }

  // 2. Temperature Checks
  if (input.temperatureC > 35) {
    score -= 30;
    contraindications.push(
      `High ambient temperature (${input.temperatureC}°C). Foliar spray risks leaf scorch / phytotoxicity and causes rapid stomatal closure.`
    );
  } else if (input.temperatureC < 12) {
    score -= 20;
    contraindications.push(
      `Low temperature (${input.temperatureC}°C). Plant metabolic activity and foliar absorption rates are significantly reduced.`
    );
  }

  // 3. Wind Speed & Drift Risk
  let driftRisk: ConditionEvaluationResult['driftRisk'] = 'low';

  if (input.windSpeedKmh < 3) {
    driftRisk = 'moderate';
    score -= 10;
    recommendations.push(
      'Very calm wind (<3 km/h). Beware of thermal inversion layer which can keep ultra-fine spray droplets suspended in air and drift unpredictably.'
    );
  } else if (input.windSpeedKmh >= 3 && input.windSpeedKmh <= 15) {
    driftRisk = 'low';
    recommendations.push('Wind speed is optimal (3 - 15 km/h) for uniform droplet deposition.');
  } else if (input.windSpeedKmh > 15 && input.windSpeedKmh <= 20) {
    driftRisk = 'high';
    score -= 25;
    contraindications.push(
      `Wind speed is high (${input.windSpeedKmh} km/h). Significant drift risk onto non-target crops. Lower spray boom height and use drift-reduction nozzles.`
    );
  } else {
    driftRisk = 'severe';
    score -= 50;
    contraindications.push(
      `Severe wind (${input.windSpeedKmh} km/h > 20 km/h). DO NOT SPRAY. Extreme drift hazard and chemical loss.`
    );
  }

  // 4. Rain Forecast & Rainfastness
  let rainfastRisk: ConditionEvaluationResult['rainfastRisk'] = 'safe';

  if (input.rainForecastHours <= 2) {
    rainfastRisk = 'washout_imminent';
    score -= 45;
    contraindications.push(
      `Rain expected within ${input.rainForecastHours} hours. Spray deposit will be washed off foliage before adequate systemic absorption or contact film drying.`
    );
  } else if (input.rainForecastHours > 2 && input.rainForecastHours <= 4) {
    rainfastRisk = 'borderline';
    score -= 15;
    recommendations.push(
      `Rain window is tight (${input.rainForecastHours}h). Recommend adding an organosilicone sticker/spreader to accelerate uptake.`
    );
  } else {
    rainfastRisk = 'safe';
    recommendations.push(`Clear rainfastness window (${input.rainForecastHours}+ hours of dry conditions).`);
  }

  // 5. Water Quality (pH & Hardness)
  if (input.waterPh > 7.8) {
    score -= 15;
    waterQualityIssues.push(
      `Alkaline water (pH ${input.waterPh}). Insecticides (organophosphates, pyrethroids) and GA3 suffer rapid alkaline hydrolysis. Add a water acidifier or citric acid to buffer to pH 6.0 - 6.5.`
    );
  } else if (input.waterPh < 5.0) {
    score -= 10;
    waterQualityIssues.push(
      `Highly acidic water (pH ${input.waterPh}). Insoluble copper fungicides may dissolve too quickly, increasing crop burn risk.`
    );
  }

  if (input.waterHardnessPpm > 250) {
    score -= 15;
    waterQualityIssues.push(
      `Hard water detected (${input.waterHardnessPpm} ppm CaCO3). High Ca²⁺ and Mg²⁺ ions deactivate herbicides like Glyphosate and reduce efficacy of emulsifiers. Condition water with Ammonium Sulphate (AMS).`
    );
  }

  // 6. Soil Moisture & Method
  if (input.soilMoisture === 'dry' && input.irrigationMethod === 'drip') {
    recommendations.push(
      'Pre-irrigate with plain water for 30 minutes before injecting fertilizer to avoid root salt burn.'
    );
  } else if (input.soilMoisture === 'waterlogged') {
    score -= 15;
    contraindications.push('Soil is waterlogged. Root oxygen is depleted; avoid heavy fertigation.');
  }

  // Overall Suitability Grade
  score = Math.max(0, Math.min(100, score));

  let overallSuitability: ConditionSuitability = 'best';
  if (score < 45 || driftRisk === 'severe' || rainfastRisk === 'washout_imminent') {
    overallSuitability = 'avoid';
  } else if (score < 70) {
    overallSuitability = 'caution';
  } else if (score < 85) {
    overallSuitability = 'suitable';
  } else {
    overallSuitability = 'best';
  }

  // Best Application Time Window
  let bestApplicationWindow = 'Early morning (6:00 AM – 9:30 AM) or late afternoon (4:30 PM – 6:30 PM)';
  if (input.temperatureC > 30) {
    bestApplicationWindow = 'Early morning (6:00 AM – 8:30 AM) strictly before temperature rises';
  }

  return {
    overallSuitability,
    suitabilityScore: score,
    deltaT,
    deltaTStatus,
    driftRisk,
    rainfastRisk,
    waterQualityIssues,
    recommendations,
    contraindications,
    bestApplicationWindow
  };
}
