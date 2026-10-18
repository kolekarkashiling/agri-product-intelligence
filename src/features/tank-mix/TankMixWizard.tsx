import React from 'react';
import { 
  Sprout, Plus, Droplets, CheckSquare, Sparkles, 
  RotateCcw, Check, ChevronRight, Layers, ShieldCheck 
} from 'lucide-react';
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
  { step: 1, label: '1. Crop Target', icon: Sprout, desc: 'Target crop & stage' },
  { step: 2, label: '2. Select Chemicals', icon: Plus, desc: 'Tank input selection' },
  { step: 3, label: '3. Calibrate Doses', icon: Droplets, desc: 'Field rates & water' },
  { step: 4, label: '4. Review & Verify', icon: CheckSquare, desc: 'Pre-spray checklist' },
  { step: 6, label: '5. Analysis Result', icon: Sparkles, desc: 'WALES & compatibility' }
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

  // Compute progress percentage
  const getProgressPercentage = () => {
    if (state.currentStep === 1) return 20;
    if (state.currentStep === 2) return 40;
    if (state.currentStep === 3) return 60;
    if (state.currentStep === 4) return 80;
    return 100;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* ── Flagship Pro Stepper HUD ─────────────────────────── */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 sm:p-5 shadow-xs">
        {/* Progress Bar Line */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Stepper Steps Row */}
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none gap-2 py-1">
          {STEPS_NAV.map((s, idx) => {
            const Icon = s.icon;
            const isResults = s.step === 6;
            const isActive = isResults ? (state.currentStep === 6 || state.currentStep === 7) : state.currentStep === s.step;
            const isCompleted = isResults ? false : state.currentStep > s.step;
            const canJump = s.step <= state.currentStep || (s.step === 2 && state.selectedCrop);

            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => {
                    if (canJump) {
                      setStep(s.step as any);
                    }
                  }}
                  disabled={!canJump}
                  className={`
                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 select-none
                    ${isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/20 scale-102 ring-2 ring-emerald-500/30'
                      : isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 cursor-pointer'
                        : 'text-slate-400 dark:text-slate-500 opacity-60 cursor-not-allowed'
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800'
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>

                  <div className="text-left">
                    <span className="block leading-none">{s.label.split('. ')[1]}</span>
                  </div>
                </button>

                {idx < STEPS_NAV.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Context Bar */}
        {(state.selectedCrop || state.selectedProducts.length > 0) && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <div className="flex items-center gap-3">
              {state.selectedCrop && (
                <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <Sprout className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Crop: <strong className="text-emerald-600 dark:text-emerald-400">{state.selectedCrop}</strong> ({state.sprayStage})</span>
                </span>
              )}
              {state.selectedProducts.length > 0 && (
                <span className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>Tank: <strong className="text-teal-600 dark:text-teal-400">{state.selectedProducts.length}</strong> items ({state.waterVolumeL}L)</span>
                </span>
              )}
            </div>

            <button
              onClick={resetMix}
              className="text-[11px] font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
              title="Reset entire tank mix workflow"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Mix</span>
            </button>
          </div>
        )}
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
