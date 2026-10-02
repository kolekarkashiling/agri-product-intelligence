import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AgriProduct, Language } from '../types/agri';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Thermometer,
  Droplets,
  Target,
  HelpCircle,
  Building2,
  FlaskConical,
  Bug,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
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
  // Lock body scrolling when modal is open and listen for Escape key
  useEffect(() => {
    if (!product) return;

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
  }, [product, onClose]);

  if (!product) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const categoryColorMap: Record<string, string> = {
    fertilizer: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    micronutrient: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-300 dark:border-teal-800',
    fungicide: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    insecticide: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800',
    herbicide: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    pgr: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    adjuvant: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800',
    biostimulant: 'bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300 border-lime-300 dark:border-lime-800',
  };

  const badgeClass = categoryColorMap[product.category] || 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-8 z-10 my-auto animate-scale-in"
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

        {/* Modal Header */}
        <div className="pr-10">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${badgeClass}`}>
              {product.category}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {t.modal_formulation || 'Formulation'}: {product.formulation} ({product.formulationFullName})
            </span>
            {product.isVerifiedLabel && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.badge_verified_label || 'Label Verified'}
              </span>
            )}
            {product.mixingOrderRank && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                <Layers className="w-3 h-3 text-agri-600" />
                <span>WALES #{product.mixingOrderRank}</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {product.brandName || product.name}
          </h2>

          {product.companyName && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mt-1.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{t.modal_manufacturer || 'Manufacturer'}: {product.companyName}</span>
            </div>
          )}

          {/* Active Chemical Ingredient & NPK */}
          <div className="mt-3.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider text-[10px]">
              {t.modal_active_ingredient || 'Active Chemical Ingredient & Technical Name'}:
            </span>
            <p className="text-sm sm:text-base font-black text-slate-900 dark:text-emerald-300 mt-0.5">
              {product.chemicalName || product.activeIngredients}
            </p>
            {product.npkOrNutrients && (
              <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mt-1">
                Nutrient Specification: {product.npkOrNutrients}
              </p>
            )}
          </div>
        </div>

        {/* Quick Spec Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{t.modal_ph_range || 'pH Range'}</span>
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-1">
              {product.phRange || `pH ${product.idealPh || '6.0 - 7.0'}`}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{t.modal_rainfastness || 'Rainfastness'}</span>
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-1">
              {product.rainfastHours} {t.modal_min_hours || 'Hours minimum'}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Thermometer className="w-4 h-4 text-rose-500" />
              <span>{t.modal_temp_tolerance || 'Temp Tolerance'}</span>
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-1">
              {product.tempMinC}°C – {product.tempMaxC}°C
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <HelpCircle className="w-4 h-4 text-teal-500" />
              <span>{t.modal_water_hardness || 'Hard Water Risk'}</span>
            </div>
            <p className="text-sm font-black capitalize text-slate-900 dark:text-white mt-1">
              {product.waterHardnessSensitivity} {t.modal_sensitivity || 'Sensitivity'}
            </p>
          </div>
        </div>

        {/* Section: Mode of Action & Purpose */}
        <div className="space-y-4 text-sm">
          <div className="bg-agri-50/60 dark:bg-agri-950/30 p-4.5 rounded-2xl border border-agri-200/70 dark:border-agri-900/60">
            <h4 className="font-extrabold text-agri-900 dark:text-agri-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-agri-600 shrink-0" />
              {t.modal_purpose || 'Purpose & Agronomic Function'}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {product.purpose}
            </p>
            <h4 className="font-extrabold text-agri-900 dark:text-agri-300 mt-3 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4 text-agri-600 shrink-0" />
              {t.modal_mode_of_action || 'Mode of Action (MOA)'}
            </h4>
            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {product.modeOfAction}
            </p>
          </div>

          {/* Dosages & Application Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-agri-600" />
                {t.modal_recommended_dosages || 'Recommended Dosages'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {product.recommendedDosage?.foliar && (
                  <li>• <strong>{t.modal_foliar || 'Foliar Spray'}:</strong> {product.recommendedDosage.foliar}</li>
                )}
                {product.recommendedDosage?.drip && (
                  <li>• <strong>{t.modal_drip || 'Drip / Fertigation'}:</strong> {product.recommendedDosage.drip}</li>
                )}
                {product.recommendedDosage?.drench && (
                  <li>• <strong>{t.modal_drench || 'Soil Drench'}:</strong> {product.recommendedDosage.drench}</li>
                )}
                {product.recommendedDosage?.seedTreatment && (
                  <li>• <strong>{t.modal_seed_treatment || 'Seed Treatment'}:</strong> {product.recommendedDosage.seedTreatment}</li>
                )}
                {product.standardDose && (
                  <li>• <strong>Standard Reference Dose:</strong> {product.standardDose} {product.standardUnit || ''}</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-agri-600" />
                {t.modal_target_crops || 'Registered Crops & Growth Stages'}
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>{t.modal_target_crops || 'Target Crops'}:</strong> {product.targetCrops?.join(', ') || 'Various Field & Horticultural Crops'}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5">
                <strong>{t.modal_growth_stages || 'Optimal Stages'}:</strong> {product.growthStages?.join(', ') || 'Vegetative, Flowering, Fruiting'}
              </p>
              {product.phiDays !== undefined && (
                <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-1.5">
                  <strong>{t.modal_phi || 'Pre-Harvest Interval (PHI)'}:</strong> {product.phiDays} days
                </p>
              )}
            </div>
          </div>

          {/* Target Pests or Diseases if available */}
          {product.targetPestsOrDiseases && product.targetPestsOrDiseases.length > 0 && (
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/60">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-2">
                <Bug className="w-4 h-4 text-blue-600" />
                {t.modal_target_pests || 'Target Pests & Diseases'}
              </h4>
              <p className="text-xs text-blue-950 dark:text-blue-200">
                {product.targetPestsOrDiseases.join(' • ')}
              </p>
            </div>
          )}

          {/* Advantages & Precautions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/60">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {t.modal_key_advantages || 'Key Advantages'}
              </h4>
              <ul className="space-y-1 text-xs text-emerald-950 dark:text-emerald-200">
                {product.advantages && product.advantages.length > 0 ? (
                  product.advantages.map((adv, i) => (
                    <li key={i}>• {adv}</li>
                  ))
                ) : (
                  <li>• High agronomic efficacy with verified field safety profile</li>
                )}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60">
              <h4 className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                {t.modal_precautions || 'Precautions & Limitations'}
              </h4>
              <ul className="space-y-1 text-xs text-amber-950 dark:text-amber-200">
                {product.precautions && product.precautions.map((prec, i) => (
                  <li key={`p-${i}`}>• {prec}</li>
                ))}
                {product.limitations && product.limitations.map((lim, i) => (
                  <li key={`l-${i}`} className="text-rose-700 dark:text-rose-300">• {lim}</li>
                ))}
                {(!product.precautions || product.precautions.length === 0) && (!product.limitations || product.limitations.length === 0) && (
                  <li>• Perform jar test before tank mixing with untested active compounds</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Close Action */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white transition-colors cursor-pointer"
          >
            {t.modal_close || 'Close Details'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
