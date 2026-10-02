import React from 'react';
import { ClipboardCheck, Sparkles, ArrowLeft, Beaker, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SelectedTankProduct } from '../../../types/tankMix.types';

interface StepReviewMixProps {
  selectedCrop: string;
  selectedProducts: SelectedTankProduct[];
  waterVolumeL: number;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onBack: () => void;
}

export function StepReviewMix({
  selectedCrop,
  selectedProducts,
  waterVolumeL,
  isAnalyzing,
  onAnalyze,
  onBack
}: StepReviewMixProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20">
              <ClipboardCheck className="w-3.5 h-3.5" /> Step 4 of 7: Review Tank Combination
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Ready to verify chemical compatibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Review your inputs and trigger the verified database decision engine.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Edit Doses
            </button>
            <button
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="btn-agri px-6 py-3 text-sm font-black shadow-lg shadow-emerald-900/30 flex items-center gap-2 group"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : 'group-hover:scale-110'} transition-transform`} />
              <span>{isAnalyzing ? 'Evaluating Compatibility...' : 'Analyze Compatibility Now'}</span>
            </button>
          </div>
        </div>

        {/* Configuration summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-bold text-slate-400">Target Crop</div>
            <div className="text-sm font-bold text-white mt-0.5">{selectedCrop}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-bold text-slate-400">Spray Water Volume</div>
            <div className="text-sm font-bold text-white mt-0.5">{waterVolumeL} Litres / Acre</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Inputs Count</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">{selectedProducts.length} Products in Tank</div>
          </div>
        </div>
      </div>

      {/* Tank Composition Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Beaker className="w-5 h-5 text-emerald-500" />
          Tank Mix Components Summary
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {selectedProducts.map((item, idx) => (
            <div key={item.product.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{item.product.name}</div>
                  <div className="text-xs text-slate-500">{item.product.commonName} · {item.product.category}</div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                  {item.dose} {item.unit}
                </div>
                <div className="text-[11px] text-slate-400">
                  {(item.dose * waterVolumeL).toFixed(1)} {item.unit === 'g/L' ? 'g' : 'ml'} / Tank
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
