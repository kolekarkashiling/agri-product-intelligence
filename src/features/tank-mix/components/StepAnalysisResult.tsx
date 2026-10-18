import React, { useState } from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Bookmark,
  FlaskConical, Droplets, BookOpen, RotateCcw, Share2, Check,
  Printer, ArrowRight, ShieldAlert, Sparkles, HelpCircle, CheckSquare,
  Square, Layers, Clock, AlertOctagon, Info
} from 'lucide-react';
import { TankMixDecisionResult, SelectedTankProduct } from '../../../types/tankMix.types';
import { StatusBadge } from '../../../components/ui/StatusBadge';

interface StepAnalysisResultProps {
  selectedCrop: string;
  selectedProducts: SelectedTankProduct[];
  waterVolumeL: number;
  result: TankMixDecisionResult;
  mixName: string;
  isSaving: boolean;
  savedAnalysisId?: string;
  onSave: (mixName: string) => void;
  onReset: () => void;
}

export function StepAnalysisResult({
  selectedCrop,
  selectedProducts,
  waterVolumeL,
  result,
  mixName,
  isSaving,
  savedAnalysisId,
  onSave,
  onReset
}: StepAnalysisResultProps) {
  const [customName, setCustomName] = useState(mixName || `${selectedCrop} Tank Mix`);
  const [activeTab, setActiveTab] = useState<'wales' | 'issues' | 'jar_test' | 'summary'>('wales');
  const [copied, setCopied] = useState(false);
  const [checkedJarSteps, setCheckedJarSteps] = useState<Record<number, boolean>>({});

  const isCompatible = result.status === 'compatible';
  const isCaution = result.status === 'caution';
  const isConflict = result.status === 'conflict';

  const toggleJarStep = (index: number) => {
    setCheckedJarSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCopySummary = () => {
    const text = `Agri Product Intelligence — Tank Mix Analysis Report
Crop: ${selectedCrop} | Water: ${waterVolumeL}L/acre
Status: ${result.status.toUpperCase()}
Summary: ${result.summary}

WALES Pouring Order:
${result.mixingSequence.map((m) => `Step ${m.step}: [${m.walesCode}] ${m.product.name} (${m.doseString})`).join('\n')}

Verified by Agri Product Intelligence Engine`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in print:space-y-4">
      {/* ── Status Result Banner ─────────────────────────────── */}
      <div
        className={`
          rounded-3xl p-6 sm:p-8 border shadow-xl relative overflow-hidden text-white
          ${isConflict
            ? 'bg-gradient-to-br from-rose-950 via-slate-900 to-rose-950/80 border-rose-500/40'
            : isCaution
              ? 'bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950/80 border-amber-500/40'
              : 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-emerald-500/40'
          }
        `}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={result.status} size="lg" />
              <span className="text-xs font-bold text-slate-300 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                Target: {selectedCrop} · {waterVolumeL}L / Acre
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              {isCompatible && (
                <>
                  <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                  <span>Tank Combination Approved & Compatible</span>
                </>
              )}
              {isCaution && (
                <>
                  <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
                  <span>Compatible with Agronomic Precautions</span>
                </>
              )}
              {isConflict && (
                <>
                  <AlertOctagon className="w-8 h-8 text-rose-400 shrink-0" />
                  <span>Chemical Incompatibility — Do Not Mix</span>
                </>
              )}
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 print:hidden">
            {savedAnalysisId ? (
              <div className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Saved to Mixes</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Mix Name..."
                  className="px-3 py-2 rounded-xl bg-black/40 border border-white/20 text-xs font-bold text-white focus:outline-none focus:border-emerald-400 w-36"
                />
                <button
                  onClick={() => onSave(customName)}
                  disabled={isSaving}
                  className="btn-agri px-4 py-2 text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>
            )}

            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onReset}
              className="px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Mix</span>
            </button>
          </div>
        </div>

        {/* pH and Foliar Safety Alerts */}
        {result.phWarning && (
          <div className="relative z-10 mt-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong className="text-amber-100">pH Caution Alert:</strong> {result.phWarning}
            </div>
          </div>
        )}
      </div>

      {/* ── Interactive View Tabs ────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none print:hidden">
        <button
          onClick={() => setActiveTab('wales')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'wales'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>1. WALES Mixing Order ({result.mixingSequence.length} Steps)</span>
        </button>

        <button
          onClick={() => setActiveTab('issues')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'issues'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>2. Compatibility Findings ({result.issues.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('jar_test')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
            activeTab === 'jar_test'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>3. 1-Litre Jar Test Protocol</span>
        </button>
      </div>

      {/* ── TAB 1: WALES Mixing Sequence ─────────────────────── */}
      {(activeTab === 'wales' || window.matchMedia('print').matches) && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-emerald-500" />
                <span>Standard WALES Pouring Sequence</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Always fill the spray tank half full with clean water and run continuous mechanical agitation before pouring.
              </p>
            </div>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-black bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-xl border border-emerald-500/20">
              Strict Order Prevents Gelling & Filter Clogs
            </span>
          </div>

          <div className="space-y-3">
            {result.mixingSequence.map((step, idx) => (
              <div
                key={step.step}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                    {step.walesCode}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-slate-400">Step {step.step} of {result.mixingSequence.length}:</span>
                      <h4 className="font-black text-base text-slate-900 dark:text-white">{step.product.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-200 dark:bg-slate-700 font-bold text-slate-800 dark:text-slate-200">
                        {step.product.formulation}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                      <strong className="text-emerald-600 dark:text-emerald-400">{step.walesLabel}</strong> · {step.instructions}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 pl-14 sm:pl-0">
                  <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">{step.doseString}</div>
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 sm:justify-end mt-0.5">
                    <Clock className="w-3 h-3 text-teal-500" />
                    <span>Agitate 2–3 mins before next</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: Chemical Compatibility Findings ────────────── */}
      {(activeTab === 'issues' || window.matchMedia('print').matches) && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Scientific Cross-Interaction Matrix ({result.issues.length} Notes)</span>
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Based on active chemistry, solubility product, and hydrolysis
            </span>
          </div>

          {result.issues.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h4 className="font-black text-base text-slate-900 dark:text-white">Zero Chemical Conflicts Found</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md mx-auto">
                All selected active ingredients have proven synergistic or neutral biological compatibility with no antagonism reported in literature.
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {result.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className={`
                    p-4 sm:p-5 rounded-2xl border flex flex-col gap-3 transition-all
                    ${issue.severity === 'conflict'
                      ? 'bg-rose-500/5 border-rose-500/30 dark:bg-rose-950/20'
                      : 'bg-amber-500/5 border-amber-500/30 dark:bg-amber-950/20'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 font-black text-sm text-slate-900 dark:text-white">
                      {issue.severity === 'conflict' ? (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <span>{issue.reason}</span>
                    </div>
                    <span
                      className={`
                        text-[10px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 tracking-wider
                        ${issue.severity === 'conflict' 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }
                      `}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
                    <strong className="text-slate-900 dark:text-white">Agronomic Directive:</strong> {issue.recommendation}
                  </div>

                  {issue.source && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2 pl-7 pt-2 border-t border-slate-200/50 dark:border-slate-800">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Scientific Authority: <strong>{issue.source}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: 1-Litre Jar Test Checklist ─────────────────── */}
      {(activeTab === 'jar_test' || window.matchMedia('print').matches) && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Droplets className="w-5 h-5 text-teal-500" />
                <span>Interactive 1-Litre Jar Test Verification</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Always conduct this simple 30-minute test in a glass jar before filling the main 200L spray tank.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {result.jarTestChecklist.map((step, idx) => {
              const isChecked = !!checkedJarSteps[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleJarStep(idx)}
                  className={`
                    p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-start gap-3
                    ${isChecked
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500/40 text-teal-900 dark:text-teal-200'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-500/30'
                    }
                  `}
                >
                  <button className="mt-0.5 shrink-0 text-teal-500 focus:outline-none">
                    {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </button>
                  <div>
                    <div className="text-[11px] font-black uppercase text-teal-600 dark:text-teal-400">Step {idx + 1}</div>
                    <p className={`text-xs mt-0.5 leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {step}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
