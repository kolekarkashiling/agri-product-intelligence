import React, { useState } from 'react';
import {
  Search, Plus, Check, X, ShieldAlert, FlaskConical, ArrowRight,
  ArrowLeft, Layers, Sprout, Wheat, Bug, TrendingUp, Droplets, Sparkles, AlertCircle
} from 'lucide-react';
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
    { id: 'all', label: 'All Inputs', icon: Layers },
    { id: 'fertilizer', label: 'Fertilizers (NPK)', icon: Sprout },
    { id: 'micronutrient', label: 'Micronutrients', icon: FlaskConical },
    { id: 'fungicide', label: 'Fungicides', icon: ShieldAlert },
    { id: 'insecticide', label: 'Insecticides', icon: Bug },
    { id: 'herbicide', label: 'Herbicides', icon: Wheat },
    { id: 'pgr', label: 'PGR Regulators', icon: TrendingUp },
    { id: 'adjuvant', label: 'Adjuvants', icon: Droplets }
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

  // Quick Preset Handlers
  const handleLoadPreset = (names: string[]) => {
    names.forEach((name) => {
      const match = allProducts.find((p) => p.name.toLowerCase().includes(name.toLowerCase()));
      if (match && !isSelected(match.id) && selectedProducts.length < 8) {
        onAddProduct(match);
      }
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider mb-2.5 border border-emerald-500/30">
              <FlaskConical className="w-3.5 h-3.5" /> Step 2 of 5 • Tank Chamber Loading
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white">
              Load Chemicals for: <span className="text-emerald-400">{selectedCrop}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Add 2 to 8 registered inputs (fertilizers, fungicides, insecticides, micronutrients) to inspect physical compatibility and WALES addition sequence.
            </p>

            {/* Quick Recipe Presets Strip */}
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" /> Quick Presets:
              </span>
              <button
                onClick={() => handleLoadPreset(['00:52:34', 'Boron', 'Mancozeb'])}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition-all hover:scale-105"
              >
                + Tomato Flowering Trio
              </button>
              <button
                onClick={() => handleLoadPreset(['19:19:19', 'Emamectin', 'Silicon'])}
                className="px-2.5 py-1 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-[11px] font-bold border border-teal-500/30 transition-all hover:scale-105"
              >
                + Cotton Pest & Nutrition
              </button>
              <button
                onClick={() => handleLoadPreset(['Metalaxyl', 'Zinc', 'Spreader'])}
                className="px-2.5 py-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 text-[11px] font-bold border border-sky-500/30 transition-all hover:scale-105"
              >
                + Fungicide & Chelate
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" /> Change Crop
            </button>
            <button
              onClick={onNext}
              disabled={selectedProducts.length === 0}
              className="btn-agri px-6 py-3 text-xs sm:text-sm font-black disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-emerald-950/40"
            >
              <span>Calibrate Doses ({selectedProducts.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Active Spray Tank Tray ──────────────────────────── */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-ring-beacon" />
              <span>Loaded in Spray Tank ({selectedProducts.length} / 8 Limit):</span>
            </div>
            {selectedProducts.length >= 2 ? (
              <span className="text-[11px] font-bold text-emerald-400">✓ Ready for Compatibility Test</span>
            ) : (
              <span className="text-[11px] font-bold text-amber-400">Select at least 2 products to analyze mix</span>
            )}
          </div>

          {selectedProducts.length === 0 ? (
            <div className="p-4 rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 text-center text-xs text-slate-400">
              No products added yet. Click "+ Add to Tank" on any product card below.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {selectedProducts.map((item, idx) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-100 text-xs font-bold animate-scale-in shadow-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="max-w-[180px] truncate">{item.product.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-[10px] font-mono text-emerald-300 font-bold border border-emerald-500/30">
                    {item.product.formulation}
                  </span>
                  <button
                    onClick={() => onRemoveProduct(item.product.id)}
                    className="p-1 rounded-lg hover:bg-rose-500/20 text-emerald-300 hover:text-rose-300 transition-colors"
                    title="Remove product"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Search & Vector Filter Chips ──────────────────────── */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by active ingredient, formulation (WP, SC, EC), brand, or NPK (e.g. Mancozeb, 00:52:34, Coragen)..."
            className="w-full pl-11 pr-16 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
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
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all
                  ${isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }
                `}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Product Cards Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => {
          const selected = isSelected(product.id);
          return (
            <div
              key={product.id}
              className={`
                p-5 rounded-3xl border transition-all duration-300 hover-glow-card flex flex-col justify-between
                ${selected
                  ? 'bg-gradient-to-br from-emerald-500/15 to-slate-900 border-2 border-emerald-500 shadow-lg shadow-emerald-950/20 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 shadow-xs'
                }
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    {product.formulation}
                  </span>
                </div>

                <h4 className="font-black text-base text-slate-900 dark:text-white line-clamp-1">
                  {product.name}
                </h4>

                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold line-clamp-1 mt-1">
                  {product.activeIngredients || product.commonName}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                  {product.purpose}
                </p>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Standard Foliar Dose:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.standardDose}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Ideal pH: <strong className="text-slate-700 dark:text-slate-300">{product.idealPh}</strong>
                </span>

                {selected ? (
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-rose-600 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm group"
                  >
                    <Check className="w-3.5 h-3.5 group-hover:hidden" />
                    <X className="w-3.5 h-3.5 hidden group-hover:inline" />
                    <span className="group-hover:hidden">Added</span>
                    <span className="hidden group-hover:inline">Remove</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (selectedProducts.length >= 8) {
                        alert('Tank chamber limit is 8 products.');
                        return;
                      }
                      onAddProduct(product);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-emerald-600 hover:text-white text-xs font-black flex items-center gap-1 transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Tank</span>
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
