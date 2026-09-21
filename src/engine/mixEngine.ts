import { AgriProduct, MixAnalysisResult, PairwiseInteraction, CompatibilityStatus } from '../types/agri';
import { KNOWN_MIX_RULES } from '../data/mixRules';

export function analyzeTankMix(selectedProducts: AgriProduct[]): MixAnalysisResult {
  if (selectedProducts.length < 2) {
    return {
      overallStatus: 'compatible',
      safetyScore: 100,
      pairwiseInteractions: [],
      criticalWarnings: [],
      conditionalNotes: [],
      mixingSequence: selectedProducts,
      jarTestChecklist: [],
      saferAlternatives: [],
      phShiftRisk: 'none'
    };
  }

  const pairwiseInteractions: {
    productA: AgriProduct;
    productB: AgriProduct;
    interaction: PairwiseInteraction;
  }[] = [];

  const criticalWarnings: string[] = [];
  const conditionalNotes: string[] = [];
  const saferAlternatives: string[] = [];

  let hasIncompatible = false;
  let hasConditional = false;
  let hasInsufficient = false;

  // Evaluate every distinct pair
  for (let i = 0; i < selectedProducts.length; i++) {
    for (let j = i + 1; j < selectedProducts.length; j++) {
      const prodA = selectedProducts[i];
      const prodB = selectedProducts[j];

      // Lookup rule in both directions
      const matchedRule = KNOWN_MIX_RULES.find(
        (r) =>
          (r.productAId === prodA.id && r.productBId === prodB.id) ||
          (r.productAId === prodB.id && r.productBId === prodA.id)
      );

      let interaction: PairwiseInteraction;

      if (matchedRule) {
        interaction = matchedRule;
      } else {
        // Deterministic Chemistry Heuristic Fallback
        interaction = inferChemicalInteraction(prodA, prodB);
      }

      pairwiseInteractions.push({
        productA: prodA,
        productB: prodB,
        interaction
      });

      if (interaction.status === 'incompatible') {
        hasIncompatible = true;
        criticalWarnings.push(`${prodA.name} + ${prodB.name}: ${interaction.primaryReason}`);
        if (interaction.safeAlternatives) {
          saferAlternatives.push(...interaction.safeAlternatives);
        }
      } else if (interaction.status === 'conditional') {
        hasConditional = true;
        conditionalNotes.push(`${prodA.name} + ${prodB.name}: ${interaction.primaryReason}`);
        if (interaction.safeAlternatives) {
          saferAlternatives.push(...interaction.safeAlternatives);
        }
      } else if (interaction.status === 'insufficient_data') {
        hasInsufficient = true;
      }
    }
  }

  // Determine overall status
  let overallStatus: CompatibilityStatus = 'compatible';
  let safetyScore = 95;

  if (hasIncompatible) {
    overallStatus = 'incompatible';
    safetyScore = 15;
  } else if (hasConditional) {
    overallStatus = 'conditional';
    safetyScore = 65;
  } else if (hasInsufficient) {
    overallStatus = 'insufficient_data';
    safetyScore = 50;
  }

  // Check pH shift risk
  const phShiftRisk = evaluatePhShiftRisk(selectedProducts);
  let phLockWarning: string | undefined;

  const minPh = Math.min(...selectedProducts.map((p) => p.idealPh));
  const maxPh = Math.max(...selectedProducts.map((p) => p.idealPh));
  if (maxPh - minPh >= 2.5) {
    phLockWarning = `Large pH compatibility span detected (${minPh.toFixed(1)} to ${maxPh.toFixed(1)}). Alkaline and acidic products mixed together may cause ingredient degradation or alkaline hydrolysis.`;
  }

  // Calculate WALES mixing sequence
  const mixingSequence = [...selectedProducts].sort((a, b) => a.mixingOrderRank - b.mixingOrderRank);

  // Standard Jar Test Checklist
  const jarTestChecklist = [
    'Take a clean, transparent 1-Liter glass or plastic jar.',
    'Fill the jar with 500 ml of your actual farm spray water.',
    'Add products in proportional quantities following the strict WALES sequence (Powder -> Flowable -> EC -> Liquid).',
    'Stir thoroughly after adding each individual product.',
    'Fill to the 1-liter mark with remaining water, invert jar 10 times, and let stand undisturbed for 30 minutes.',
    'Inspect closely: If you observe curdling, sludge, white flakes, layer separation, boiling/heat generation, or greasy ring around glass, DO NOT SPRAY.'
  ];

  return {
    overallStatus,
    safetyScore,
    pairwiseInteractions,
    criticalWarnings,
    conditionalNotes,
    mixingSequence,
    jarTestChecklist,
    saferAlternatives: Array.from(new Set(saferAlternatives)),
    phShiftRisk,
    phLockWarning
  };
}

