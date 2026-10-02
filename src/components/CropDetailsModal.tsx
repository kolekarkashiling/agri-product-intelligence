import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CropInfo } from '../types/crop';
import { Language } from '../types/agri';
import {
  X,
  Sprout,
  Droplets,
  Thermometer,
  Calendar,
  Layers,
  Bug,
  Activity,
  CheckCircle2,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface CropDetailsModalProps {
  crop: CropInfo | null;
  onClose: () => void;
  language: Language;
}

export const CropDetailsModal: React.FC<CropDetailsModalProps> = ({
  crop,
  onClose,
  language
}) => {
  // Lock body scrolling when modal is open and listen for Escape key
  useEffect(() => {
    if (!crop) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [crop, onClose]);

  if (!crop) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8 z-10 my-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 border border-agri-200 dark:border-agri-800">
              {crop.category}
            </span>
            <span className="text-xs font-semibold text-slate-500 italic">
              {crop.scientificName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {crop.name}
            {language === 'mr' && crop.localNameMr && (
              <span className="text-base sm:text-lg font-bold text-slate-500 dark:text-slate-400">
                {' '}({crop.localNameMr})
              </span>
            )}
          </h2>
        </div>

        {/* Quick Agronomic Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>Optimal Temp</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
              {crop.tempRangeC}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Water Need</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
              {crop.waterRequirementMm}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Crop Duration</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
              {crop.durationDays}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Expected Yield</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1">
              {crop.yieldPerAcre}
            </p>
          </div>
        </div>

        {/* Soil & Spacing Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-agri-600" />
              Soil & Soil pH Requirements
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              <strong>Soil Type:</strong> {crop.idealSoil}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
              <strong>Ideal Soil pH:</strong> <span className="font-bold text-emerald-700 dark:text-emerald-300">{crop.idealSoilPh}</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-agri-600" />
              Seed Rate & Plant Spacing
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              <strong>Seed Rate:</strong> {crop.seedRatePerAcre}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
              <strong>Spacing:</strong> {crop.spacing}
            </p>
          </div>
        </div>

        {/* Critical Growth Stages & Nutrient Schedule */}
        <div className="mb-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-agri-600" />
            Critical Growth Stages & Nutrient Roadmap
          </h3>

          <div className="space-y-3">
            {crop.criticalGrowthStages.map((stage, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-agri-600 text-white flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <span>{stage.stageName}</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {stage.durationDays}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">Key Field Actions:</span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{stage.keyActivities}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Recommended Nutrients:</span>
                    <p className="text-slate-700 dark:text-slate-300 font-semibold mt-0.5">{stage.recommendedNutrients}</p>
                  </div>
                  <div>
                    <span className="font-bold text-rose-700 dark:text-rose-400 block">Threat Monitoring:</span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{stage.vulnerablePestsAndDiseases}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Major Pests & Diseases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 text-xs sm:text-sm">
          {/* Pests */}
          <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
            <h4 className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2 mb-3">
              <Bug className="w-4 h-4 text-rose-600" />
              Major Pests & Defense Strategy
            </h4>
            <div className="space-y-3">
              {crop.majorPests.map((pest, i) => (
                <div key={i} className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-100 dark:border-rose-900/40 text-xs">
                  <span className="font-bold text-rose-900 dark:text-rose-200 block">{pest.name}</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-1"><strong>Symptoms:</strong> {pest.symptoms}</p>
                  <p className="text-emerald-800 dark:text-emerald-300 font-semibold mt-1"><strong>Management:</strong> {pest.management}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diseases */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
            <h4 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-amber-600" />
              Major Diseases & Fungicide Controls
            </h4>
            <div className="space-y-3">
              {crop.majorDiseases.map((dis, i) => (
                <div key={i} className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-amber-100 dark:border-amber-900/40 text-xs">
                  <span className="font-bold text-amber-900 dark:text-amber-200 block">{dis.name}</span>
                  <p className="text-slate-600 dark:text-slate-400 mt-1"><strong>Symptoms:</strong> {dis.symptoms}</p>
                  <p className="text-emerald-800 dark:text-emerald-300 font-semibold mt-1"><strong>Management:</strong> {dis.management}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Harvesting Tips */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <h4 className="font-bold text-xs sm:text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Harvesting & Market Post-Harvest Practices
          </h4>
          <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
            {crop.harvestingTips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>

        {/* Close Modal Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white transition-colors cursor-pointer"
          >
            Close Crop Guide
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
