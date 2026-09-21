import React, { useState } from 'react';
import { AgriProduct, Language } from '../types/agri';
import { Plus, Check, Info, ShieldCheck, Droplets, Target, Building2, FlaskConical, Sparkles, ChevronRight } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: AgriProduct;
  isSelected: boolean;
  onToggleSelect: (product: AgriProduct) => void;
  onViewDetails: (product: AgriProduct) => void;
  language: Language;
  animationDelay?: number;
}

const CATEGORY_STYLES: Record<string, {
  bg: string; text: string; border: string;
  gradFrom: string; gradTo: string; glow: string; dot: string;
}> = {
  fertilizer: {
    bg: 'bg-emerald-100/80 dark:bg-emerald-950/60',
    text: 'text-emerald-800 dark:text-emerald-300',
    border: 'border-emerald-300/60 dark:border-emerald-800/60',
    gradFrom: 'from-emerald-500', gradTo: 'to-teal-500',
    glow: 'rgba(16,185,129,0.3)', dot: 'bg-emerald-500',
  },
  micronutrient: {
    bg: 'bg-amber-100/80 dark:bg-amber-950/60',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-300/60 dark:border-amber-800/60',
    gradFrom: 'from-amber-500', gradTo: 'to-orange-500',
    glow: 'rgba(245,158,11,0.3)', dot: 'bg-amber-500',
  },
  fungicide: {
    bg: 'bg-blue-100/80 dark:bg-blue-950/60',
    text: 'text-blue-800 dark:text-blue-300',
    border: 'border-blue-300/60 dark:border-blue-800/60',
    gradFrom: 'from-blue-500', gradTo: 'to-indigo-500',
    glow: 'rgba(59,130,246,0.3)', dot: 'bg-blue-500',
  },
  insecticide: {
    bg: 'bg-rose-100/80 dark:bg-rose-950/60',
    text: 'text-rose-800 dark:text-rose-300',
    border: 'border-rose-300/60 dark:border-rose-800/60',
    gradFrom: 'from-rose-500', gradTo: 'to-pink-500',
    glow: 'rgba(244,63,94,0.3)', dot: 'bg-rose-500',
  },
  herbicide: {
    bg: 'bg-purple-100/80 dark:bg-purple-950/60',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border-purple-300/60 dark:border-purple-800/60',
    gradFrom: 'from-purple-500', gradTo: 'to-violet-500',
    glow: 'rgba(139,92,246,0.3)', dot: 'bg-purple-500',
  },
  pgr: {
    bg: 'bg-teal-100/80 dark:bg-teal-950/60',
    text: 'text-teal-800 dark:text-teal-300',
    border: 'border-teal-300/60 dark:border-teal-800/60',
    gradFrom: 'from-teal-500', gradTo: 'to-cyan-500',
    glow: 'rgba(20,184,166,0.3)', dot: 'bg-teal-500',
  },
  adjuvant: {
    bg: 'bg-cyan-100/80 dark:bg-cyan-950/60',
    text: 'text-cyan-800 dark:text-cyan-300',
    border: 'border-cyan-300/60 dark:border-cyan-800/60',
    gradFrom: 'from-cyan-500', gradTo: 'to-sky-500',
    glow: 'rgba(6,182,212,0.3)', dot: 'bg-cyan-500',
  },
  biostimulant: {
    bg: 'bg-lime-100/80 dark:bg-lime-950/60',
    text: 'text-lime-800 dark:text-lime-300',
    border: 'border-lime-300/60 dark:border-lime-800/60',
    gradFrom: 'from-lime-500', gradTo: 'to-green-500',
    glow: 'rgba(132,204,22,0.3)', dot: 'bg-lime-500',
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onViewDetails,
  language,
  animationDelay = 0,
}) => {
  const t = TRANSLATIONS[language];
  const catStyle = CATEGORY_STYLES[product.category] || CATEGORY_STYLES.fertilizer;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card-enter"
      style={{ '--delay': `${animationDelay}s` } as React.CSSProperties}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative rounded-3xl flex flex-col justify-between
          transition-all duration-300 cursor-default
          card-shine hover-card-lift group overflow-hidden
          ${isSelected
            ? 'border-2 border-agri-500/70 shadow-card-glow bg-white dark:bg-slate-900'
            : 'border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-agri-300/60 dark:hover:border-agri-700/60 bg-white dark:bg-slate-900'
          }
        `}
        style={{
          boxShadow: isHovered
            ? `0 16px 40px -12px ${catStyle.glow}, 0 4px 12px rgba(0,0,0,0.08)`
            : isSelected
              ? `0 0 0 2px rgba(27,166,155,0.3), 0 8px 24px rgba(27,166,155,0.15)`
              : undefined,
        }}
      >
        {/* Top accent bar with gradient */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${catStyle.gradFrom} ${catStyle.gradTo} transition-opacity duration-300 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-agri-400 via-emerald-400 to-teal-400 animate-shimmer-gradient" />
        )}

        {/* Subtle inner glow for selected state */}
        {isSelected && (
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at top, rgba(27,166,155,0.06) 0%, transparent 70%)' }}
          />
        )}

        <div className="p-5">
          {/* Header Badges */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Category badge */}
              <span className={`
                inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider
                px-2.5 py-1 rounded-full border shadow-2xs
                transition-all duration-200 group-hover:scale-105
                ${catStyle.bg} ${catStyle.text} ${catStyle.border}
              `}>
                <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot} inline-block`} />
                {product.category}
              </span>

              {/* Formulation badge */}
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-mono">
                {product.formulation}
              </span>
            </div>

            {/* Verified shield */}
            {product.isVerifiedLabel && (
              <div className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-agri-700 dark:text-agri-300 bg-agri-50 dark:bg-agri-950/60 px-2 py-1 rounded-lg border border-agri-200/60 dark:border-agri-800/60 transition-transform group-hover:scale-105">
                <ShieldCheck className="w-3.5 h-3.5 text-agri-600 dark:text-agri-400 shrink-0" />
                <span className="hidden sm:inline">{t.badge_verified_label}</span>
              </div>
            )}
          </div>

          {/* Brand Name */}
          <h3 className={`
            text-base sm:text-[17px] font-black text-slate-900 dark:text-white
            leading-snug tracking-tight transition-colors duration-200
            ${isHovered ? 'text-agri-700 dark:text-agri-300' : ''}
          `}>
            {product.brandName || product.name}
          </h3>

          {/* Company badge */}
          {product.companyName && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
              <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{product.companyName}</span>
            </div>
          )}

          {/* Chemical / Active Ingredient box */}
          <div className={`
            mt-3 p-2.5 rounded-xl border text-xs
            bg-slate-50/80 dark:bg-slate-800/60
            border-slate-200/70 dark:border-slate-700/60
            transition-all duration-200
            ${isHovered ? 'border-agri-200/60 dark:border-agri-800/60 bg-agri-50/30 dark:bg-agri-950/20' : ''}
          `}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-1">
              <FlaskConical className="w-3 h-3 text-agri-500" />
              Active Ingredient
            </span>
            <p className="font-bold text-slate-800 dark:text-emerald-300 text-xs line-clamp-1">
              {product.chemicalName || product.activeIngredients}
            </p>
          </div>

          {/* NPK tag */}
          {product.npkOrNutrients && (
            <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-xl border border-emerald-200/60 dark:border-emerald-800/50 animate-fade-in">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              {product.npkOrNutrients}
            </div>
          )}

          {/* Purpose */}
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {product.purpose}
          </p>

          {/* Dosage & Crops */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Droplets className={`w-3.5 h-3.5 shrink-0 text-blue-500 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              <span className="font-semibold truncate">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Dose: </span>
                {product.recommendedDosage.foliar}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Target className={`w-3.5 h-3.5 shrink-0 text-amber-500 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
              <span className="truncate font-medium">
                <span className="text-slate-400 dark:text-slate-500">Crops: </span>
                {product.targetCrops.slice(0, 3).join(', ')}
                {product.targetCrops.length > 3 && (
                  <span className="text-agri-600 dark:text-agri-400 font-bold ml-1">+{product.targetCrops.length - 3}</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 pt-0 flex items-center gap-2">
          {/* View Details */}
          <button
            onClick={() => onViewDetails(product)}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl
              text-xs font-bold transition-all duration-200 active:scale-95
              group/btn
              ${isSelected
                ? 'bg-agri-50 dark:bg-agri-950/40 text-agri-700 dark:text-agri-300 border border-agri-200/60 dark:border-agri-800/60 hover:bg-agri-100 dark:hover:bg-agri-900/40'
                : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-200/80 dark:hover:bg-slate-700/60'
              }
            `}
          >
            <Info className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:rotate-12" />
            <span>{t.btn_view_details}</span>
            <ChevronRight className="w-3 h-3 opacity-50 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
          </button>

          {/* Add to Mix / Remove */}
          <button
            onClick={() => onToggleSelect(product)}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl
              text-xs font-extrabold transition-all duration-200 active:scale-95
              relative overflow-hidden
              ${isSelected
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 hover:bg-rose-100 dark:hover:bg-rose-900/40'
                : 'bg-gradient-to-r from-agri-600 to-agri-500 text-white hover:from-agri-500 hover:to-agri-400 shadow-sm shadow-agri-600/30 hover:shadow-glow'
              }
            `}
            style={!isSelected ? {
              boxShadow: isHovered ? `0 4px 16px ${catStyle.glow}, 0 2px 6px rgba(0,0,0,0.1)` : undefined,
            } : undefined}
          >
            {/* Button shimmer on hover */}
            {!isSelected && (
              <span className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}

            <span className="relative flex items-center gap-1.5">
              {isSelected ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3] text-rose-600 dark:text-rose-400" />
                  {t.btn_remove}
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:rotate-90" />
                  {t.btn_add_to_mix}
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
