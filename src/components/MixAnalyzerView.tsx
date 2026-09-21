import React, { useState } from 'react';
import { AgriProduct, Language, MixAnalysisResult } from '../types/agri';
import { analyzeTankMix } from '../engine/mixEngine';
import { TRANSLATIONS } from '../data/translations';
import {
  FlaskConical,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Plus,
  Trash2,
  ShieldCheck,
  Beaker,
  Database,
  Check
} from 'lucide-react';
import { isSupabaseConfigured, saveTankMixToSupabase } from '../lib/supabase';

interface MixAnalyzerViewProps {
  selectedProducts: AgriProduct[];
  allProducts: AgriProduct[];
  onAddProduct: (product: AgriProduct) => void;
  onRemoveProduct: (productId: string) => void;
  onClearTank: () => void;
  onSelectPreset: (productIds: string[]) => void;
  language: Language;
}

export const MixAnalyzerView: React.FC<MixAnalyzerViewProps> = ({
  selectedProducts,
  allProducts,
  onAddProduct,
  onRemoveProduct,
  onClearTank,
  onSelectPreset,
  language
}) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [isMixSaved, setIsMixSaved] = useState(false);
  const [isSavingMix, setIsSavingMix] = useState(false);

  const handleSaveTankMix = async () => {
    if (!isSupabaseConfigured) {
      alert('Please connect Supabase first using the Supabase button in the top navigation.');
      return;
    }
    setIsSavingMix(true);
    try {
      const mixName = selectedProducts.map((p) => p.brandName || p.name).join(' + ');
      await saveTankMixToSupabase({
        mix_name: mixName,
        overall_status: analysis.overallStatus,
        safety_score: analysis.safetyScore,
        products: selectedProducts.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          formulation: p.formulation
        })),
        critical_warnings: analysis.criticalWarnings,
        conditional_notes: analysis.conditionalNotes
      });
      setIsMixSaved(true);
      setTimeout(() => setIsMixSaved(false), 3000);
    } catch (err: any) {
      console.error(err);
      alert(`Could not save to Supabase: ${err?.message || 'Please check database tables or run supabase_schema.sql'}`);
    } finally {
      setIsSavingMix(false);
    }
  };

  // Run deterministic mix engine
  const analysis: MixAnalysisResult = analyzeTankMix(selectedProducts);

  // Available products not yet in tank
  const availableToAdd = allProducts.filter(
    (p) => !selectedProducts.some((sp) => sp.id === p.id)
  );

  const filteredAvailable = availableToAdd.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.activeIngredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Banner & Quick Presets */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-agri-100 dark:bg-agri-950 text-agri-700 dark:text-agri-400">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t.nav_mix_analyzer}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select 2 to 10 agricultural inputs to evaluate chemical interactions, precipitation risk, and WALES mixing sequence.
            </p>
          </div>

          {selectedProducts.length > 0 && (
            <button
              onClick={onClearTank}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800 transition-colors self-start md:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t.btn_clear_selection}
            </button>
          )}
        </div>

        {/* Demo Preset Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
            Try Demo Agronomic Test Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSelectPreset(['prod-calcium-nitrate', 'prod-magnesium-sulphate', 'prod-mkp-05234'])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              🔴 Test: Insoluble Gypsum & Phosphate Lock (Ca + MgSO4 + MKP)
            </button>

            <button
              onClick={() => onSelectPreset(['prod-copper-oxychloride', 'prod-mkp-05234', 'prod-ga3-pgr'])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              🔴 Test: Copper Fungicide Acidification & Scorch (COC + MKP + GA3)
            </button>

            <button
              onClick={() => onSelectPreset(['prod-mancozeb-75wp', 'prod-imidacloprid-178sl', 'prod-zinc-edta', 'prod-silicon-adjuvant'])}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              🟢 Test: Safe Multi-Pest + Nutrition Combo (Mancozeb + Imida + Zn-EDTA + Silicon)
            </button>
          </div>
        </div>
      </div>

      {/* Selected Products Tray (Chips) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span>{t.selected_products}</span>
            <span className="px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 dark:bg-agri-950 dark:text-agri-300 text-xs font-bold">
              {selectedProducts.length} / 10 Max
            </span>
          </h3>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs sm:text-sm border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <Beaker className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
            {t.empty_tank_prompt}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {selectedProducts.map((p, idx) => (
              <div
                key={p.id}
                className="inline-flex items-center gap-2 pl-3 pr-2 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white shadow-2xs animate-scale-in"
              >
                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-300">
                  {idx + 1}
                </span>
                <span>{p.name}</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800">
                  {p.formulation}
                </span>
                <button
                  onClick={() => onRemoveProduct(p.id)}
                  className="p-1 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  title="Remove from tank"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Products Quick Selector */}
        {selectedProducts.length < 10 && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search additional products to add to tank..."
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-agri-500"
              />
            </div>

            {searchTerm && filteredAvailable.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto space-y-1.5 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200 dark:border-slate-700">
                {filteredAvailable.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onAddProduct(p);
                      setSearchTerm('');
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-agri-50 dark:hover:bg-agri-950/40 cursor-pointer border border-slate-200/60 dark:border-slate-700 text-xs transition-colors"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                      <span className="text-slate-400 ml-2">({p.formulation} · {p.category})</span>
                    </div>
                    <span className="text-xs font-bold text-agri-600 dark:text-agri-400 flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ANALYSIS RESULTS SECTION (When >= 2 items) */}
      {selectedProducts.length >= 2 && (
        <div className="space-y-6">
          {/* Overall Compatibility Result Hero Card */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 shadow-md transition-all ${
              analysis.overallStatus === 'compatible'
                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                : analysis.overallStatus === 'conditional'
                ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800'
                : analysis.overallStatus === 'insufficient_data'
                ? 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    analysis.overallStatus === 'compatible'
                      ? 'bg-emerald-600 text-white'
                      : analysis.overallStatus === 'conditional'
                      ? 'bg-amber-600 text-white'
                      : analysis.overallStatus === 'insufficient_data'
                      ? 'bg-slate-600 text-white'
                      : 'bg-rose-600 text-white'
                  }`}
                >
                  {analysis.overallStatus === 'compatible' && <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />}
                  {analysis.overallStatus === 'conditional' && <AlertTriangle className="w-8 h-8 stroke-[2.5]" />}
                  {analysis.overallStatus === 'insufficient_data' && <HelpCircle className="w-8 h-8 stroke-[2.5]" />}
                  {analysis.overallStatus === 'incompatible' && <XCircle className="w-8 h-8 stroke-[2.5]" />}
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {t.overall_compatibility}
                  </span>
                  <h3
                    className={`text-2xl font-black mt-0.5 ${
                      analysis.overallStatus === 'compatible'
                        ? 'text-emerald-900 dark:text-emerald-200'
                        : analysis.overallStatus === 'conditional'
                        ? 'text-amber-900 dark:text-amber-200'
                        : analysis.overallStatus === 'insufficient_data'
                        ? 'text-slate-900 dark:text-slate-200'
                        : 'text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    {analysis.overallStatus === 'compatible' && t.status_compatible}
                    {analysis.overallStatus === 'conditional' && t.status_conditional}
                    {analysis.overallStatus === 'insufficient_data' && t.status_insufficient_data}
                    {analysis.overallStatus === 'incompatible' && t.status_incompatible}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {analysis.overallStatus === 'compatible' &&
                      'All selected products are verified chemically and physically compatible under standard dilution rates. Follow the WALES tank mixing sequence below.'}
                    {analysis.overallStatus === 'conditional' &&
                      'Products may be co-applied only with strict pH management, proper pre-slurrying, and a mandatory 1-Liter Jar Test before tank filling.'}
                    {analysis.overallStatus === 'incompatible' &&
                      'CRITICAL ANTAGONISM DETECTED: Chemical precipitation, phytotoxicity, or nutrient lockup will occur if mixed. Separate into distinct applications.'}
                    {analysis.overallStatus === 'insufficient_data' &&
                      'No direct registered label conflict found, but official agronomic co-application trial data is limited. A physical jar test is mandatory before mixing.'}
                  </p>
                </div>
              </div>

              {/* Safety Score Gauge */}
              <div className="bg-white/80 dark:bg-slate-900/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-center shrink-0 self-center sm:self-auto min-w-[130px]">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Safety Index
                </span>
                <div
                  className={`text-3xl font-black mt-1 ${
                    analysis.safetyScore >= 80
                      ? 'text-emerald-600'
                      : analysis.safetyScore >= 60
                      ? 'text-amber-600'
                      : 'text-rose-600'
                  }`}
                >
                  {analysis.safetyScore}%
                </div>
                <span className="text-[10px] font-medium text-slate-500">
                  {analysis.safetyScore >= 80 ? 'Low Risk' : analysis.safetyScore >= 60 ? 'Medium Risk' : 'High Risk'}
                </span>

                {/* Save to Supabase Cloud Button */}
                <button
                  onClick={handleSaveTankMix}
                  disabled={isSavingMix}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition-all shadow-xs disabled:opacity-50"
                  title="Save this tank mixture to Supabase database"
                >
                  {isMixSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-3.5 h-3.5" />
                      <span>{isSavingMix ? 'Saving...' : 'Save to Cloud'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* pH Lock Warning if any */}
            {analysis.phLockWarning && (
              <div className="mt-5 p-3.5 rounded-2xl bg-amber-100/70 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{analysis.phLockWarning}</span>
              </div>
            )}
          </div>

          {/* Pairwise Interaction Grid */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-agri-600" />
              {t.pairwise_breakdown} ({analysis.pairwiseInteractions.length} Pairs Checked)
            </h3>

            <div className="space-y-3">
              {analysis.pairwiseInteractions.map(({ productA, productB, interaction }, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all ${
                    interaction.status === 'incompatible'
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                      : interaction.status === 'conditional'
                      ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900'
                      : interaction.status === 'insufficient_data'
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <span>{productA.name}</span>
                      <span className="text-slate-400 font-normal">+</span>
                      <span>{productB.name}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        interaction.status === 'incompatible'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                          : interaction.status === 'conditional'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                          : interaction.status === 'insufficient_data'
                          ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                      }`}
                    >
                      {interaction.status === 'incompatible' && <XCircle className="w-3.5 h-3.5" />}
                      {interaction.status === 'conditional' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {interaction.status === 'compatible' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {interaction.status === 'insufficient_data' && <HelpCircle className="w-3.5 h-3.5" />}
                      <span className="capitalize">{interaction.status.replace('_', ' ')}</span>
                    </span>
                  </div>

                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-2 text-xs sm:text-sm">
                    {interaction.primaryReason}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {interaction.detailedExplanation}
                  </p>

                  {interaction.chemicalMechanism && (
                    <div className="mt-2 font-mono text-[11px] bg-slate-900 text-emerald-300 dark:bg-slate-950 p-2 rounded-lg border border-slate-800">
                      🔬 {interaction.chemicalMechanism}
                    </div>
                  )}

                  <div className="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Evidence Source: <strong>{interaction.verifiedSource.replace(/_/g, ' ')}</strong></span>
                    {interaction.jarTestRequired && (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold">
                        Jar Test Required
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WALES Mixing Sequence Recommended for Selected Products */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.mixing_sequence_title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Follow this exact step-by-step tank loading order for your selected inputs:
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Step 0: Water */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800/60 text-xs">
                <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
                  W
                </span>
                <div>
                  <span className="font-bold text-blue-900 dark:text-blue-300">Base Water Charge:</span>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">
                    Fill spray tank with 60% to 70% of total clean water volume and start continuous mechanical agitation.
                  </p>
                </div>
              </div>

              {/* Dynamic sorted products according to WALES order */}
              {analysis.mixingSequence.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-xs"
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                      <span>{prod.name}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {prod.formulation} ({prod.formulationFullName})
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                      {prod.formulation === 'WP' || prod.formulation === 'WDG'
                        ? 'Pre-slurry in a separate bucket of water before pouring into spray tank.'
                        : prod.formulation === 'EC'
                        ? 'Add slowly into agitated tank after powders are fully dispersed.'
                        : 'Pre-dissolve completely and add to tank.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safer Alternatives & Jar Test Checklist */}
          {analysis.saferAlternatives.length > 0 && (
            <div className="p-6 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.safer_alternatives_title}
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                {analysis.saferAlternatives.map((alt, i) => (
                  <li key={i}>• {alt}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Physical Jar Test Simulation Checklist */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Beaker className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              {t.jar_test_title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
              {analysis.jarTestChecklist.map((step, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="font-bold text-agri-600">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
