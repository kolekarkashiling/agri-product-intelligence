import React, { useState } from 'react';
import { Sprout, Sparkles, Layers, ArrowRight, Search, Filter, Wheat, Apple, Salad, Flame } from 'lucide-react';

interface CropItem {
  name: string;
  category: 'Cash Crop' | 'Vegetable' | 'Fruit' | 'Cereal' | 'Pulse' | 'Spice';
  defaultStage: string;
  idealPh: string;
  duration: string;
}

const COMMON_CROPS: CropItem[] = [
  { name: 'Cotton (Kapas)', category: 'Cash Crop', defaultStage: 'Square Formation / Flowering', idealPh: '6.0 - 7.5', duration: '160-180 Days' },
  { name: 'Soybean', category: 'Pulse', defaultStage: 'Pod Formation', idealPh: '6.0 - 7.0', duration: '90-105 Days' },
  { name: 'Chilli (Mirchi)', category: 'Vegetable', defaultStage: 'Active Flowering & Fruit Set', idealPh: '6.5 - 7.5', duration: '150-180 Days' },
  { name: 'Tomato', category: 'Vegetable', defaultStage: 'Fruit Development', idealPh: '6.0 - 7.0', duration: '120-140 Days' },
  { name: 'Onion (Kanda)', category: 'Vegetable', defaultStage: 'Bulb Initiation & Sizing', idealPh: '6.5 - 7.5', duration: '110-130 Days' },
  { name: 'Grapes (Draksh)', category: 'Fruit', defaultStage: 'Berry Sizing & Veraison', idealPh: '6.5 - 7.5', duration: 'Perennial' },
  { name: 'Banana (Kela)', category: 'Fruit', defaultStage: 'Shooting & Bunch Growth', idealPh: '6.0 - 7.5', duration: '11-12 Months' },
  { name: 'Pomegranate (Anar)', category: 'Fruit', defaultStage: 'Fruit Growth & Sizing', idealPh: '6.5 - 7.5', duration: 'Perennial' },
  { name: 'Paddy (Rice)', category: 'Cereal', defaultStage: 'Panicle Initiation', idealPh: '5.5 - 6.5', duration: '120-140 Days' },
  { name: 'Sugarcane', category: 'Cash Crop', defaultStage: 'Tillering & Grand Growth', idealPh: '6.5 - 7.5', duration: '12-14 Months' },
  { name: 'Wheat', category: 'Cereal', defaultStage: 'Crown Root & Tillering', idealPh: '6.0 - 7.5', duration: '110-125 Days' },
  { name: 'Ginger (Adrak)', category: 'Spice', defaultStage: 'Rhizome Bulking', idealPh: '5.5 - 6.5', duration: '8-9 Months' },
  { name: 'Potato (Batata)', category: 'Vegetable', defaultStage: 'Tuber Initiation & Bulking', idealPh: '5.2 - 6.4', duration: '90-110 Days' },
  { name: 'Watermelon (Tarbooz)', category: 'Fruit', defaultStage: 'Fruit Sizing & Ripening', idealPh: '6.0 - 7.0', duration: '85-100 Days' }
];

interface StepCropSelectProps {
  selectedCrop: string;
  sprayStage?: string;
  onSelectCrop: (crop: string, variety?: string, stage?: string) => void;
  onNext: () => void;
}

export function StepCropSelect({ selectedCrop, sprayStage, onSelectCrop, onNext }: StepCropSelectProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Crops', icon: Layers },
    { id: 'Vegetable', label: 'Vegetables', icon: Salad },
    { id: 'Fruit', label: 'Fruits & Vines', icon: Apple },
    { id: 'Cash Crop', label: 'Cash Crops', icon: Flame },
    { id: 'Cereal', label: 'Cereals', icon: Wheat },
    { id: 'Pulse', label: 'Pulses', icon: Sprout }
  ];

  const filteredCrops = COMMON_CROPS.filter((c) => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Top Hero Card ────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-400/30">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>Step 1 of 5 • Target Agronomic Host</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Select Your Target Crop
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100/85 mt-2 font-medium leading-relaxed max-w-2xl">
            Target crop selection triggers statutory CIB-RC dosage limits, crop-specific foliar sensitivity analysis, and optimal spray stage timing.
          </p>

          {/* Active Crop Selection Bar */}
          <div className="mt-6 p-4 rounded-2xl bg-white/10 dark:bg-slate-950/60 border border-white/15 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black shadow-md">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-wider">Active Target Crop</div>
                <div className="text-base sm:text-lg font-black text-white">
                  {selectedCrop ? selectedCrop : 'No crop selected yet'}
                </div>
              </div>
            </div>

            <button
              onClick={onNext}
              disabled={!selectedCrop}
              className="btn-agri px-6 py-3 text-xs sm:text-sm font-black disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-emerald-950/40"
            >
              <span>Proceed to Add Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crop by name (e.g. Tomato, Cotton, Grapes)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white shadow-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  px-3.5 py-2.5 rounded-2xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all
                  ${isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
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

      {/* ── Crop Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCrops.map((crop, idx) => {
          const isSelected = selectedCrop === crop.name;
          return (
            <div
              key={crop.name}
              onClick={() => onSelectCrop(crop.name, undefined, crop.defaultStage)}
              className={`
                p-5 rounded-3xl border cursor-pointer transition-all duration-300 hover-glow-card relative flex flex-col justify-between
                ${isSelected
                  ? 'bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-950/20 ring-2 ring-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-500/40'
                }
              `}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {crop.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {crop.duration}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{crop.name}</span>
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />}
                </h3>

                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  Default: {crop.defaultStage}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>Soil pH: {crop.idealPh}</span>
                <span className="text-emerald-500 font-bold group-hover:translate-x-1 transition-transform">
                  {isSelected ? '✓ Selected' : 'Select →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
