import React, { useState } from 'react';
import {
  CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Bookmark,
  FlaskConical, Droplets, BookOpen, RotateCcw, ArrowRight, Share2, Check
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
  const [copied, setCopied] = useState(false);

  const isCompatible = result.status === 'compatible';
  const isCaution = result.status === 'caution';
  const isConflict = result.status === 'conflict';

  const handleCopySummary = () => {
    const text = `Agri Product Intelligence - Tank Mix Analysis\nCrop: ${selectedCrop}\nStatus: ${result.status.toUpperCase()}\nSummary: ${result.summary}\nWALES Sequence: ${result.mixingSequence.map((m) => `${m.step}. ${m.product.name} (${m.doseString})`).join(' -> ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Status Result Banner ─────────────────────────────── */}
      <div
        className={`
          rounded-3xl p-6 sm:p-8 border shadow-xl backdrop-blur-md relative overflow-hidden
          ${isConflict
            ? 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-rose-950/60 border-rose-500/30'
            : isCaution
              ? 'bg-gradient-to-br from-amber-950/80 via-slate-900 to-amber-950/60 border-amber-500/30'
              : 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-emerald-950/60 border-emerald-500/30'
          }
        `}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge status={result.status} size="lg" />
              <span className="text-xs font-bold text-slate-400">Target Crop: {selectedCrop}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {isCompatible && 'Tank Mix Approved & Safe'}
              {isCaution && 'Permissible with Agronomic Precautions'}
              {isConflict && 'Incompatible Combination — Do Not Mix'}
            </h2>

            <p className="text-sm text-slate-200 mt-2 max-w-2xl leading-relaxed">
              {result.summary}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {savedAnalysisId ? (
              <div className="px-4 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-2 justify-center">
                <Check className="w-4 h-4" /> Saved to History
              </div>
            ) : (
              <button
                onClick={() => onSave(customName)}
                disabled={isSaving}
                className="btn-agri px-5 py-3 text-xs font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save to History'}</span>
              </button>
            )}

            <button
              onClick={handleCopySummary}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Share Result'}</span>
            </button>

            <button
              onClick={onReset}
              className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> New Mix
            </button>
          </div>
        </div>

        {/* pH and Foliar Safety Alerts */}
        {result.phWarning && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong>Solution pH Caution:</strong> {result.phWarning}
            </div>
          </div>
        )}
      </div>

      {/* ── Issues Breakdown (If Any) ───────────────────────── */}
      {result.issues.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            Agronomic Analysis & Chemical Pair Findings ({result.issues.length})
          </h3>

          <div className="space-y-3.5">
            {result.issues.map((issue, idx) => (
              <div
                key={idx}
                className={`
                  p-4 sm:p-5 rounded-2xl border flex flex-col gap-2.5
                  ${issue.severity === 'conflict'
                    ? 'bg-rose-500/5 border-rose-500/20 dark:bg-rose-950/20'
                    : 'bg-amber-500/5 border-amber-500/20 dark:bg-amber-950/20'
                  }
                `}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                    {issue.severity === 'conflict' ? (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    )}
                    <span>{issue.reason}</span>
                  </div>
                  <span
                    className={`
                      text-[10px] font-black uppercase px-2 py-0.5 rounded-md
                      ${issue.severity === 'conflict' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'}
                    `}
                  >
                    {issue.severity}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">Agronomic Recommendation:</strong> {issue.recommendation}
                </div>

                {issue.source && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 pt-1 border-t border-slate-200/50 dark:border-slate-800">
                    <BookOpen className="w-3 h-3 text-emerald-500" />
                    <span>Scientific Source: <strong>{issue.source}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── WALES Mixing Sequence ───────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-emerald-500" />
            Recommended WALES Tank Mixing Sequence
          </h3>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">
            Strict Order Prevents Curdling
          </span>
        </div>

        <div className="space-y-3">
          {result.mixingSequence.map((step) => (
            <div
              key={step.step}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.walesCode}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Step {step.step}:</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{step.product.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-300">
                      {step.product.formulation}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {step.walesLabel} · {step.instructions}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 pl-12 sm:pl-0">
                <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{step.doseString}</div>
                <div className="text-[11px] text-slate-400">Continuous Agitation</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Jar Test Protocol Checklist ───────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Droplets className="w-5 h-5 text-teal-500" />
          Standard 1-Liter Jar Test Procedure Before Spraying
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.jarTestChecklist.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
