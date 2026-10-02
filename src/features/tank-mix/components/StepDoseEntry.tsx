import React from 'react';
import { Droplets, ArrowLeft, ArrowRight, Gauge, AlertCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20">
              <Droplets className="w-3.5 h-3.5" /> Step 3 of 7: Enter Field Doses & Water Volume
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Dosage & Water Calibration ({selectedCrop})
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Specify the intended field dosage per litre or acre. Accurate concentration calculations ensure foliar safety and efficacy.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Products
            </button>
            <button
              onClick={onNext}
              disabled={hasInvalidDose || selectedProducts.length === 0}
              className="btn-agri px-5 py-2.5 text-xs font-bold disabled:opacity-50"
            >
              <span>Next: Review Mix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tank Water Calibration Box */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Water Spray Volume (Per Acre)</div>
              <div className="text-xs text-slate-400">Standard field recommendation is 150–200 Litres/Acre</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[100, 150, 200, 250].map((vol) => (
              <button
                key={vol}
                onClick={() => onUpdateWaterVolume(vol)}
                className={`
                  px-3.5 py-1.5 rounded-xl text-xs font-black transition-all
                  ${waterVolumeL === vol
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }
                `}
              >
                {vol} L
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Dosage Rows */}
      <div className="space-y-3">
        {selectedProducts.map((item, idx) => {
          const pump15L = (item.dose * 15).toFixed(1);
          const totalTankL = (item.dose * waterVolumeL).toFixed(1);

          return (
            <div
              key={item.product.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {item.product.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-mono text-slate-500 font-semibold">
                      {item.product.formulation}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Recommended label dose: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{item.product.standardDose}</span>
                  </div>
                </div>
              </div>

              {/* Dose Input & Unit */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.05"
                    value={item.dose}
                    onChange={(e) => onUpdateDose(item.product.id, parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 text-center"
                  />
                  <select
                    value={item.unit}
                    onChange={(e) => onUpdateDose(item.product.id, item.dose, e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
                  >
                    <option value="ml/L">ml / Litre</option>
                    <option value="g/L">g / Litre</option>
                    <option value="kg/acre">kg / Acre</option>
                    <option value="L/acre">L / Acre</option>
                  </select>
                </div>

                {/* Calculation Pills */}
                <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                    15L Pump: <strong>{pump15L} {item.unit === 'g/L' ? 'g' : 'ml'}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-semibold">
                    {waterVolumeL}L Acre: <strong>{totalTankL} {item.unit === 'g/L' ? 'g' : 'ml'}</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {hasInvalidDose && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Please enter valid non-zero dose amounts for all selected crop inputs.
        </div>
      )}
    </div>
  );
}
