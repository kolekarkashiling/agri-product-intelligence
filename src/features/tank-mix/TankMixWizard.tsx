import React from 'react';
import { Sprout, Plus, Droplets, CheckSquare, Sparkles, FileText, BookmarkCheck } from 'lucide-react';
import { AgriProduct, Language } from '../../types/agri';
import { useTankMix } from '../../hooks/useTankMix';
import { StepCropSelect } from './components/StepCropSelect';
import { StepProductSelect } from './components/StepProductSelect';
import { StepDoseEntry } from './components/StepDoseEntry';
import { StepReviewMix } from './components/StepReviewMix';
import { StepAnalysisResult } from './components/StepAnalysisResult';

interface TankMixWizardProps {
  allProducts: AgriProduct[];
  language: Language;
  initialSelectedProducts?: AgriProduct[];
  userEmail?: string;
  userId?: string;
}

const STEPS_NAV = [
  { step: 1, label: 'Crop', icon: Sprout },
  { step: 2, label: 'Products', icon: Plus },
  { step: 3, label: 'Doses', icon: Droplets },
  { step: 4, label: 'Review', icon: CheckSquare },
  { step: 6, label: 'Results', icon: Sparkles }
];

export function TankMixWizard({
  allProducts,
  language,
  initialSelectedProducts,
  userEmail,
  userId
}: TankMixWizardProps) {
  const {
    state,
    setStep,
    nextStep,
    prevStep,
    setCrop,
    addProduct,
    removeProduct,
    updateProductDose,
    setWaterVolume,
    setMixName,
    runAnalysis,
    saveAnalysis,
    resetMix
  } = useTankMix();

  // If initial products passed in from catalogue
  React.useEffect(() => {
    if (initialSelectedProducts && initialSelectedProducts.length > 0 && state.selectedProducts.length === 0) {
      initialSelectedProducts.forEach((p) => addProduct(p));
      if (state.currentStep === 1) {
        setStep(2);
      }
    }
  }, [initialSelectedProducts]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* ── Top Stepper Bar ──────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none px-2 py-1">
          {STEPS_NAV.map((s, idx) => {
            const Icon = s.icon;
            const isActive = state.currentStep === s.step;
            const isCompleted = state.currentStep > s.step;

            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => {
                    // Allow navigating back or forward if valid
                    if (s.step <= state.currentStep || (s.step === 2 && state.selectedCrop)) {
                      setStep(s.step as any);
                    }
                  }}
                  className={`
                    flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all shrink-0
                    ${isActive
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/20'
                      : isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100'
                        : 'text-slate-400 dark:text-slate-600 opacity-60'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">Step {s.step}:</span>
                  <span>{s.label}</span>
                </button>

                {idx < STEPS_NAV.length - 1 && (
                  <div
                    className={`
                      h-0.5 w-6 sm:w-10 rounded-full mx-1 shrink-0
                      ${state.currentStep > s.step ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Active Step View ─────────────────────────────────── */}
      {state.currentStep === 1 && (
        <StepCropSelect
          selectedCrop={state.selectedCrop}
          sprayStage={state.sprayStage}
          onSelectCrop={(crop, variety, stage) => {
            setCrop(crop, variety, stage);
            setStep(2);
          }}
          onNext={() => setStep(2)}
        />
      )}

      {state.currentStep === 2 && (
        <StepProductSelect
          allProducts={allProducts}
          selectedProducts={state.selectedProducts}
          selectedCrop={state.selectedCrop}
          onAddProduct={addProduct}
          onRemoveProduct={removeProduct}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {state.currentStep === 3 && (
        <StepDoseEntry
          selectedProducts={state.selectedProducts}
          selectedCrop={state.selectedCrop}
          waterVolumeL={state.waterVolumeL}
          onUpdateDose={updateProductDose}
          onUpdateWaterVolume={setWaterVolume}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {state.currentStep === 4 && (
        <StepReviewMix
          selectedCrop={state.selectedCrop}
          selectedProducts={state.selectedProducts}
          waterVolumeL={state.waterVolumeL}
          isAnalyzing={state.isAnalyzing}
          onAnalyze={runAnalysis}
          onBack={() => setStep(3)}
        />
      )}

      {(state.currentStep === 6 || state.currentStep === 7) && state.analysisResult && (
        <StepAnalysisResult
          selectedCrop={state.selectedCrop}
          selectedProducts={state.selectedProducts}
          waterVolumeL={state.waterVolumeL}
          result={state.analysisResult}
          mixName={state.mixName}
          isSaving={state.isSaving}
          savedAnalysisId={state.savedAnalysisId}
          onSave={(name) => {
            setMixName(name);
            saveAnalysis(userEmail, userId);
          }}
          onReset={resetMix}
        />
      )}
    </div>
  );
}
