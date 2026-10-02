import React, { useEffect, useState } from 'react';
import {
  Sparkles, ArrowRight, ShieldCheck, Leaf, History, Beaker,
  CloudSun, BookOpen, Layers, CheckCircle2, AlertTriangle, XCircle, Clock, FlaskConical
} from 'lucide-react';
import { analysisService, SavedAnalysisComplete } from '../../services/analysis.service';
import { AGRI_PRODUCTS } from '../../data/products';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Skeleton } from '../../components/ui/Skeleton';

interface DashboardViewProps {
  onStartNewMix: () => void;
  onViewProducts: () => void;
  onViewHistory: () => void;
  onViewScheduleGenerator: () => void;
  onViewConditionAnalyzer: () => void;
  onViewCropGuide: () => void;
  onReopenAnalysis: (analysis: SavedAnalysisComplete) => void;
}

export function DashboardView({
  onStartNewMix,
  onViewProducts,
  onViewHistory,
  onViewScheduleGenerator,
  onViewConditionAnalyzer,
  onViewCropGuide,
  onReopenAnalysis
}: DashboardViewProps) {
  const [recentAnalyses, setRecentAnalyses] = useState<SavedAnalysisComplete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        setLoading(true);
        const { items } = await analysisService.getAnalyses({ pageSize: 4 });
        setRecentAnalyses(items);
      } catch (e) {
        console.warn('Error loading recent analyses:', e);
      } finally {
        setLoading(false);
      }
    }
    loadRecent();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in pb-12 auto-rows-[minmax(180px,auto)]">
      
      {/* ── 1. Hero Widget (Spans 2 cols, 2 rows) ─────────────────────────────────── */}
      <div className="md:col-span-2 md:row-span-2 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 shadow-2xl p-5 sm:p-8 text-white flex flex-col justify-between group">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/25 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/25 text-emerald-300 text-[10px] font-bold backdrop-blur-md mb-4 uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> FCO 1985 Compliant
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Tank Mix <span className="bg-gradient-to-r from-emerald-400 to-agri-300 bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-sm text-emerald-100/70 mt-3 font-medium leading-relaxed max-w-md">
            Verify chemical antagonism, WALES mixing sequence, and pH precipitation risks before field application.
          </p>
        </div>

        <div className="relative z-10 mt-8">
          <button
            onClick={onStartNewMix}
            className="w-full sm:w-auto inline-flex justify-center items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Start Analysis Engine</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ── 2. Quick Action Widget: Catalog (1 col, 1 row) ────────────────────── */}
      <div 
        onClick={onViewProducts}
        className="rounded-2xl sm:rounded-3xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 p-5 sm:p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all group shadow-sm hover:shadow-xl hover:shadow-emerald-900/10"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
          <Layers className="w-6 h-6" />
        </div>
        <h3 className="font-black text-lg text-slate-900 dark:text-white">Product Catalog</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{AGRI_PRODUCTS.length}+ Inputs</p>
      </div>

      {/* ── 3. Tool Widget: Weather Engine (1 col, 1 row) ─────────────────────── */}
      <div 
        onClick={onViewConditionAnalyzer}
        className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-5 sm:p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-amber-500/40 transition-all group shadow-sm hover:shadow-xl hover:shadow-amber-900/10"
      >
        <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform">
          <CloudSun className="w-6 h-6" />
        </div>
        <h3 className="font-black text-lg text-slate-900 dark:text-white">Spray Weather</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Check Delta-T limits</p>
      </div>

      {/* ── 4. Tool Widget: Schedule Generator (Spans 2 cols, 1 row) ───────────── */}
      <div 
        onClick={onViewScheduleGenerator}
        className="md:col-span-2 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 p-5 sm:p-6 flex items-center gap-6 cursor-pointer hover:border-blue-500/40 transition-all group overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-blue-900/10"
      >
        <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
          <FlaskConical className="w-48 h-48 text-blue-500" />
        </div>
        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 z-10 group-hover:scale-105 transition-transform">
          <FlaskConical className="w-8 h-8" />
        </div>
        <div className="z-10">
          <h3 className="font-black text-xl text-slate-900 dark:text-white">Fertigation Schedules</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-[250px]">
            Generate stage-by-stage spray plans and exact chemical cost estimations.
          </p>
        </div>
      </div>

      {/* ── 5. Tool Widget: Crop Guides (1 col, 1 row) ────────────────────────── */}
      <div 
        onClick={onViewCropGuide}
        className="md:col-span-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 p-5 sm:p-6 flex flex-col justify-center items-center text-center cursor-pointer hover:border-indigo-500/40 transition-all group shadow-sm hover:shadow-xl hover:shadow-indigo-900/10"
      >
        <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:-translate-y-1 transition-transform">
          <BookOpen className="w-6 h-6" />
        </div>
        <h3 className="font-black text-lg text-slate-900 dark:text-white">Agronomy Guides</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Pest & Nutrition</p>
      </div>

      {/* ── 6. Stats Widget (1 col, 1 row) ────────────────────────────────────── */}
      <div className="md:col-span-1 rounded-2xl sm:rounded-3xl bg-slate-900 dark:bg-black border border-slate-800 p-5 sm:p-6 flex flex-col justify-center items-center text-center shadow-inner">
        <div className="text-3xl font-black text-emerald-400 mb-1">WALES</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Compliant Engine</div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3" />
        <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
          <CheckCircle2 className="w-4 h-4" /> Live DB Sync
        </div>
      </div>

    </div>
  );
}
