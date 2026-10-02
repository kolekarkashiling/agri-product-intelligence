export type ProductCategory = 
  | 'fertilizer'
  | 'micronutrient'
  | 'fungicide'
  | 'insecticide'
  | 'herbicide'
  | 'pgr'
  | 'adjuvant'
  | 'biostimulant';

export type FormulationType = 
  | 'WP'  // Wettable Powder
  | 'WDG' // Water Dispersible Granules
  | 'WG'  // Water Dispersible Granule
  | 'SC'  // Suspension Concentrate (Flowable)
  | 'EC'  // Emulsifiable Concentrate
  | 'SL'  // Soluble Liquid Concentrate
  | 'SP'  // Soluble Powder
  | 'WSF' // Water Soluble Fertilizer
  | 'WSG' // Water Soluble Granule
  | 'WSC' // Water Soluble Concentrate
  | 'WSP' // Water Soluble Powder
  | 'CS'  // Capsule Suspension
  | 'OD'  // Oil Dispersion
  | 'ZC'  // Mixed Formulation of CS and SC
  | 'GR'; // Granules

export interface AgriProduct {
  id: string;
  name: string; // e.g. "Dithane M-45 (Mancozeb 75% WP)"
  brandName: string; // e.g. "Dithane M-45"
  companyName: string; // e.g. "Indofil / UPL"
  chemicalName: string; // e.g. "Mancozeb 75% WP"
  commonName: string;
  category: ProductCategory;
  activeIngredients: string;
  npkOrNutrients?: string;
  formulation: FormulationType;
  formulationFullName: string;
  phRange: string;
  idealPh: number;
  purpose: string;
  modeOfAction: string;
  targetCrops: string[];
  growthStages: string[];
  recommendedDosage: {
    foliar?: string;
    drip?: string;
    drench?: string;
    seedTreatment?: string;
  };
  standardDose?: string;
  standardUnit?: string;
  defaultDosePerLitre?: number;
  mixingOrderRank: number; // 1: Water/Buffering -> 2: Adjuvants -> 3: WP/WDG -> 4: SC -> 5: EC -> 6: SL/WSF
  advantages: string[];
  limitations: string[];
  precautions: string[];
  isVerifiedLabel: boolean;
  isCibRcRegistered?: boolean;
  targetPestsOrDiseases?: string[];
  phiDays?: number;
  reentryIntervalHours?: number;
  safetyPrecaution?: string;
  rainfastHours: number; // minimum dry hours needed after spray
  tempMinC: number;
  tempMaxC: number;
  optimalHumidityMin: number;
  optimalHumidityMax: number;
  waterHardnessSensitivity: 'low' | 'medium' | 'high';
}

export type CompatibilityStatus = 'compatible' | 'conditional' | 'incompatible' | 'insufficient_data';

export interface PairwiseInteraction {
  productAId: string;
  productBId: string;
  status: CompatibilityStatus;
  primaryReason: string;
  detailedExplanation: string;
  chemicalMechanism?: string;
  safeAlternatives?: string[];
  jarTestRequired: boolean;
  verifiedSource: 'CIBRC_Label' | 'University_Agronomy_Trial' | 'Fertilizer_Control_Order' | 'Manufacturer_Bulletin' | 'Experimental';
}

export interface MixAnalysisResult {
  overallStatus: CompatibilityStatus;
  safetyScore: number; // 0 to 100
  pairwiseInteractions: {
    productA: AgriProduct;
    productB: AgriProduct;
    interaction: PairwiseInteraction;
  }[];
  criticalWarnings: string[];
  conditionalNotes: string[];
  mixingSequence: AgriProduct[];
  jarTestChecklist: string[];
  saferAlternatives: string[];
  phShiftRisk: 'none' | 'mild' | 'severe';
  phLockWarning?: string;
}

export interface WeatherConditionInput {
  crop: string;
  growthStage: string;
  temperatureC: number;
  relativeHumidityPercent: number;
  windSpeedKmh: number;
  rainForecastHours: number; // hours until next expected rain
  soilMoisture: 'dry' | 'moderate' | 'optimal' | 'waterlogged';
  irrigationMethod: 'foliar' | 'drip' | 'drench';
  waterPh: number; // 4 to 10
  waterHardnessPpm: number; // ppm CaCO3
}

export type ConditionSuitability = 'best' | 'suitable' | 'caution' | 'avoid';

export interface ConditionEvaluationResult {
  overallSuitability: ConditionSuitability;
  suitabilityScore: number; // 0 to 100
  deltaT: number; // Delta T in Celsius
  deltaTStatus: 'ideal' | 'marginal_low' | 'marginal_high' | 'poor_evaporation' | 'poor_droplet_survival';
  driftRisk: 'low' | 'moderate' | 'high' | 'severe';
  rainfastRisk: 'safe' | 'borderline' | 'washout_imminent';
  waterQualityIssues: string[];
  recommendations: string[];
  contraindications: string[];
  bestApplicationWindow: string;
}

export type Language = 'en' | 'mr' | 'hi';
