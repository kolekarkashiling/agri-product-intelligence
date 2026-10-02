export interface CropStageInfo {
  stageName: string;
  durationDays: string;
  keyActivities: string;
  recommendedNutrients: string;
  vulnerablePestsAndDiseases: string;
}

export interface CropInfo {
  id: string;
  name: string;
  scientificName: string;
  localNameMr: string;
  category: 'Vegetable' | 'Fruit & Horticulture' | 'Cash Crop' | 'Cereal / Grain' | 'Pulse / Oilseed' | 'Fruit / Vine' | 'Vegetable / Tuber' | 'Vegetable / Bulb' | 'Fruit' | 'Spice / Cash Crop' | 'Oilseed / Legume' | 'Cucurbit' | 'Spice' | 'Pulse' | 'Cereal';
  idealSoil: string;
  idealSoilPh: string;
  tempRangeC: string;
  waterRequirementMm: string;
  seedRatePerAcre: string;
  spacing: string;
  durationDays: string;
  yieldPerAcre: string;
  criticalGrowthStages: CropStageInfo[];
  majorPests: { name: string; symptoms: string; management: string }[];
  majorDiseases: { name: string; symptoms: string; management: string }[];
  fertigationSchedule: { stage: string; products: string; dose: string }[];
  harvestingTips: string[];
}
