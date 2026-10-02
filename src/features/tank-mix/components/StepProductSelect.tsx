import React, { useState } from 'react';
import { Search, Plus, Check, X, ShieldAlert, FlaskConical, ArrowRight, ArrowLeft } from 'lucide-react';
import { AgriProduct } from '../../../types/agri';
import { SelectedTankProduct } from '../../../types/tankMix.types';

interface StepProductSelectProps {
  allProducts: AgriProduct[];
  selectedProducts: SelectedTankProduct[];
  selectedCrop: string;
  onAddProduct: (product: AgriProduct) => void;
  onRemoveProduct: (productId: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepProductSelect({
  allProducts,
  selectedProducts,
  selectedCrop,
  onAddProduct,
  onRemoveProduct,
  onNext,
  onBack
}: StepProductSelectProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Inputs' },
    { id: 'fertilizer', label: '🌱 Fertilizers (NPK)' },
    { id: 'micronutrient', label: '⚗️ Micronutrients' },
    { id: 'fungicide', label: '🔵 Fungicides' },
    { id: 'insecticide', label: '🛡️ Insecticides' },
    { id: 'herbicide', label: '🌾 Herbicides' },
    { id: 'pgr', label: '🧬 Plant Growth Regulators' },
    { id: 'adjuvant', label: '💧 Adjuvants' }
  ];

  const filtered = allProducts.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.commonName.toLowerCase().includes(q) ||
      p.activeIngredients.toLowerCase().includes(q) ||
      p.purpose.toLowerCase().includes(q) ||
      p.formulation.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const isSelected = (productId: string) =>
    selectedProducts.some((item) => item.product.id === productId);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20">
              <FlaskConical className="w-3.5 h-3.5" /> Step 2 of 7: Add Products to Tank
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Target Crop: <span className="text-emerald-400">{selectedCrop}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Select 2 to 8 crop inputs (fertilizers, fungicides, insecticides, adjuvants) to test tank compatibility.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Change Crop
            </button>
            <button
              onClick={onNext}
              disabled={selectedProducts.length === 0}
              className="btn-agri px-5 py-2.5 text-xs font-bold disabled:opacity-50"
            >
              <span>Next: Enter Dose ({selectedProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Tank Tray */}
        {selectedProducts.length > 0 && (
          <div className="mt-5 pt-5 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Selected in Spray Tank ({selectedProducts.length}/8):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold animate-scale-in"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="max-w-[180px] truncate">{item.product.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-900/50 text-[10px] text-emerald-300 font-mono">
                    {item.product.formulation}
                  </span>
                  <button
                    onClick={() => onRemoveProduct(item.product.id)}
                    className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-300 hover:text-white transition-colors"
                    title="Remove from tank"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search & Category Chips */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by brand name, generic formulation, active ingredient (e.g., Mancozeb, 19:19:19, Coragen)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all
                ${activeCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((product) => {
          const selected = isSelected(product.id);
          return (
            <div
              key={product.id}
              className={`
                p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between
                ${selected
                  ? 'bg-emerald-500/10 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    {product.formulation}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                  {product.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {product.activeIngredients || product.commonName}
                </p>
                <div className="mt-2 text-[11px] text-slate-400">
                  Standard Dose: <span className="font-semibold text-slate-300">{product.standardDose}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Ideal pH: <span className="font-bold text-slate-300">{product.idealPh}</span>
                </span>
                {selected ? (
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 hover:bg-emerald-600 transition-colors shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" /> Added
                  </button>
                ) : (
                  <button
                    onClick={() => onAddProduct(product)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Tank
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
