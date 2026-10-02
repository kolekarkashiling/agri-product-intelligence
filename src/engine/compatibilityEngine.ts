import { AgriProduct } from '../types/agri';
import { CompatibilityRule, AnalysisIssue } from '../types/database.types';
import { SelectedTankProduct, TankMixDecisionResult } from '../types/tankMix.types';
import { ruleService } from '../services/rule.service';

export async function evaluateTankMixCompatibility(
  selectedItems: SelectedTankProduct[],
  cropName: string,
  waterVolumeL: number = 200
): Promise<TankMixDecisionResult> {
  const products = selectedItems.map((s) => s.product);

  // Single product case
  if (products.length < 2) {
    const single = products[0];
    return {
      status: 'compatible',
      issues: [],
      mixingSequence: single ? [getWalesStep(single, selectedItems[0], 1)] : [],
      jarTestChecklist: getStandardJarTestSteps(waterVolumeL),
      safeAlternatives: [],
      summary: single ? `Single product application of ${single.name}. No tank mix antagonism.` : 'Select products to analyze compatibility.',
      phRisk: 'none'
    };
  }

  // Fetch all known compatibility rules from service (database + verified agronomic rules)
  const rules = await ruleService.getAllRules();

  const issues: AnalysisIssue[] = [];
  const safeAlternatives: string[] = [];
  let hasConflict = false;
  let hasCaution = false;

  // Evaluate every distinct pair in tank
  for (let i = 0; i < products.length; i++) {
    for (let j = i + 1; j < products.length; j++) {
      const prodA = products[i];
      const prodB = products[j];

      // Find matching rule in database / registry
      const matchedRule = rules.find(
        (r) =>
          (r.product_a_code === prodA.id && r.product_b_code === prodB.id) ||
          (r.product_a_code === prodB.id && r.product_b_code === prodA.id) ||
          (r.product_a_id === prodA.id && r.product_b_id === prodB.id) ||
          (r.product_a_id === prodB.id && r.product_b_id === prodA.id)
      );

      if (matchedRule) {
        if (matchedRule.status === 'conflict' || matchedRule.status === 'incompatible') {
          hasConflict = true;
          issues.push({
            severity: 'conflict',
            product_a_name: prodA.name,
            product_b_name: prodB.name,
            reason: matchedRule.reason,
            recommendation: matchedRule.recommendation,
            source: matchedRule.source
          });
        } else if (matchedRule.status === 'caution' || matchedRule.status === 'conditional') {
          hasCaution = true;
          issues.push({
            severity: 'caution',
            product_a_name: prodA.name,
            product_b_name: prodB.name,
            reason: matchedRule.reason,
            recommendation: matchedRule.recommendation,
            source: matchedRule.source
          });
        }
      } else {
        // Evaluate agronomic chemical interactions
        const inferred = inferAgronomicRule(prodA, prodB);
        if (inferred) {
          if (inferred.severity === 'conflict') hasConflict = true;
          if (inferred.severity === 'caution') hasCaution = true;
          issues.push({
            severity: inferred.severity,
            product_a_name: prodA.name,
            product_b_name: prodB.name,
            reason: inferred.reason,
            recommendation: inferred.recommendation,
            source: inferred.source
          });
        }
      }
    }
  }

  // Evaluate Dose & Formulation checks
  selectedItems.forEach((item) => {
    if (item.dose > (item.product.defaultDosePerLitre || 5) * 3) {
      issues.push({
        severity: 'caution',
        product_a_name: item.product.name,
        reason: `Dose exceeds typical agronomy range (${item.dose} ${item.unit} vs recommended ${item.product.standardDose}).`,
        recommendation: 'Verify water volume per acre to avoid crop foliar burn or residue violation.',
        source: 'CIB-RC Package Label Guidance'
      });
    }
  });

  // Evaluate Overall Status
  let status: 'compatible' | 'caution' | 'conflict' = 'compatible';
  if (hasConflict) {
    status = 'conflict';
  } else if (hasCaution) {
    status = 'caution';
  }

  // WALES Mixing Sequence Order
  const sortedByWales = [...selectedItems].sort(
    (a, b) => a.product.mixingOrderRank - b.product.mixingOrderRank
  );

  const mixingSequence = sortedByWales.map((item, idx) =>
    getWalesStep(item.product, item, idx + 1)
  );

  // pH spread evaluation
  const phs = products.map((p) => p.idealPh || 6.5);
  const minPh = Math.min(...phs);
  const maxPh = Math.max(...phs);
  const phSpread = maxPh - minPh;

  let phRisk: 'none' | 'mild' | 'severe' = 'none';
  let phWarning: string | undefined;

  if (phSpread >= 2.5) {
    phRisk = 'severe';
    phWarning = `Large pH span (${minPh.toFixed(1)} to ${maxPh.toFixed(1)}). Alkaline and acidic products mixed together may cause alkaline hydrolysis or precipitation.`;
  } else if (phSpread >= 1.5) {
    phRisk = 'mild';
    phWarning = `Moderate pH divergence (${minPh.toFixed(1)} to ${maxPh.toFixed(1)}). Monitor tank agitation and spray within 2 hours of mixing.`;
  }

  // Summary message
  let summary = '';
  if (status === 'compatible') {
    summary = `All ${products.length} products are compatible for ${cropName} application following standard WALES agitation sequence.`;
  } else if (status === 'caution') {
    summary = `Tank mix for ${cropName} is conditionally permissible with ${issues.length} agronomic precaution(s). Perform a 1-L jar test before field tank loading.`;
  } else {
    summary = `Incompatible tank combination detected for ${cropName}! High risk of chemical precipitation or foliar damage. Do not mix in the same tank.`;
  }

  return {
    status,
    issues,
    mixingSequence,
    jarTestChecklist: getStandardJarTestSteps(waterVolumeL),
    safeAlternatives: Array.from(new Set(safeAlternatives)),
    summary,
    phRisk,
    phWarning,
    cropSensitivityNote: cropName.includes('Cotton') || cropName.includes('Chilli')
      ? `${cropName} has sensitive vegetative terminals. Avoid spraying during peak afternoon heat (>32°C).`
      : undefined
  };
}

