import React, { useState } from 'react';
import { CropInfo } from '../types/crop';
import { CROPS_DATABASE } from '../data/crops';
import { Language } from '../types/agri';
import { CropDetailsModal } from './CropDetailsModal';
import { TRANSLATIONS } from '../data/translations';
import {
  Sprout,
  Search,
  Filter,
  Thermometer,
  Droplets,
  Calendar,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

interface CropGuideViewProps {
  language: Language;
}

export const CropGuideView: React.FC<CropGuideViewProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCrop, setActiveCrop] = useState<CropInfo | null>(null);
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.crop_all || 'All Crops' },
    { id: 'Vegetable', label: t.crop_vegetable || 'Vegetables' },
    { id: 'Fruit & Horticulture', label: t.crop_fruit || 'Fruits / Horticulture' },
    { id: 'Cash Crop', label: t.crop_cash || 'Cash Crops' },
    { id: 'Cereal / Grain', label: t.crop_cereal || 'Cereals / Grains' },
    { id: 'Pulse / Oilseed', label: t.crop_pulse || 'Pulses & Oilseeds' }
  ];

  const filteredCrops = CROPS_DATABASE.filter((crop) => {
    const matchesCat = selectedCategory === 'all' || crop.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      crop.name.toLowerCase().includes(q) ||
      crop.scientificName.toLowerCase().includes(q) ||
      crop.localNameMr.toLowerCase().includes(q) ||
      crop.idealSoil.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-agri-100 dark:bg-agri-950 text-agri-700 dark:text-agri-400">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {t.crop_guide_title || 'Crop Intelligence Guide & Agronomy Handbook'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                  {t.crop_guide_subtitle || 'Comprehensive agronomic data, optimal soil pH, critical growth stages, nutrient schedules, and pest/disease management for major crops.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.crop_search_placeholder || 'Search crop by name...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-agri-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Type:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-agri-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Header Category Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 border border-agri-200 dark:border-agri-800">
                  {crop.category}
                </span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {crop.durationDays}
                </span>
              </div>

              {/* Crop Name */}
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {crop.name}
                {(language === 'mr' || language === 'hi') && (
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {' '}({crop.localNameMr})
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic mt-0.5">
                {crop.scientificName}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-2 my-4 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                    <span>Temp Range</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white mt-1 text-[11px] truncate">
                    {crop.tempRangeC}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>Soil pH</span>
                  </div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-300 mt-1 text-[11px] truncate">
                    pH {crop.idealSoilPh}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Stages</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white mt-1 text-[11px]">
                    {crop.criticalGrowthStages.length} Growth Stages
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Target Yield</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white mt-1 text-[11px] truncate">
                    {crop.yieldPerAcre}
                  </p>
                </div>
              </div>

              {/* Major Pests Teaser */}
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                  <strong>Key Pests:</strong> {crop.majorPests.map((p) => p.name.split(' (')[0]).join(', ')}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                  <strong>Key Diseases:</strong> {crop.majorDiseases.map((d) => d.name.split(' (')[0]).join(', ')}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveCrop(crop)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-2xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-colors shadow-2xs"
              >
                <Info className="w-4 h-4" />
                <span>{t.crop_view_details || 'View Full Agronomy Roadmap'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <CropDetailsModal
        crop={activeCrop}
        onClose={() => setActiveCrop(null)}
        language={language}
      />
    </div>
  );
};
