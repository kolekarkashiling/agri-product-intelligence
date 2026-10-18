import React, { useEffect, useState } from 'react';
import {
  Sparkles, ArrowRight, ShieldCheck, Leaf, History, Beaker,
  CloudSun, BookOpen, Layers, CheckCircle2, FlaskConical, Droplets, Camera, ScanLine,
  TrendingUp, CalendarClock, Compass, AlertCircle
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
  onReopenAnalysis,
  onOpenScanner,
}: DashboardViewProps) {
  const [recentAnalyses, setRecentAnalyses] = useState<SavedAnalysisComplete[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      try {
        setLoading(true);
        const { items } = await analysisService.getAnalyses({ pageSize: 3 });
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
    <div className="flex flex-col gap-6 pb-12 animate-fade-in max-w-4xl mx-auto w-full">
      
      {/* ── 0. Telemetry & Quick Metric Strip (UI/UX Pro Max) ───────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 shadow-2xs hover-glow-card transition-all flex items-center gap-3 stagger-1">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white stat-number">{AGRI_PRODUCTS.length}+</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Crop Inputs</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 shadow-2xs hover-glow-card transition-all flex items-center gap-3 stagger-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white stat-number">100%</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">FCO 1985 Standard</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 shadow-2xs hover-glow-card transition-all flex items-center gap-3 stagger-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <CloudSun className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white stat-number">Delta-T</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Micro-Weather</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3.5 shadow-2xs hover-glow-card transition-all flex items-center gap-3 stagger-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ScanLine className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white stat-number">AI Vision</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bottle OCR</div>
          </div>
        </div>
      </div>

      {/* ── 1. Hero Widget with Dynamic Glow ─────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-agri-800 shadow-2xl shadow-emerald-950/20 p-6 sm:p-10 text-white flex flex-col justify-between group transition-all duration-300 border border-white/10">
        {/* Soft background decor orbs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="absolute -bottom-20 -left-16 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider border border-white/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-300 pulse-ring-beacon" />
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>FCO 1985 & CIB-RC Validated Engine</span>
          </div>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/40 hover:bg-emerald-950/70 backdrop-blur-md text-emerald-200 text-xs font-bold border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scan Bottle Label</span>
            </button>
          )}
        </div>

        <div className="relative z-10 mb-8 max-w-xl">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
            Evidence-Based<br/><span className="text-emerald-200">Tank Mix Intelligence</span>
          </h1>
          <p className="text-xs sm:text-sm text-emerald-50/90 font-medium leading-relaxed">
            Eliminate chemical antagonism, protect spray nozzle life, and follow the 7-step WALES addition order calibrated to official Indian label recommendations.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStartNewMix}
            className="flex-1 flex justify-center items-center gap-2.5 px-6 py-4 rounded-2xl bg-white text-teal-900 hover:bg-slate-50 font-black text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 group"
          >
            <Sparkles className="w-5 h-5 text-teal-600 transition-transform duration-300 group-hover:rotate-12" />
            <span>Start Tank Mix Analyzer</span>
            <ArrowRight className="w-5 h-5 ml-1 opacity-70 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="flex justify-center items-center gap-2 px-5 py-4 rounded-2xl bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-black text-sm border border-emerald-400/40 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shrink-0"
              title="Scan any pesticide or fertilizer bottle"
            >
              <ScanLine className="w-5 h-5 text-emerald-300" />
              <span>Point & Scan AI</span>
            </button>
          )}
        </div>
      </div>

      {/* ── 2. AI Scanner Banner (High-Engage Micro-interaction) ───────── */}
      {onOpenScanner && (
        <div 
          onClick={onOpenScanner}
          className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 shadow-xl p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-all hover-glow-card active:scale-[0.98] group text-white relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-full bg-indigo-500/10 blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="relative">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 border border-indigo-500/40 shadow-inner">
                <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-indigo-400 pulse-ring-beacon" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-base sm:text-lg text-white group-hover:text-indigo-200 transition-colors">
                  AI Bottle & Packet Scanner
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-[10px] font-extrabold uppercase tracking-wider border border-indigo-400/30">
                  Instant OCR
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                Scan pesticide or fertilizer bottle label to extract chemical name, formulation (EC, WP, SC), safe dose, and compatibility warnings.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 group-hover:bg-indigo-500 group-hover:text-white text-slate-300 transition-all group-hover:scale-110 shrink-0 ml-4">
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      )}

      {/* ── 3. Grid of Primary Agricultural Engines ──────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Catalog Card */}
        <div 
          onClick={onViewProducts}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:border-emerald-500/40 transition-all hover-glow-card active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Product Catalog
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{AGRI_PRODUCTS.length}+ Verified Inputs</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Schedules Card */}
        <div 
          onClick={onViewScheduleGenerator}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:border-teal-500/40 transition-all hover-glow-card active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <CalendarClock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Spray Schedules
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Stage-by-stage crop plans</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Weather Card */}
        <div 
          onClick={onViewConditionAnalyzer}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:border-sky-500/40 transition-all hover-glow-card active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <CloudSun className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Spray Weather & Delta-T
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Evaporation & wind drift calculator</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Guides Card */}
        <div 
          onClick={onViewCropGuide}
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 sm:p-6 flex items-center justify-between cursor-pointer hover:border-indigo-500/40 transition-all hover-glow-card active:scale-[0.98] group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Crop Intelligence Handbook
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Soil pH, pests & nutrition guides</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </div>

      </div>

      {/* ── 4. Recent Saved Tank Analyses (if present) ───────────────── */}
      {recentAnalyses.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-emerald-600" />
              <h3 className="font-black text-sm text-slate-900 dark:text-white">Recent Tank Analyses</h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">Click to revisit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recentAnalyses.map((item) => (
              <div
                key={item.header?.id || Math.random()}
                onClick={() => onReopenAnalysis(item)}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 cursor-pointer hover:border-emerald-400 transition-all hover-glow-card"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-slate-800 dark:text-white truncate">
                    {item.header?.crop_name || item.header?.mix_name || 'Tank Analysis'}
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    item.header?.status === 'compatible'
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : item.header?.status === 'caution'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {item.header?.status || 'Evaluated'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>{item.products?.length || 0} Products</span>
                  <span>{item.header?.created_at ? new Date(item.header.created_at).toLocaleDateString() : 'Recent'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
