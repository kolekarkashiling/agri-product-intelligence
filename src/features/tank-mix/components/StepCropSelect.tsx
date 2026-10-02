import React from 'react';
import { Sprout, Sparkles, Layers, ArrowRight } from 'lucide-react';


const COMMON_CROPS = [
  { name: 'Cotton (Kapas)', icon: '🌱', category: 'Cash Crop', defaultStage: 'Square Formation / Flowering' },
  { name: 'Soybean', icon: '🫘', category: 'Pulse', defaultStage: 'Pod Formation' },
  { name: 'Chilli (Mirchi)', icon: '🌶️', category: 'Vegetable', defaultStage: 'Active Flowering & Fruit Set' },
  { name: 'Tomato', icon: '🍅', category: 'Vegetable', defaultStage: 'Fruit Development' },
  { name: 'Onion (Kanda)', icon: '🧅', category: 'Vegetable', defaultStage: 'Bulb Initiation & Sizing' },
  { name: 'Grapes (Draksh)', icon: '🍇', category: 'Fruit', defaultStage: 'Berry Sizing & Veraison' },
  { name: 'Banana (Kela)', icon: '🍌', category: 'Fruit', defaultStage: 'Shooting & Bunch Growth' },
  { name: 'Pomegranate (Anar)', icon: '🍎', category: 'Fruit', defaultStage: 'Fruit Growth & Sizing' },
  { name: 'Paddy (Rice)', icon: '🌾', category: 'Cereal', defaultStage: 'Panicle Initiation' },
  { name: 'Sugarcane', icon: '🎋', category: 'Cash Crop', defaultStage: 'Tillering & Grand Growth' },
  { name: 'Wheat', icon: '🌾', category: 'Cereal', defaultStage: 'Crown Root & Tillering' },
  { name: 'Ginger (Adrak)', icon: '🫚', category: 'Spice', defaultStage: 'Rhizome Bulking' },
  { name: 'Turmeric (Haldi)', icon: '💛', category: 'Spice', defaultStage: 'Tillering & Bulking' },
  { name: 'Groundnut (Mungfali)', icon: '🥜', category: 'Oilseed', defaultStage: 'Pegging & Pod Sizing' },
  { name: 'Potato (Batata)', icon: '🥔', category: 'Tuber', defaultStage: 'Tuber Initiation & Bulking' },
  { name: 'Watermelon (Tarbooz)', icon: '🍉', category: 'Cucurbit', defaultStage: 'Fruit Sizing & Ripening' }
];

interface StepCropSelectProps {
  selectedCrop: string;
  sprayStage?: string;
  onSelectCrop: (crop: string, variety?: string, stage?: string) => void;
  onNext: () => void;
}

export function StepCropSelect({ selectedCrop, sprayStage, onSelectCrop, onNext }: StepCropSelectProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900/40 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-3 border border-emerald-500/20">
          <Sprout className="w-3.5 h-3.5" /> Step 1 of 7: Target Crop Selection
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Which crop are you spraying?
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          Selecting the specific target crop ensures chemical safety checks, crop-specific foliar sensitivity analysis, and official CIB-RC dosage limits.
        </p>

        {/* Selected Crop Badge */}
        <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🌿
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Current Selection</div>
              <div className="text-base font-bold text-white">{selectedCrop || 'None selected'}</div>
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={!selectedCrop}
            className="btn-agri px-5 py-2.5 text-sm"
          >
            <span>Continue to Add Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Select Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {COMMON_CROPS.map((crop) => {
          const isSelected = selectedCrop === crop.name;
          return (
            <button
              key={crop.name}
              onClick={() => onSelectCrop(crop.name, undefined, crop.defaultStage)}
              className={`
                text-left p-4 rounded-2xl border transition-all duration-200 group relative
                ${isSelected
                  ? 'bg-emerald-600/15 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/20 ring-2 ring-emerald-500/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-400/50 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{crop.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {crop.category}
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                {crop.name}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                Stage: {crop.defaultStage}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
