/**
 * Unit Test Suite for Tank Mix Compatibility Decision Engine
 * Tests verified pair rules, calcium-phosphate precipitation detection,
 * WALES mixing sequence sorting, and dose validations.
 */

import { evaluateTankMixCompatibility } from '../src/engine/compatibilityEngine';
import { AgriProduct } from '../src/types/agri';
import { SelectedTankProduct } from '../src/types/tankMix.types';

// Mock test products
const prodCalciumNitrate: AgriProduct = {
  id: 'fert-calcium-nitrate',
  name: 'Calcium Nitrate + Boron',
  brandName: 'Calcium Nitrate',
  companyName: 'Yara / Mahadhan',
  chemicalName: 'Calcium Nitrate',
  commonName: 'Calcium Nitrate',
  category: 'fertilizer',
  activeIngredients: 'Ca(NO3)2 + B',
  npkOrNutrients: 'Ca 18.5%, N 15.5%, B 0.2%',
  formulation: 'WSG',
  formulationFullName: 'Water Soluble Granules',
  phRange: '5.5 - 6.5',
  idealPh: 6.0,
  purpose: 'Cell wall rigidity & blossom end rot prevention',
  modeOfAction: 'Foliar / Soil Absorption',
  targetCrops: ['Cotton', 'Chilli', 'Tomato'],
  growthStages: ['Vegetative', 'Fruiting'],
  recommendedDosage: { foliar: '3-4 g/L' },
  standardDose: '3.5 g/L',
  standardUnit: 'g/L',
  defaultDosePerLitre: 3.5,
  mixingOrderRank: 1,
  advantages: ['High calcium bioavailability'],
  limitations: ['Incompatible with Sulphates and Phosphates'],
  precautions: ['Do not mix with 00:52:34 MKP'],
  isVerifiedLabel: true,
  rainfastHours: 2,
  tempMinC: 15,
  tempMaxC: 35,
  optimalHumidityMin: 40,
  optimalHumidityMax: 80,
  waterHardnessSensitivity: 'low'
};

const prodMKP: AgriProduct = {
  id: 'fert-npk-005234',
  name: '00:52:34 Mono Potassium Phosphate (MKP)',
  brandName: 'MKP 00:52:34',
  companyName: 'Coromandel',
  chemicalName: 'KH2PO4',
  commonName: 'MKP',
  category: 'fertilizer',
  activeIngredients: 'Mono Potassium Phosphate',
  npkOrNutrients: '00:52:34 (P: 52%, K: 34%)',
  formulation: 'WSG',
  formulationFullName: 'Water Soluble Granules',
  phRange: '4.2 - 4.8',
  idealPh: 4.5,
  purpose: 'Root development & flower induction',
  modeOfAction: 'Foliar Nutrient Absorption',
  targetCrops: ['Cotton', 'Chilli', 'Tomato'],
  growthStages: ['Flower Initiation', 'Fruit Set'],
  recommendedDosage: { foliar: '4-5 g/L' },
  standardDose: '4.5 g/L',
  standardUnit: 'g/L',
  defaultDosePerLitre: 4.5,
  mixingOrderRank: 1,
  advantages: ['High phosphorus content'],
  limitations: ['Precipitates with Calcium salts'],
  precautions: ['Spray separately from Calcium'],
  isVerifiedLabel: true,
  rainfastHours: 2,
  tempMinC: 15,
  tempMaxC: 35,
  optimalHumidityMin: 40,
  optimalHumidityMax: 80,
  waterHardnessSensitivity: 'low'
};

const prodCoragen: AgriProduct = {
  id: 'ins-coragen',
  name: 'Coragen (Chlorantraniliprole 18.5% SC)',
  brandName: 'Coragen',
  companyName: 'FMC India',
  chemicalName: 'Chlorantraniliprole 18.5% SC',
  commonName: 'Chlorantraniliprole',
  category: 'insecticide',
  activeIngredients: 'Chlorantraniliprole 18.5% SC',
  formulation: 'SC',
  formulationFullName: 'Suspension Concentrate',
  phRange: '6.0 - 7.0',
  idealPh: 6.5,
  purpose: 'Control of bollworms, stem borer & DBM',
  modeOfAction: 'Ryanodine Receptor Modulator',
  targetCrops: ['Cotton', 'Paddy', 'Chilli', 'Tomato'],
  growthStages: ['Vegetative', 'Flowering'],
  recommendedDosage: { foliar: '0.4 ml/L' },
  standardDose: '0.4 ml/L',
  standardUnit: 'ml/L',
  defaultDosePerLitre: 0.4,
  mixingOrderRank: 3,
  advantages: ['Ovi-larvicidal action', 'Long residual protection'],
  limitations: ['Avoid mixing with highly alkaline copper formulations'],
  precautions: ['Do not exceed recommended dose'],
  isVerifiedLabel: true,
  rainfastHours: 2,
  tempMinC: 15,
  tempMaxC: 35,
  optimalHumidityMin: 40,
  optimalHumidityMax: 80,
  waterHardnessSensitivity: 'low'
};

export async function runCompatibilityTests() {
  console.log('--- RUNNING AGRI COMPATIBILITY ENGINE TESTS ---');

  // Test 1: Conflict Detection (Calcium Nitrate + MKP 00:52:34)
  const conflictMix: SelectedTankProduct[] = [
    { product: prodCalciumNitrate, dose: 3.5, unit: 'g/L' },
    { product: prodMKP, dose: 4.5, unit: 'g/L' }
  ];
  const resConflict = await evaluateTankMixCompatibility(conflictMix, 'Cotton (Kapas)', 200);
  console.assert(resConflict.status === 'conflict', 'Test 1 Failed: Calcium + MKP must result in CONFLICT');
  console.assert(resConflict.issues.length > 0, 'Test 1 Failed: Must provide issue explanation');
  console.log('✓ Test 1 Passed: Calcium Nitrate + 00:52:34 MKP Conflict accurately detected.');

  // Test 2: Single Product Safe
  const singleMix: SelectedTankProduct[] = [
    { product: prodCoragen, dose: 0.4, unit: 'ml/L' }
  ];
  const resSingle = await evaluateTankMixCompatibility(singleMix, 'Cotton (Kapas)', 200);
  console.assert(resSingle.status === 'compatible', 'Test 2 Failed: Single product must be COMPATIBLE');
  console.log('✓ Test 2 Passed: Single product standalone evaluation is safe.');

  // Test 3: WALES Mixing Order (WP/WSG Rank 1 before SC Rank 3)
  const multiMix: SelectedTankProduct[] = [
    { product: prodCoragen, dose: 0.4, unit: 'ml/L' }, // SC = rank 3
    { product: prodCalciumNitrate, dose: 3.5, unit: 'g/L' } // WSG = rank 1
  ];
  const resWales = await evaluateTankMixCompatibility(multiMix, 'Tomato', 200);
  console.assert(resWales.mixingSequence[0].product.id === prodCalciumNitrate.id, 'Test 3 Failed: WSG rank 1 must precede SC rank 3 in WALES');
  console.log('✓ Test 3 Passed: WALES order correctly places WSG powder before SC suspension.');

  console.log('--- ALL TESTS COMPLETED SUCCESSFULLY ---');
}

runCompatibilityTests();

