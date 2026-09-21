import React, { useState } from 'react';
import { FcoFertilizerEntry, FCO_REFERENCE_DATABASE } from '../data/fcoGuide';
import { Language } from '../types/agri';
import {
  BookMarked,
  Search,
  Filter,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface FcoGuideViewProps {
  language: Language;
}

export const FcoGuideView: React.FC<FcoGuideViewProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeEntry, setActiveEntry] = useState<FcoFertilizerEntry | null>(null);

  const categories = [
    { id: 'all', label: 'All Fertilizer Categories (सर्व खत प्रकार)' },
    { id: 'Straight / Primary', label: 'Straight / Primary (सरळ खते: Urea, DAP, MOP, SSP)' },
    { id: 'Complex / Compound', label: 'Complex & NPK (मिश्र खते: 10:26:26, 20:20:0:13, 12:32:16)' },
    { id: 'Secondary & Amendments', label: 'Soil Amendments (जिप्सम, चुना, डोलोमाईट, सल्फर)' },
    { id: 'Micronutrients', label: 'Micronutrients (झिंक, बोरॉन, फेरस, मँगेनीज)' },
    { id: 'Organic & Biofertilizers', label: 'Organic & Bio-inputs (PROM, रायझोबियम, PSB, VAM)' },
    { id: 'Specialty & Fortified', label: 'Specialty & Nano (नॅनो युरिया, कस्टमाईज्ड खते)' }
  ];

  const filteredEntries = FCO_REFERENCE_DATABASE.filter((entry) => {
    const matchesCat = selectedCategory === 'all' || entry.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      entry.name.toLowerCase().includes(q) ||
      entry.gradeOrAnalysis.toLowerCase().includes(q) ||
      entry.whatItSupplies.toLowerCase().includes(q) ||
      entry.typicalPlanningContext.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Hero Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <BookMarked className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    India Fertilizer Reference Guide
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-agri-100 text-agri-800 dark:bg-agri-950 dark:text-agri-300 border border-agri-300 dark:border-agri-800">
                    FCO Framework
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  A practical catalogue of common Indian fertilizer types, commercial grades, nutrient percentages, and safe-use context under the Fertiliser (Control) Order (FCO).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: How to read Fertilizer Grades Banner */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-agri-600" />
            How to Read Fertilizer Grades (N-P-K-S Formulation Guide)
          </h3>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>N-P-K grades</strong> show the percentage of Total Nitrogen (N), Available Phosphate (P2O5), and Water-Soluble Potash (K2O). A fourth number represents Sulphur (S).
            <br />
            <em>Example: <strong>20:20:0:13</strong> indicates 20% Nitrogen, 20% P2O5, 0% Potash, and 13% Sulphur.</em>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-blue-700 dark:text-blue-400 block">Nitrogen (N)</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Vegetative growth, leaf greening, proteins. Deficiency: older leaf yellowing.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 block">Phosphorus (P)</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Root development, early vigor, energy (ATP). Strongly dependent on soil pH.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-amber-700 dark:text-amber-400 block">Potassium (K)</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Water balance, stress tolerance, fruit size & brix. Deficiency: leaf margin scorch.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="font-extrabold text-yellow-700 dark:text-yellow-400 block">Sulphur (S)</span>
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Amino acids, oil formation in oilseeds/onion. Deficiency: pale yellow younger leaves.</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fertilizer by name, grade, or nutrient (e.g., Urea, DAP, 10:26:26, Gypsum, Zinc)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-agri-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Group:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-agri-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fertilizer Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category & Status Badges */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {entry.category}
                </span>
                {entry.fcoStandardNote && (
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    {entry.fcoStandardNote}
                  </span>
                )}
              </div>

              {/* Fertilizer Name & Analysis */}
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                {entry.name}
              </h3>
              <div className="mt-2 inline-block px-2.5 py-1 rounded-lg bg-agri-50 dark:bg-agri-950 text-agri-900 dark:text-agri-300 font-extrabold text-xs border border-agri-200 dark:border-agri-800">
                Grade: {entry.gradeOrAnalysis}
              </div>

              {/* What it supplies */}
              <div className="mt-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Nutrient Supply:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{entry.whatItSupplies}</p>
              </div>

              {/* Planning context */}
              <div className="mt-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Agronomic Role & Timing:</span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{entry.typicalPlanningContext}</p>
              </div>
            </div>

            {/* Handling & Safety Note */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-950 dark:text-amber-200">
                <span className="font-bold flex items-center gap-1 mb-0.5 text-amber-900 dark:text-amber-300">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  Handling & Compatibility Advice:
                </span>
                <p className="text-[11px] leading-relaxed text-amber-900/90 dark:text-amber-300/90">
                  {entry.handlingAndSafetyNotes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section: FCO Official Decision Rules Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <h3 className="text-base sm:text-lg font-black flex items-center gap-2 mb-3 text-emerald-400">
          <ShieldCheck className="w-5 h-5" />
          Key Safety & Regulatory Compatibility Rules (India FCO Standard)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700">
            <span className="font-bold text-rose-300 block mb-1">1. Calcium + Phosphate / Sulphate Rule:</span>
            <p className="text-slate-300 leading-relaxed">
              Potential mineral precipitation risk exists (insoluble Gypsum & Dicalcium phosphate). Always keep calcium sources separate from phosphates and sulphates unless certified by product label.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700">
            <span className="font-bold text-amber-300 block mb-1">2. "Insufficient Verified Data" Protocol:</span>
            <p className="text-slate-300 leading-relaxed">
              When pairwise manufacturer data is missing, the system strictly outputs "Insufficient verified data". Never assume tank compatibility without a physical 1-liter jar test.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700">
            <span className="font-bold text-blue-300 block mb-1">3. Foliar vs Fertigation vs Soil Grades:</span>
            <p className="text-slate-300 leading-relaxed">
              Never use soil broadcasting fertilizers (e.g. granular DAP, MOP) for foliar sprays or drip lines without labeled solubility certification, as biuret, heavy salts, and insoluble coatings will damage nozzles and leaves.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700">
            <span className="font-bold text-emerald-300 block mb-1">4. Official Regulatory Citation:</span>
            <p className="text-slate-300 leading-relaxed">
              Government of India, Department of Fertilizers, Fertiliser (Control) Order (FCO) framework. Schedule I covers notified chemical specifications, biofertilizers, and organic inputs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
