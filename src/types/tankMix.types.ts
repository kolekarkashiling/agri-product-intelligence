import { AgriProduct } from './agri';
import { AnalysisIssue } from './database.types';

export type TankMixStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SelectedTankProduct {
  product: AgriProduct;
  dose: number;
  unit: 'ml/L' | 'g/L' | 'kg/acre' | 'L/acre' | 'ml/pump' | 'g/pump';
  pumpCapacityL?: number; // e.g. 15L or 16L knapsack
  waterVolumeLitres?: number;
  customNotes?: string;
}

export interface TankMixDecisionResult {
  status: 'compatible' | 'caution' | 'conflict';
  issues: AnalysisIssue[];
  mixingSequence: Array<{
    step: number;
    walesCode: 'W' | 'A' | 'L' | 'E' | 'S';
    walesLabel: string;
    product: AgriProduct;
    doseString: string;
    instructions: string;
  }>;
  jarTestChecklist: string[];
  safeAlternatives: string[];
  summary: string;
  phRisk: 'none' | 'mild' | 'severe';
  phWarning?: string;
  cropSensitivityNote?: string;
}

export interface TankMixFormState {
  currentStep: TankMixStep;
  selectedCrop: string;
  selectedCropVariety?: string;
  sprayStage?: string;
  targetAcreage: number;
  waterVolumeL: number;
  selectedProducts: SelectedTankProduct[];
  mixName: string;
  analysisResult: TankMixDecisionResult | null;
  savedAnalysisId?: string;
  isAnalyzing: boolean;
  isSaving: boolean;
  errorMessage?: string;
}