function getWalesStep(product: AgriProduct, item: SelectedTankProduct, stepNum: number) {
  const rank = product.mixingOrderRank;
  let walesCode: 'W' | 'A' | 'L' | 'E' | 'S' = 'W';
  let walesLabel = 'Water Soluble Powders (WP/WDG)';
  let instructions = 'Premix into slurry in bucket of clean water before adding to tank half-filled with water.';

  if (rank === 1) {
    walesCode = 'W';
    walesLabel = 'Water-Soluble Bag & Dry Powders (WP/WDG/WSG)';
    instructions = 'Add first with continuous agitation until fully dispersed.';
  } else if (rank === 2) {
    walesCode = 'A';
    walesLabel = 'Agitation / Water Soluble Fertilizers';
    instructions = 'Ensure thorough agitation before adding next ingredient.';
  } else if (rank === 3) {
    walesCode = 'L';
    walesLabel = 'Liquid Flowables & Suspensions (SC/CS/F)';
    instructions = 'Pour slowly into agitated tank water.';
  } else if (rank === 4) {
    walesCode = 'E';
    walesLabel = 'Emulsifiable Concentrates (EC/EW)';
    instructions = 'Add while keeping agitator running to maintain uniform milky emulsion.';
  } else {
    walesCode = 'S';
    walesLabel = 'Solutions, Soluble Liquids & Adjuvants (SL/SP/Surfactants)';
    instructions = 'Add last, followed by final water fill to volume.';
  }

  return {
    step: stepNum,
    walesCode,
    walesLabel,
    product,
    doseString: `${item.dose} ${item.unit}`,
    instructions
  };
}

function inferAgronomicRule(prodA: AgriProduct, prodB: AgriProduct): {
  severity: 'conflict' | 'caution';
  reason: string;
  recommendation: string;
  source: string;
} | null {
  const idA = (prodA.id || prodA.name).toLowerCase();
  const idB = (prodB.id || prodB.name).toLowerCase();

  const isProdACa = idA.includes('calcium') || prodA.name.toLowerCase().includes('calcium');
  const isProdBCa = idB.includes('calcium') || prodB.name.toLowerCase().includes('calcium');

  const isProdAPhosOrSulph =
    idA.includes('sulphate') || idA.includes('005234') || idA.includes('mkp') || idA.includes('phosphate') || (prodA.npkOrNutrients && prodA.npkOrNutrients.includes('P'));
  const isProdBPhosOrSulph =
    idB.includes('sulphate') || idB.includes('005234') || idB.includes('mkp') || idB.includes('phosphate') || (prodB.npkOrNutrients && prodB.npkOrNutrients.includes('P'));

  if ((isProdACa && isProdBPhosOrSulph) || (isProdBCa && isProdAPhosOrSulph)) {
    return {
      severity: 'conflict',
      reason: 'Insoluble Calcium Mineral Precipitation (Cross-reaction)',
      recommendation: 'Apply Calcium formulations separately from Sulphate or Phosphate fertilizers with a 3-5 day gap.',
      source: 'Fertilizer (Control) Order 1985 & ICAR Agronomy Standard'
    };
  }

  const isCopperA = idA.includes('copper') || prodA.name.toLowerCase().includes('copper');
  const isCopperB = idB.includes('copper') || prodB.name.toLowerCase().includes('copper');

  if (isCopperA || isCopperB) {
    return {
      severity: 'caution',
      reason: 'Copper Fungicide Reactivity & Foliar Sensitivity',
      recommendation: 'Maintain neutral water pH and test a small bucket mix before spraying. Do not add acidic leaf penetrants.',
      source: 'CIB-RC Fungicide Registration Guidelines'
    };
  }

  if (prodA.formulation === 'EC' && prodB.formulation === 'EC') {
    return {
      severity: 'caution',
      reason: 'Multiple Emulsifiable Concentrate (EC) Solvent Load',
      recommendation: 'Spray during cool morning or evening hours with high water volume (>200L/acre) to avoid scorch.',
      source: 'University Agronomy Trial Standard'
    };
  }

  return null;
}

function getStandardJarTestSteps(waterVolumeL: number): string[] {
  return [
    'Take a clean, transparent 1-Liter glass or plastic container.',
    `Fill with 500 ml of your actual farm water source intended for the ${waterVolumeL}L spray tank.`,
    'Add products in strict WALES sequence in proportionate mini-doses.',
    'Stir thoroughly for 30 seconds after adding each individual product.',
    'Fill to 1-liter mark with remaining water and let stand undisturbed for 30 minutes.',
    'Inspect for curdling, sediment, heavy flakes, boiling/heat, or sludge. If observed, DO NOT SPRAY.'
  ];
}
