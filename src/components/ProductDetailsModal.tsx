import React from 'react';
import { AgriProduct, Language } from '../types/agri';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, Clock, Thermometer, Droplets, Target, HelpCircle, Building2, FlaskConical } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailsModalProps {
  product: AgriProduct | null;
  onClose: () => void;
  language: Language;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  language
}) => {
  if (!product) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 border border-agri-200 dark:border-agri-800">
              {product.category}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Formulation: {product.formulation} ({product.formulationFullName})
            </span>
            {product.isVerifiedLabel && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.badge_verified_label}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {product.brandName || product.name}
          </h2>

          {product.companyName && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Manufacturer: {product.companyName}</span>
            </div>
          )}

          <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <span className="font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[10px]">
              Active Chemical Ingredient & Technical Name:
            </span>
            <p className="text-sm font-extrabold text-slate-900 dark:text-emerald-300 mt-0.5">
              {product.chemicalName || product.activeIngredients}
            </p>
          </div>
        </div>

        {/* Quick Spec Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>pH Range</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {product.phRange}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Rainfastness</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {product.rainfastHours} Hours minimum
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>Temp Tolerance</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {product.tempMinC}°C – {product.tempMaxC}°C
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <HelpCircle className="w-4 h-4 text-teal-500" />
              <span>Hard Water Risk</span>
            </div>
            <p className="text-sm font-bold capitalize text-slate-900 dark:text-white mt-1">
              {product.waterHardnessSensitivity} Sensitivity
            </p>
          </div>
        </div>

        {/* Section: Mode of Action & Purpose */}
        <div className="space-y-4 text-sm">
          <div className="bg-agri-50/50 dark:bg-agri-950/30 p-4 rounded-2xl border border-agri-200/60 dark:border-agri-900/60">
            <h4 className="font-bold text-agri-900 dark:text-agri-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-agri-600" />
              Purpose & Agronomic Function
            </h4>
            <p className="mt-1 text-slate-700 dark:text-slate-300 leading-relaxed">
              {product.purpose}
            </p>
            <h4 className="font-bold text-agri-900 dark:text-agri-300 mt-3">
              Mode of Action (MOA)
            </h4>
            <p className="mt-0.5 text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              {product.modeOfAction}
            </p>
          </div>

          {/* Dosages & Application Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Recommended Dosages
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <strong>Foliar Spray:</strong> {product.recommendedDosage.foliar}</li>
                {product.recommendedDosage.drip && (
                  <li>• <strong>Drip / Fertigation:</strong> {product.recommendedDosage.drip}</li>
                )}
                {product.recommendedDosage.drench && (
                  <li>• <strong>Soil Drench:</strong> {product.recommendedDosage.drench}</li>
                )}
                {product.recommendedDosage.seedTreatment && (
                  <li>• <strong>Seed Treatment:</strong> {product.recommendedDosage.seedTreatment}</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                Registered Crops & Growth Stages
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Target Crops:</strong> {product.targetCrops.join(', ')}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                <strong>Optimal Stages:</strong> {product.growthStages.join(', ')}
              </p>
            </div>
          </div>

          {/* Advantages & Precautions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Advantages
              </h4>
              <ul className="space-y-1 text-xs text-emerald-950 dark:text-emerald-200">
                {product.advantages.map((adv, i) => (
                  <li key={i}>• {adv}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Precautions & Limitations
              </h4>
              <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200">
                {product.precautions.map((prec, i) => (
                  <li key={i}>• {prec}</li>
                ))}
                {product.limitations.map((lim, i) => (
                  <li key={i} className="text-rose-700 dark:text-rose-300">• {lim}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Close Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
