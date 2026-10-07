import React, { useEffect, useState } from 'react';
import {
  Sparkles, ArrowRight, ShieldCheck, Leaf, History, Beaker,
  CloudSun, BookOpen, Layers, CheckCircle2, FlaskConical, Droplets, Camera, ScanLine
} from 'lucide-react';
import { analysisService, SavedAnalysisComplete } from '../../services/analysis.service';
import { AGRI_PRODUCTS } from '../../data/products';

interface DashboardViewProps {
  onStartNewMix: () => void;
  onViewProducts: () => void;
  onViewHistory: () => void;
  onViewScheduleGenerator: () => void;
  onViewConditionAnalyzer: () => void;
  onViewCropGuide: () => void;
  onReopenAnalysis: (analysis: SavedAnalysisComplete) => void;
  onOpenScanner?: () => void;
}

export function DashboardView({
  onStartNewMix,
  onViewProducts,
  onViewScheduleGenerator,
  onViewConditionAnalyzer,
  onViewCropGuide,
  onOpenScanner,
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
    <div className="flex flex-col gap-5 sm:gap-6 pb-12 animate-fade-in max-w-2xl mx-auto w-full">
      
      {/* ── 1. Hero Widget ─────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700 shadow-xl shadow-emerald-900/10 p-6 sm:p-8 text-white flex flex-col justify-between group active:scale-[0.98] transition-transform duration-300">
        {/* Soft background decor */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> FCO 1985 Validated
          </div>
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-950/60 backdrop-blur-md text-emerald-200 text-xs font-bold border border-emerald-400/30 transition-all hover:scale-105"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scan Bottle</span>
            </button>
          )}
        </div>

        <div className="relative z-10 mb-6">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-2">
            Tank Mix<br/>Intelligence
          </h1>
          <p className="text-sm text-emerald-50 font-medium leading-relaxed max-w-sm">
            Analyze physical compatibility, WALES mixing sequences, and antagonism risks instantly.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onStartNewMix}
            className="flex-1 flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-white text-teal-800 hover:bg-slate-50 font-black text-sm sm:text-base shadow-lg transition-all duration-300 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span>Start Analysis Engine</span>
            <ArrowRight className="w-5 h-5 ml-1 opacity-70" />
          </button>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex justify-center items-center gap-2 px-5 py-4 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-black text-sm border border-emerald-400/40 shadow-lg transition-all active:scale-95 shrink-0"
              title="Scan any pesticide or fertilizer bottle"
            >
              <ScanLine className="w-5 h-5 text-emerald-300" />
              <span>AI Scanner</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Grid of Tools ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        
        {/* AI Scanner Card */}
        {onOpenScanner && (
          <div 
            onClick={onOpenScanner}
            className="col-span-2 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-500/30 shadow-md p-5 flex items-center justify-between cursor-pointer hover:border-indigo-400/60 transition-all active:scale-[0.98] group text-white"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 border border-indigo-500/30">
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-base text-white">Scan Crop Input Label</h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-bold">
                    Camera & AI
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">Point camera at bottle or packet for instant dose, pH & warnings</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-white/10 group-hover:bg-indigo-500 group-hover:text-white text-slate-400 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Catalog */}
        <div 
          onClick={onViewProducts}
          className="col-span-2 sm:col-span-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none p-5 flex items-center gap-4 cursor-pointer hover:border-emerald-500/30 transition-all active:scale-[0.97] group"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Product Catalog</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{AGRI_PRODUCTS.length}+ Inputs</p>
          </div>
        </div>

        {/* Schedules */}
        <div 
          onClick={onViewScheduleGenerator}
          className="col-span-2 sm:col-span-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none p-5 flex items-center gap-4 cursor-pointer hover:border-teal-500/30 transition-all active:scale-[0.97] group"
        >
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Droplets className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Spray Schedules</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Stage-by-stage plans</p>
          </div>
        </div>

        {/* Weather */}
        <div 
          onClick={onViewConditionAnalyzer}
          className="col-span-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none p-5 flex flex-col justify-center items-center text-center cursor-pointer hover:border-sky-500/30 transition-all active:scale-[0.97] group"
        >
          <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-sky-900/20 text-sky-500 flex items-center justify-center mb-3 group-hover:-translate-y-1 transition-transform duration-300">
            <CloudSun className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Spray Weather</h3>
          <p className="text-[11px] text-slate-500 mt-1">Delta-T limits</p>
        </div>

        {/* Guides */}
        <div 
          onClick={onViewCropGuide}
          className="col-span-1 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none p-5 flex flex-col justify-center items-center text-center cursor-pointer hover:border-indigo-500/30 transition-all active:scale-[0.97] group"
        >
          <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center mb-3 group-hover:-translate-y-1 transition-transform duration-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Crop Guides</h3>
          <p className="text-[11px] text-slate-500 mt-1">Pest & Nutrition</p>
        </div>

      </div>

    </div>
  );
}

