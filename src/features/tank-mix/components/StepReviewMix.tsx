import React from 'react';
import { 
  ClipboardCheck, Sparkles, ArrowLeft, Beaker, CheckCircle2, 
  ShieldAlert, Droplets, Sprout, Gauge, Flame, FlaskConical, Layers
} from 'lucide-react';
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
  // Approximate WALES bucket calculation for preview
  const getWalesStage = (formulation: string = '') => {
    const f = formulation.toUpperCase();
    if (f.includes('WP') || f.includes('WG') || f.includes('DF') || f.includes('WDG')) {
      return { code: 'W', label: 'Wettable Powders / Dispersibles', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    }
    if (f.includes('SC') || f.includes('CS') || f.includes('FL') || f.includes('F')) {
      return { code: 'A', label: 'Agitate / Suspensions & Flowables', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
    if (f.includes('SL') || f.includes('SP') || f.includes('AS')) {
      return { code: 'L', label: 'Liquid Solutions / Solubles', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    }
    if (f.includes('EC') || f.includes('EW') || f.includes('ME')) {
      return { code: 'E', label: 'Emulsifiable Concentrates', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
    }
    return { code: 'S', label: 'Surfactants & Adjuvants', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Hero Pre-Flight Banner ───────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Step 4 of 5 · Pre-Spray Chemical Review</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Verify Tank Combination & Fire Compatibility Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Double check tank inputs, water spray volume, and formulations. The rule engine analyzes active chemical antagonism, WALES order, and foliar phytotoxicity risks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Doses</span>
            </button>

            <button
              onClick={onAnalyze}
              disabled={isAnalyzing || selectedProducts.length === 0}
              className="btn-agri px-7 py-3 text-sm font-black shadow-xl shadow-emerald-950/60 flex items-center gap-2.5 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : 'group-hover:scale-125'} transition-transform text-white`} />
              <span>{isAnalyzing ? 'Executing Database Engine...' : 'Run Compatibility Analysis'}</span>
            </button>
          </div>
        </div>

        {/* ── Key Field Metrics HUD ───────────────────────────── */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" /> Target Crop
            </div>
            <div className="text-base font-black text-white mt-1">{selectedCrop}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-teal-400" /> Water Volume
            </div>
            <div className="text-base font-black text-white mt-1">{waterVolumeL} L / Acre</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-amber-400" /> Inputs Count
            </div>
            <div className="text-base font-black text-emerald-400 mt-1">{selectedProducts.length} Chemicals</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" /> Engine Rules
            </div>
            <div className="text-base font-black text-sky-300 mt-1">WALES + FCO 1985</div>
          </div>
        </div>
      </div>

      {/* ── Tank Composition Chemical Cards ──────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Beaker className="w-5 h-5 text-emerald-500" />
            <span>Chemical Loadout ({selectedProducts.length} Active Formulations)</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            Ready for Cross-Interaction Matrix Verification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedProducts.map((item, idx) => {
            const wales = getWalesStage(item.product.formulation);
            const totalInTank = (item.dose * waterVolumeL).toFixed(1);
            const unitSuffix = item.unit === 'g/L' ? 'g' : 'ml';

            return (
              <div
                key={item.product.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between gap-3 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">
                        {item.product.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        {item.product.formulation}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Active: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.product.activeIngredients}</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-bold" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}>
                      <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">WALES: {wales.code}</span>
                      <span className="text-slate-500 dark:text-slate-400 truncate max-w-[150px]">{wales.label}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {item.dose} {item.unit}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {totalInTank} {unitSuffix} / {waterVolumeL}L
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pre-Execution Safety Briefing ────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-800 dark:text-teal-300 text-xs leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
          <span>
            The engine evaluates over <strong>180+ verified active chemical pairs</strong>, pH buffering, physical precipitation risks, and WALES sequence.
          </span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="btn-agri px-5 py-2.5 text-xs font-black shrink-0 flex items-center justify-center gap-2 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Analysis Now</span>
        </button>
      </div>
    </div>
  );
}
