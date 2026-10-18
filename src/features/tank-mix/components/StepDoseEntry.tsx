import React from 'react';
import { 
  Droplets, ArrowLeft, ArrowRight, Gauge, AlertCircle, 
  CheckCircle2, Plus, Minus, Info, Sparkles, Bug, ShieldCheck, Sprout, Zap
} from 'lucide-react';
import { SelectedTankProduct } from '../../../types/tankMix.types';

interface StepDoseEntryProps {
  selectedProducts: SelectedTankProduct[];
  selectedCrop: string;
  waterVolumeL: number;
  onUpdateDose: (productId: string, dose: number, unit?: SelectedTankProduct['unit']) => void;
  onUpdateWaterVolume: (litres: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDoseEntry({
  selectedProducts,
  selectedCrop,
  waterVolumeL,
  onUpdateDose,
  onUpdateWaterVolume,
  onNext,
  onBack
}: StepDoseEntryProps) {
  const hasInvalidDose = selectedProducts.some((p) => !p.dose || p.dose <= 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Insecticide': return <Bug className="w-4 h-4 text-amber-400" />;
      case 'Fungicide': return <ShieldCheck className="w-4 h-4 text-sky-400" />;
      case 'Fertilizer': return <Sprout className="w-4 h-4 text-emerald-400" />;
      case 'PGR': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Adjuvant': return <Zap className="w-4 h-4 text-teal-400" />;
      default: return <Droplets className="w-4 h-4 text-emerald-400" />;
    }
  };

  const handleIncrement = (productId: string, currentDose: number, step: number = 0.5) => {
    const newDose = Math.round((currentDose + step) * 10) / 10;
    onUpdateDose(productId, Math.max(0.1, newDose));
  };

  const handleDecrement = (productId: string, currentDose: number, step: number = 0.5) => {
    const newDose = Math.round((currentDose - step) * 10) / 10;
    onUpdateDose(productId, Math.max(0.1, newDose));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Hero Calibration Banner ──────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <Droplets className="w-3.5 h-3.5" />
              <span>Step 3 of 5 · Dosage & Spray Tank Calibration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Calibrate Field Rates for {selectedCrop}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fine-tune application rates per litre or per acre. The engine computes exact active dilution and knapsack tank proportions for safe foliar delivery.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Products</span>
            </button>
            <button
              onClick={onNext}
              disabled={hasInvalidDose || selectedProducts.length === 0}
              className="btn-agri px-6 py-2.5 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-950/40 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Step 4: Review Tank</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Spray Water Volume Master Controller ────────────── */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center shrink-0">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Field Spray Volume</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200">
                  {waterVolumeL} L / Acre
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Standard knapsack coverage: 150–200L. Power sprayers: 200–250L.
              </p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-wrap items-center gap-2 md:justify-end">
            <span className="text-[11px] text-slate-400 font-bold mr-1">Presets:</span>
            {[100, 150, 200, 250, 400, 500].map((vol) => (
              <button
                key={vol}
                onClick={() => onUpdateWaterVolume(vol)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-black transition-all
                  ${waterVolumeL === vol
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-900/50 scale-105'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                {vol} L
              </button>
            ))}
            <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-white/10">
              <input
                type="number"
                min="20"
                max="2000"
                step="10"
                value={waterVolumeL}
                onChange={(e) => onUpdateWaterVolume(Math.max(10, parseInt(e.target.value) || 200))}
                className="w-16 px-2 py-1.5 rounded-lg bg-black/40 border border-white/20 text-xs font-bold text-white text-center focus:outline-none focus:border-emerald-400"
              />
              <span className="text-[10px] text-slate-400">custom</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Product Dosage Cards List ───────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Configuring Doses ({selectedProducts.length} Selected Inputs)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Computed for standard 15-Litre Knapsack & {waterVolumeL}L Acre Tank
          </span>
        </div>

        {selectedProducts.map((item, idx) => {
          const pump15L = (item.dose * 15).toFixed(1);
          const totalTankL = (item.dose * waterVolumeL).toFixed(1);
          const unitSuffix = item.unit === 'g/L' ? 'g' : 'ml';

          return (
            <div
              key={item.product.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-emerald-500/40 transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Product identification */}
                <div className="flex items-start gap-3.5 min-w-[280px]">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {item.product.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                        {item.product.formulation}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        {getCategoryIcon(item.product.category)}
                        <span>{item.product.category}</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                      <span>Label rate:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {item.product.standardDose}
                      </strong>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <span>Active: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.product.activeIngredients}</span></span>
                    </div>
                  </div>
                </div>

                {/* Dose Stepper Controls & Quick Calculation Pills */}
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {/* Stepper with +/- */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.product.id, item.dose)}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs"
                      title="Decrease dose by 0.5"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={item.dose}
                      onChange={(e) => onUpdateDose(item.product.id, parseFloat(e.target.value) || 0)}
                      className="w-16 px-1 py-1 bg-transparent text-sm font-black text-slate-900 dark:text-white text-center focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => handleIncrement(item.product.id, item.dose)}
                      className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-xs"
                      title="Increase dose by 0.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Unit Selector */}
                  <select
                    value={item.unit}
                    onChange={(e) => onUpdateDose(item.product.id, item.dose, e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="ml/L">ml / Litre</option>
                    <option value="g/L">g / Litre</option>
                    <option value="kg/acre">kg / Acre</option>
                    <option value="L/acre">L / Acre</option>
                  </select>

                  {/* Field Application Metric Pills */}
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs">
                      <div className="text-[9px] uppercase font-bold text-emerald-800 dark:text-emerald-400">15L Pump</div>
                      <div className="font-black text-emerald-900 dark:text-emerald-200">
                        {pump15L} {unitSuffix}
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-500/20 text-xs">
                      <div className="text-[9px] uppercase font-bold text-teal-800 dark:text-teal-400">{waterVolumeL}L Acre</div>
                      <div className="font-black text-teal-900 dark:text-teal-200">
                        {totalTankL} {unitSuffix}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Validation Alerts & Action Bar ───────────────────── */}
      {hasInvalidDose ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>Please enter valid non-zero dose values for all selected products before reviewing.</span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>All {selectedProducts.length} products calibrated with valid foliar spray rates.</span>
          </div>

          <button
            onClick={onNext}
            className="btn-agri px-5 py-2 text-xs font-extrabold flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <span>Proceed to Step 4: Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
