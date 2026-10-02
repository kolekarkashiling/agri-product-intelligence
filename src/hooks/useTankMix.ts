import { useState, useCallback } from 'react';
import { AgriProduct } from '../types/agri';
import { TankMixFormState, SelectedTankProduct, TankMixStep } from '../types/tankMix.types';
import { evaluateTankMixCompatibility } from '../engine/compatibilityEngine';
import { analysisService, SavedAnalysisComplete } from '../services/analysis.service';

const INITIAL_STATE: TankMixFormState = {
  currentStep: 1,
  selectedCrop: 'Cotton (Kapas)',
  selectedCropVariety: 'Bt Cotton',
  sprayStage: 'Vegetative to Square Formation',
  targetAcreage: 1,
  waterVolumeL: 200,
  selectedProducts: [],
  mixName: '',
  analysisResult: null,
  isAnalyzing: false,
  isSaving: false
};

export function useTankMix() {
  const [state, setState] = useState<TankMixFormState>(INITIAL_STATE);

  const setStep = useCallback((step: TankMixStep) => {
    setState((prev) => ({ ...prev, currentStep: step, errorMessage: undefined }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 7) as TankMixStep,
      errorMessage: undefined
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1) as TankMixStep,
      errorMessage: undefined
    }));
  }, []);

  const setCrop = useCallback((crop: string, variety?: string, stage?: string) => {
    setState((prev) => ({
      ...prev,
      selectedCrop: crop,
      selectedCropVariety: variety || prev.selectedCropVariety,
      sprayStage: stage || prev.sprayStage
    }));
  }, []);

  const addProduct = useCallback((product: AgriProduct) => {
    setState((prev) => {
      if (prev.selectedProducts.some((p) => p.product.id === product.id)) {
        return prev;
      }
      if (prev.selectedProducts.length >= 8) {
        return { ...prev, errorMessage: 'Maximum 8 products allowed in single tank mix.' };
      }
      const newSelected: SelectedTankProduct = {
        product,
        dose: product.defaultDosePerLitre || 2.0,
        unit: (product.standardUnit as any) || 'ml/L',
        waterVolumeLitres: prev.waterVolumeL
      };
      return {
        ...prev,
        selectedProducts: [...prev.selectedProducts, newSelected],
        errorMessage: undefined
      };
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter((p) => p.product.id !== productId)
    }));
  }, []);

  const updateProductDose = useCallback((productId: string, dose: number, unit?: SelectedTankProduct['unit']) => {
    setState((prev) => ({
      ...prev,
      selectedProducts: prev.selectedProducts.map((p) => {
        if (p.product.id === productId) {
          return {
            ...p,
            dose,
            unit: unit || p.unit
          };
        }
        return p;
      })
    }));
  }, []);

  const setWaterVolume = useCallback((litres: number) => {
    setState((prev) => ({ ...prev, waterVolumeL: litres }));
  }, []);

  const setMixName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, mixName: name }));
  }, []);

  // Run Compatibility Decision Engine
  const runAnalysis = useCallback(async () => {
    if (state.selectedProducts.length === 0) {
      setState((prev) => ({ ...prev, errorMessage: 'Please add at least 1 product to analyze.' }));
      return;
    }

    setState((prev) => ({ ...prev, isAnalyzing: true, errorMessage: undefined }));

    try {
      // Simulate fast calculation for UI responsiveness
      const result = await evaluateTankMixCompatibility(
        state.selectedProducts,
        state.selectedCrop,
        state.waterVolumeL
      );

      setState((prev) => ({
        ...prev,
        analysisResult: result,
        currentStep: 6, // Go directly to result explanation
        isAnalyzing: false,
        mixName: prev.mixName || `${prev.selectedCrop} Mix - ${new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}`
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isAnalyzing: false,
        errorMessage: err.message || 'Analysis calculation failed.'
      }));
    }
  }, [state.selectedProducts, state.selectedCrop, state.waterVolumeL]);

  // Save Analysis to Database/Storage
  const saveAnalysis = useCallback(async (userEmail?: string, userId?: string) => {
    if (!state.analysisResult) return;

    setState((prev) => ({ ...prev, isSaving: true }));
    try {
      const savedId = await analysisService.saveCompleteAnalysis(state, userEmail, userId);
      setState((prev) => ({
        ...prev,
        savedAnalysisId: savedId,
        currentStep: 7, // Reached saved state
        isSaving: false
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isSaving: false,
        errorMessage: err.message || 'Failed to save analysis.'
      }));
    }
  }, [state]);

  // Reopen existing analysis from history
  const loadSavedAnalysis = useCallback((saved: SavedAnalysisComplete, allProducts: AgriProduct[]) => {
    const products: SelectedTankProduct[] = saved.products.map((item) => {
      const existing = allProducts.find((p) => p.id === item.product_id || p.name === item.product_name);
      const matched: AgriProduct = existing || {
        id: item.product_id || 'prod-unknown',
        name: item.product_name,
        brandName: item.product_name,
        companyName: 'Agronomy Input Brand',
        chemicalName: item.product_name,
        commonName: item.product_name,
        category: (item.product_category as any) || 'fertilizer',
        activeIngredients: item.product_name,
        formulation: (item.formulation as any) || 'SL',
        formulationFullName: item.formulation || 'Soluble Liquid',
        phRange: '6.0 - 7.0',
        idealPh: 6.5,
        standardDose: `${item.dose} ${item.unit}`,
        standardUnit: item.unit,
        defaultDosePerLitre: item.dose,
        purpose: 'Reopened from analysis history',
        modeOfAction: 'Foliar nutrition & crop protection',
        targetCrops: [saved.header.crop_name],
        growthStages: ['Vegetative', 'Flowering'],
        recommendedDosage: { foliar: `${item.dose} ${item.unit}` },
        mixingOrderRank: 3,
        advantages: [],
        limitations: [],
        precautions: [],
        isVerifiedLabel: true,
        rainfastHours: 2,
        tempMinC: 15,
        tempMaxC: 35,
        optimalHumidityMin: 40,
        optimalHumidityMax: 80,
        waterHardnessSensitivity: 'medium'
      };

      return {
        product: matched,
        dose: item.dose,
        unit: item.unit as any
      };
    });

    setState({
      currentStep: 6,
      selectedCrop: saved.header.crop_name,
      sprayStage: saved.header.spray_stage || 'Foliar Spray',
      targetAcreage: 1,
      waterVolumeL: saved.header.water_volume_litres || 200,
      selectedProducts: products,
      mixName: saved.header.mix_name,
      savedAnalysisId: saved.header.id,
      analysisResult: saved.result ? {
        status: saved.result.status,
        issues: saved.result.issues || [],
        mixingSequence: saved.result.wales_order?.map((w: any, idx: number) => ({
          step: w.step || idx + 1,
          walesCode: (w.wales_category?.charAt(0) || 'W') as any,
          walesLabel: w.wales_category || 'WALES Order',
          product: products[idx]?.product || products[0]?.product,
          doseString: w.dose_instruction || `${products[idx]?.dose || 2} ${products[idx]?.unit || 'ml/L'}`,
          instructions: 'Follow standard agitation sequence.'
        })) || [],
        jarTestChecklist: saved.result.jar_test_steps || [],
        safeAlternatives: [],
        summary: saved.result.summary || saved.header.notes || 'Saved analysis loaded.',
        phRisk: 'none'
      } : null,
      isAnalyzing: false,
      isSaving: false
    });
  }, []);

  const resetMix = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return {
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
    loadSavedAnalysis,
    resetMix
  };
}