function inferChemicalInteraction(prodA: AgriProduct, prodB: AgriProduct): PairwiseInteraction {
  // Check for Calcium with Sulphates / Phosphates
  const isProdACa = prodA.id.includes('calcium');
  const isProdBCa = prodB.id.includes('calcium');
  const isProdASulphateOrPhos = prodA.id.includes('sulphate') || prodA.id.includes('mkp') || prodA.category === 'fertilizer' && prodA.npkOrNutrients?.includes('P');
  const isProdBSulphateOrPhos = prodB.id.includes('sulphate') || prodB.id.includes('mkp') || prodB.category === 'fertilizer' && prodB.npkOrNutrients?.includes('P');

  if ((isProdACa && isProdBSulphateOrPhos) || (isProdBCa && isProdASulphateOrPhos)) {
    return {
      productAId: prodA.id,
      productBId: prodB.id,
      status: 'incompatible',
      primaryReason: 'Probable Mineral Precipitation (Calcium Cross-reaction)',
      detailedExplanation: 'Calcium salts generally react with sulphates and orthophosphates in spray solutions, forming insoluble mineral precipitates.',
      chemicalMechanism: 'Precipitation reaction Ca²⁺ + anions ➔ insoluble sediment.',
      safeAlternatives: ['Apply Calcium separately from Sulphur or Phosphate fertilizers.'],
      jarTestRequired: true,
      verifiedSource: 'Fertilizer_Control_Order'
    };
  }

  // Check for Copper Fungicide with PGR / Organophosphate / Bio-stimulant
  const isCopperA = prodA.id.includes('copper');
  const isCopperB = prodB.id.includes('copper');
  if (isCopperA || isCopperB) {
    return {
      productAId: prodA.id,
      productBId: prodB.id,
      status: 'conditional',
      primaryReason: 'Copper Chemical Sensitivity / Phytotoxicity Risk',
      detailedExplanation: 'Copper fungicides are chemically reactive and alter spray pH. Must be jar-tested and diluted thoroughly before adding partner products.',
      safeAlternatives: ['Apply Copper fungicide standalone for maximum safety.'],
      jarTestRequired: true,
      verifiedSource: 'CIBRC_Label'
    };
  }

  // Check multiple EC formulations
  if (prodA.formulation === 'EC' && prodB.formulation === 'EC') {
    return {
      productAId: prodA.id,
      productBId: prodB.id,
      status: 'conditional',
      primaryReason: 'Multiple Emulsifiable Concentrate (EC) Solvent Load',
      detailedExplanation: 'Combining multiple EC formulations increases solvent concentration, which may cause leaf edge burning during warm weather (>30°C).',
      safeAlternatives: ['Spray during cool morning/evening hours and maintain high water volume (200L/acre).'],
      jarTestRequired: true,
      verifiedSource: 'University_Agronomy_Trial'
    };
  }

  // Default: Insufficient verified label data
  return {
    productAId: prodA.id,
    productBId: prodB.id,
    status: 'insufficient_data',
    primaryReason: 'No Documented Antagonism, but Physical Jar Test Mandatory',
    detailedExplanation: 'These two formulations do not have registered chemical conflict on official labels, but have not been formally co-tested in a certified agronomic trial. Perform a physical jar test before mixing in field tank.',
    jarTestRequired: true,
    verifiedSource: 'Experimental'
  };
}

function evaluatePhShiftRisk(products: AgriProduct[]): 'none' | 'mild' | 'severe' {
  const phs = products.map((p) => p.idealPh);
  const spread = Math.max(...phs) - Math.min(...phs);
  if (spread > 2.5) return 'severe';
  if (spread > 1.5) return 'mild';
  return 'none';
}
