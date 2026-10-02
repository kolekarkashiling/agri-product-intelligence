import React, { useState } from 'react';
import { Search, Filter, Sparkles, X, Leaf, ShieldCheck, TrendingUp, FlaskConical, Plus } from 'lucide-react';
import { AgriProduct, Language } from '../../types/agri';
import { ProductCard } from '../../components/ProductCard';
import { ProductDetailsModal } from '../../components/ProductDetailsModal';
import { TRANSLATIONS } from '../../data/translations';
import { useProducts } from '../../hooks/useProducts';
import { Skeleton } from '../../components/ui/Skeleton';

interface ProductCatalogViewProps {
  language: Language;
  selectedProductIds: string[];
  onToggleSelect: (product: AgriProduct) => void;
  onAnalyzeTank: () => void;
}

export function ProductCatalogView({
  language,
  selectedProductIds,
  onToggleSelect,
  onAnalyzeTank
}: ProductCatalogViewProps) {
  const t = TRANSLATIONS[language];
  const { products, loading, category, setCategory, searchQuery, setSearchQuery } = useProducts();
  const [activeDetailProduct, setActiveDetailProduct] = useState<AgriProduct | null>(null);

  const categoryFilters = [
    { id: 'all', label: t.filter_all, emoji: '🌿' },
    { id: 'fertilizer', label: t.filter_fertilizer, emoji: '🌱' },
    { id: 'micronutrient', label: t.filter_micronutrient, emoji: '⚗️' },
    { id: 'fungicide', label: t.filter_fungicide, emoji: '🔵' },
    { id: 'insecticide', label: t.filter_insecticide, emoji: '🛡️' },
    { id: 'herbicide', label: t.filter_herbicide, emoji: '🌾' },
    { id: 'pgr', label: t.filter_pgr, emoji: '🧬' },
    { id: 'adjuvant', label: t.filter_adjuvant, emoji: '💧' },
    { id: 'biostimulant', label: t.filter_biostimulant, emoji: '✨' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* ── Search & Filter Hero Banner ─────────────────────────── */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> FCO 1985 & CIB-RC Registered Inputs Master
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Agricultural Product Directory
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-2">
            Search authorized water-soluble fertilizers, fungicides, insecticides, micronutrients and adjuvants.
          </p>

          {/* Search Box */}
          <div className="mt-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand, active ingredient, NPK ratio, or target pest..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-semibold border-2 border-transparent focus:border-emerald-500 focus:outline-none shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Category Filter Chips ─────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-emerald-500" /> Category:
        </span>
        {categoryFilters.map((cat) => {
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`
                shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all
                ${isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }
              `}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Count Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">
          Showing <span className="font-black text-slate-900 dark:text-white">{products.length}</span> products
          {searchQuery && <> for <span className="text-emerald-500 font-bold">"{searchQuery}"</span></>}
        </p>

        {selectedProductIds.length > 0 && (
          <button
            onClick={onAnalyzeTank}
            className="btn-agri px-3.5 py-1.5 text-xs flex items-center gap-1.5 shadow-sm"
          >
            <span>{selectedProductIds.length} in Tank — Analyze</span>
          </button>
        )}
      </div>

      {/* ── Products Grid ─────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-xs">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching crop inputs found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Try searching by chemical generic name, active ingredient, or clear the category filter.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setCategory('all'); }}
            className="btn-agri mt-4 text-xs mx-auto"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selectedProductIds.includes(product.id)}
              onToggleSelect={onToggleSelect}
              onViewDetails={setActiveDetailProduct}
              language={language}
              animationDelay={Math.min(idx * 0.03, 0.3)}
            />
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        language={language}
      />
    </div>
  );
}
