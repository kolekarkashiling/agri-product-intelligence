import React, { useState } from 'react';
import { Language, WeatherConditionInput } from '../types/agri';
import { evaluateApplicationConditions, calculateDeltaT } from '../engine/conditionEngine';
import { TRANSLATIONS } from '../data/translations';
import {
  CloudSun,
  Thermometer,
  Wind,
  Droplets,
  CloudRain,
  Compass,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Gauge
} from 'lucide-react';

interface ConditionAnalyzerViewProps {
  language: Language;
}

export const ConditionAnalyzerView: React.FC<ConditionAnalyzerViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  // Default realistic input parameters
  const [conditions, setConditions] = useState<WeatherConditionInput>({
    crop: 'Tomato',
    growthStage: 'Flowering & Fruit Setting',
    temperatureC: 26,
    relativeHumidityPercent: 65,
    windSpeedKmh: 8,
    rainForecastHours: 8,
    soilMoisture: 'optimal',
    irrigationMethod: 'foliar',
    waterPh: 6.8,
    waterHardnessPpm: 120
  });

  const evaluation = evaluateApplicationConditions(conditions);
  const deltaT = calculateDeltaT(conditions.temperatureC, conditions.relativeHumidityPercent);

  const handleSliderChange = (key: keyof WeatherConditionInput, val: any) => {
    setConditions((prev) => ({ ...prev, [key]: val }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-agri-100 dark:bg-agri-950 text-agri-700 dark:text-agri-400">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {t.weather_analyzer_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Live Delta T calculation, droplet evaporation, wind drift risk, and water conditioning decision support.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parameters Panel */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Compass className="w-4 h-4 text-agri-600" />
              Field & Environmental Inputs
            </h3>

            {/* Crop & Stage Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {t.crop_name}
                </label>
                <select
                  value={conditions.crop}
                  onChange={(e) => handleSliderChange('crop', e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-agri-500"
                >
                  <option value="Tomato">Tomato (टोमॅटो)</option>
                  <option value="Chilli">Chilli / Pepper (मिरची)</option>
                  <option value="Cotton">Cotton (कापूस)</option>
                  <option value="Pomegranate">Pomegranate (डाळिंब)</option>
                  <option value="Grapes">Grapes (द्राक्षे)</option>
                  <option value="Sugarcane">Sugarcane (ऊस)</option>
                  <option value="Paddy">Paddy / Rice (भात)</option>
                  <option value="Soybean">Soybean (सोयाबीन)</option>
                  <option value="Citrus">Citrus (संत्रा/मोसंबी)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {t.growth_stage}
                </label>
                <select
                  value={conditions.growthStage}
                  onChange={(e) => handleSliderChange('growthStage', e.target.value)}
                  className="w-full text-xs font-bold px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-agri-500"
                >
                  <option value="Vegetative Active Growth">Vegetative Active Growth</option>
                  <option value="Flower Bud Initiation">Flower Bud Initiation</option>
                  <option value="Flowering & Fruit Setting">Flowering & Fruit Setting</option>
                  <option value="Fruit Enlargement">Fruit Enlargement</option>
                  <option value="Fruit Maturity & Ripening">Fruit Maturity & Ripening</option>
                </select>
              </div>
            </div>

            {/* Slider 1: Temperature */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  {t.temp_c}
                </span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {conditions.temperatureC} °C
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={conditions.temperatureC}
                onChange={(e) => handleSliderChange('temperatureC', Number(e.target.value))}
                className="w-full accent-agri-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10°C (Cold)</span>
                <span>25°C (Ideal)</span>
                <span>45°C (Extreme Heat)</span>
              </div>
            </div>

            {/* Slider 2: Relative Humidity */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  {t.humidity_pct}
                </span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {conditions.relativeHumidityPercent} %
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="95"
                step="1"
                value={conditions.relativeHumidityPercent}
                onChange={(e) => handleSliderChange('relativeHumidityPercent', Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>20% (Very Dry)</span>
                <span>65% (Optimal)</span>
                <span>95% (Near Saturated)</span>
              </div>
            </div>

            {/* Slider 3: Wind Speed */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-teal-500" />
                  {t.wind_speed}
                </span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {conditions.windSpeedKmh} km/h
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={conditions.windSpeedKmh}
                onChange={(e) => handleSliderChange('windSpeedKmh', Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>0 (Inversion Risk)</span>
                <span>8 (Optimal)</span>
                <span>35+ (Severe Drift Hazard)</span>
              </div>
            </div>

            {/* Slider 4: Rain Forecast Window */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CloudRain className="w-4 h-4 text-indigo-500" />
                  {t.rain_forecast}
                </span>
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {conditions.rainForecastHours} Hours to Rain
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="1"
                value={conditions.rainForecastHours}
                onChange={(e) => handleSliderChange('rainForecastHours', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 hr (Washout Imminent)</span>
                <span>6 hrs (Safe Window)</span>
                <span>24 hrs (Clear)</span>
              </div>
            </div>

            {/* Water Quality Inputs: pH & Hardness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{t.water_ph}</span>
                  <span className="font-black text-slate-900 dark:text-white">{conditions.waterPh}</span>
                </div>
                <input
                  type="range"
                  min="4.0"
                  max="9.5"
                  step="0.1"
                  value={conditions.waterPh}
                  onChange={(e) => handleSliderChange('waterPh', Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>4.0 (Acidic)</span>
                  <span>6.5 (Ideal)</span>
                  <span>9.5 (Alkaline Lock)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{t.water_hardness}</span>
                  <span className="font-black text-slate-900 dark:text-white">{conditions.waterHardnessPpm} ppm</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={conditions.waterHardnessPpm}
                  onChange={(e) => handleSliderChange('waterHardnessPpm', Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>50 (Soft)</span>
                  <span>150 (Normal)</span>
                  <span>500 (Hard Lock)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Decision Evaluation & Delta T Gauge */}
        <div className="lg:col-span-5 space-y-5">
          {/* Suitability Hero Result Card */}
          <div
            className={`rounded-3xl border p-6 sm:p-7 shadow-md transition-all ${
              evaluation.overallSuitability === 'best'
                ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                : evaluation.overallSuitability === 'suitable'
                ? 'bg-blue-500/10 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800'
                : evaluation.overallSuitability === 'caution'
                ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                : 'bg-rose-500/10 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Application Verdict
              </span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs">
                Score: {evaluation.suitabilityScore}/100
              </span>
            </div>

            <div className="flex items-center gap-3 my-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm ${
                  evaluation.overallSuitability === 'best'
                    ? 'bg-emerald-600'
                    : evaluation.overallSuitability === 'suitable'
                    ? 'bg-blue-600'
                    : evaluation.overallSuitability === 'caution'
                    ? 'bg-amber-600'
                    : 'bg-rose-600'
                }`}
              >
                {evaluation.overallSuitability === 'best' && <CheckCircle2 className="w-7 h-7" />}
                {evaluation.overallSuitability === 'suitable' && <CheckCircle2 className="w-7 h-7" />}
                {evaluation.overallSuitability === 'caution' && <AlertTriangle className="w-7 h-7" />}
                {evaluation.overallSuitability === 'avoid' && <XCircle className="w-7 h-7" />}
              </div>
              <div>
                <h3
                  className={`text-xl font-black ${
                    evaluation.overallSuitability === 'best'
                      ? 'text-emerald-900 dark:text-emerald-200'
                      : evaluation.overallSuitability === 'suitable'
                      ? 'text-blue-900 dark:text-blue-200'
                      : evaluation.overallSuitability === 'caution'
                      ? 'text-amber-900 dark:text-amber-200'
                      : 'text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {evaluation.overallSuitability === 'best' && t.result_best}
                  {evaluation.overallSuitability === 'suitable' && t.result_suitable}
                  {evaluation.overallSuitability === 'caution' && t.result_caution}
                  {evaluation.overallSuitability === 'avoid' && t.result_avoid}
                </h3>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Target: {conditions.crop} ({conditions.growthStage})
                </span>
              </div>
            </div>

            {/* Best Window Advisory */}
            <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-agri-600 shrink-0" />
              <span><strong>Optimal Timing:</strong> {evaluation.bestApplicationWindow}</span>
            </div>
          </div>

          {/* Delta T Science Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-indigo-600" />
                Delta T (ΔT) Droplet Index
              </h4>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                  deltaT >= 2 && deltaT <= 8
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                ΔT = {deltaT} °C
              </span>
            </div>

            {/* Visual Delta T Gauge Bar */}
            <div className="space-y-1">
              <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 flex overflow-hidden">
                <div className="w-[15%] bg-blue-400" title="0-2°C (Low evaporation / High dew)"></div>
                <div className="w-[45%] bg-emerald-500" title="2-8°C (Optimal Spray Zone)"></div>
                <div className="w-[20%] bg-amber-400" title="8-10°C (Marginal)"></div>
                <div className="w-[20%] bg-rose-500" title=">10°C (Extreme Evaporation)"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400">
                <span>0°C</span>
                <span className="text-emerald-600">2°C – 8°C (Ideal)</span>
                <span>10°C+</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {deltaT >= 2 && deltaT <= 8
                ? '✅ Excellent droplet survival: spray droplets stay liquid long enough on the leaf cuticle for maximum active ingredient absorption.'
                : deltaT < 2
                ? '⚠️ High humidity: spray stays wet for a prolonged period. Leaf surface wetness may promote disease proliferation if applied in the evening.'
                : '❌ High evaporation rate: fine spray droplets will evaporate in mid-air before hitting the target canopy, causing severe chemical loss.'}
            </p>
          </div>

          {/* Actionable Recommendations & Cautions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Agronomic Remedial Actions
            </h4>

            {evaluation.contraindications.length > 0 && (
              <div className="space-y-1.5">
                {evaluation.contraindications.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200 dark:border-rose-900">
                    <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {evaluation.waterQualityIssues.length > 0 && (
              <div className="space-y-1.5">
                {evaluation.waterQualityIssues.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            {evaluation.recommendations.length > 0 && (
              <div className="space-y-1.5">
                {evaluation.recommendations.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
