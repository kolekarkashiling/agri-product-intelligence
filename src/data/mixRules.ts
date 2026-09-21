import { PairwiseInteraction } from '../types/agri';

export const KNOWN_MIX_RULES: PairwiseInteraction[] = [
  // 1. Calcium Nitrate + Magnesium Sulphate
  {
    productAId: 'prod-calcium-nitrate',
    productBId: 'prod-magnesium-sulphate',
    status: 'incompatible',
    primaryReason: 'Insoluble Gypsum (CaSO4) Precipitation & Nozzle Clogging',
    detailedExplanation: 'Mixing water-soluble calcium with sulphate ions forms insoluble Calcium Sulphate (Gypsum). This causes rapid white milky precipitation, permanently clogs spray nozzles and drip emitters, and makes both Calcium and Sulphur bio-unavailable to the plant.',
    chemicalMechanism: 'Ca²⁺ + SO₄²⁻ ➔ CaSO₄(s) ↓ (Insoluble mineral precipitate with Ksp = 4.93 × 10⁻⁵)',
    safeAlternatives: [
      'Apply Calcium Nitrate in Tank A and Magnesium Sulphate in Tank B in separate fertigation runs.',
      'For foliar sprays, separate applications by at least 3 to 5 days.'
    ],
    jarTestRequired: false,
    verifiedSource: 'Fertilizer_Control_Order'
  },
  // 2. Calcium Nitrate + MKP (0:52:34)
  {
    productAId: 'prod-calcium-nitrate',
    productBId: 'prod-mkp-05234',
    status: 'incompatible',
    primaryReason: 'Insoluble Dicalcium Phosphate (CaHPO4) Precipitation',
    detailedExplanation: 'Free calcium ions react aggressively with orthophosphates (H2PO4⁻ / HPO4²⁻) from MKP to form insoluble dicalcium phosphate and tricalcium phosphate sludge. This locks up phosphorus and causes severe tank sedimentation.',
    chemicalMechanism: 'Ca²⁺ + HPO₄²⁻ ➔ CaHPO₄(s) ↓ (Insoluble phosphate rock precipitate)',
    safeAlternatives: [
      'Apply MKP (0:52:34) during flowering/fruiting and apply Calcium Nitrate separately during cell-division stage.',
      'In drip fertigation, inject from distinct tanks (Tank A for Calcium, Tank B for Phosphates).'
    ],
    jarTestRequired: false,
    verifiedSource: 'Fertilizer_Control_Order'
  },
  // 3. Copper Oxychloride + MKP (0:52:34)
  {
    productAId: 'prod-copper-oxychloride',
    productBId: 'prod-mkp-05234',
    status: 'incompatible',
    primaryReason: 'Acidic Copper Solubilization & Severe Phytotoxicity (Leaf Burn)',
    detailedExplanation: 'MKP creates an acidic tank environment (pH ~4.5). Under acidic conditions, the insoluble, safe copper oxychloride matrix dissolves rapidly into free ionic Cu²⁺ ions. High concentrations of free copper ions cause severe foliage scorch, leaf necrosis, and fruit russeting.',
    chemicalMechanism: 'Acidic H₂PO₄⁻ drives Cu₂Cl(OH)₃ dissolution into toxic high-concentration free Cu²⁺ ions.',
    safeAlternatives: [
      'Spray Copper Oxychloride strictly as a standalone protective application after rains.',
      'Apply MKP separately as a foliar nutritional feed.'
    ],
    jarTestRequired: false,
    verifiedSource: 'CIBRC_Label'
  },
  // 4. Copper Oxychloride + Gibberellic Acid (GA3)
  {
    productAId: 'prod-copper-oxychloride',
    productBId: 'prod-ga3-pgr',
    status: 'incompatible',
    primaryReason: 'Chemical Inactivation of Plant Growth Regulator (GA3)',
    detailedExplanation: 'Alkaline copper suspensions and reactive copper ions chemically degrade and hydrolyze the sensitive gibberellic acid molecule, completely destroying the plant growth regulator’s biological efficacy while increasing phytotoxicity risk.',
    chemicalMechanism: 'Heavy metal catalytic oxidation and alkaline hydrolysis of the tetracyclic diterpene lactone ring in GA3.',
    safeAlternatives: [
      'Apply GA3 with slightly buffered acidic water (pH 5.0 - 6.0) as a dedicated spray.',
      'Spray Copper Oxychloride separately at least 5 days apart.'
    ],
    jarTestRequired: false,
    verifiedSource: 'University_Agronomy_Trial'
  },
  // 5. Copper Oxychloride + Chlorpyrifos + Cypermethrin EC
  {
    productAId: 'prod-copper-oxychloride',
    productBId: 'prod-chlorpyrifos-cyper-ec',
    status: 'incompatible',
    primaryReason: 'Emulsion Breakdown, Sludge Formation & Crop Scorch',
    detailedExplanation: 'The alkaline copper suspension causes chemical hydrolysis of organophosphates and breaks the emulsifier balance in EC formulations. This causes oily sludge separation and high risk of chemical burn on young foliage.',
    chemicalMechanism: 'Alkaline hydrolysis of organophosphate ester bonds + solvent separation.',
    safeAlternatives: [
      'Apply insecticide and copper fungicide separately.',
      'Use systemic fungicide alternatives like Azoxystrobin + Difenoconazole if mixing with approved insecticides.'
    ],
    jarTestRequired: false,
    verifiedSource: 'CIBRC_Label'
  },
  // 6. Glyphosate 41 SL + Calcium Nitrate
  {
    productAId: 'prod-glyphosate-41sl',
    productBId: 'prod-calcium-nitrate',
    status: 'incompatible',
    primaryReason: 'Cation Chelation Antagonism (Deactivates Herbicide)',
    detailedExplanation: 'Divalent Calcium (Ca²⁺) ions bind directly with the negatively charged phosphonate group of Glyphosate molecules. This complex cannot be absorbed through the weed leaf cuticle, reducing weed kill efficacy by up to 80%.',
    chemicalMechanism: 'Glyphosate⁻ + Ca²⁺ ➔ Inactive insoluble Glyphosate-Calcium Chelate Complex.',
    safeAlternatives: [
      'Never mix fertilizers containing calcium, magnesium, or iron with non-selective herbicides.',
      'Add Ammonium Sulphate (AMS) at 10g/L to spray water 15 minutes before adding Glyphosate.'
    ],
    jarTestRequired: false,
    verifiedSource: 'University_Agronomy_Trial'
  },
  // 7. Mancozeb 75 WP + Imidacloprid 17.8 SL
  {
    productAId: 'prod-mancozeb-75wp',
    productBId: 'prod-imidacloprid-178sl',
    status: 'compatible',
    primaryReason: 'Verified Dual Protection (Disease + Sucking Pest)',
    detailedExplanation: 'Widely tested and approved tank mix across tomato, chilli, cotton, and vegetables. Follow the WALES protocol: slurry Mancozeb (WP) in water first until fully dispersed, then add Imidacloprid (SL).',
    jarTestRequired: false,
    verifiedSource: 'CIBRC_Label'
  },
  // 8. NPK 19:19:19 + Zinc EDTA 12%
  {
    productAId: 'prod-npk-191919',
    productBId: 'prod-zinc-edta',
    status: 'compatible',
    primaryReason: 'Chelate Protection Prevents Phosphate Lockup',
    detailedExplanation: 'Because Zinc is chelated with EDTA, it does NOT react with the orthophosphates in 19:19:19 (unlike inorganic Zinc Sulphate which precipitates). Both nutrients remain 100% bio-available.',
    jarTestRequired: false,
    verifiedSource: 'University_Agronomy_Trial'
  },
  // 9. NPK 19:19:19 + Amino Acids Bio-stimulant
  {
    productAId: 'prod-npk-191919',
    productBId: 'prod-amino-biostimulant',
    status: 'compatible',
    primaryReason: 'Synergistic Vegetative Booster & Carrier Effect',
    detailedExplanation: 'Natural L-amino acids act as complexing agents that accelerate the foliar uptake of nitrogen, phosphorus, and potassium into plant cells while minimizing osmotic leaf stress.',
    jarTestRequired: false,
    verifiedSource: 'Manufacturer_Bulletin'
  },
  // 10. Azoxystrobin + Difenoconazole SC + Silicon Spreader
  {
    productAId: 'prod-azoxy-difen',
    productBId: 'prod-silicon-adjuvant',
    status: 'compatible',
    primaryReason: 'Enhanced Cuticular Penetration & Rainfastness',
    detailedExplanation: 'Organosilicone adjuvant reduces surface tension dramatically, facilitating uniform spray film across waxy leaf surfaces and rapid translaminar movement of both systemic actives.',
    jarTestRequired: false,
    verifiedSource: 'CIBRC_Label'
  },
  // 11. Mancozeb 75 WP + Chlorpyrifos + Cypermethrin EC
  {
    productAId: 'prod-mancozeb-75wp',
    productBId: 'prod-chlorpyrifos-cyper-ec',
    status: 'conditional',
    primaryReason: 'Conditional Physical Compatibility / Proper Order Required',
    detailedExplanation: 'Can be mixed if standard dilution order is followed. Mancozeb WP must be completely suspended in 80% water volume before adding the EC formulation. If EC is added first, powder particles will be coated by emulsified oil, forming gummy lumps.',
    safeAlternatives: [
      'Perform a 1-liter jar test before filling the 200L spray tank.',
      'Maintain continuous spray tank agitation.'
    ],
    jarTestRequired: true,
    verifiedSource: 'University_Agronomy_Trial'
  },
  // 12. Emamectin Benzoate 5 SG + Azoxystrobin + Difenoconazole SC
  {
    productAId: 'prod-emamectin-5sg',
    productBId: 'prod-azoxy-difen',
    status: 'compatible',
    primaryReason: 'Caterpillar & Fungal Blight Control Tank Mix',
    detailedExplanation: 'Clean compatibility with no chemical antagonism. Mix Emamectin granules (WDG) first, allow full dissolution, then add Azoxy+Difen SC.',
    jarTestRequired: false,
    verifiedSource: 'CIBRC_Label'
  },
  // 13. Boron 20% + Calcium Nitrate
  {
    productAId: 'prod-boron-20',
    productBId: 'prod-calcium-nitrate',
    status: 'compatible',
    primaryReason: 'Synergistic Flower & Fruit Setting Complex (Ca + B)',
    detailedExplanation: 'Calcium and Boron work synergistically to build strong cell walls, improve pollen viability, and prevent fruit splitting. Compatible in standard foliar spray dilutions (up to 1.5g/L Boron + 4g/L Calcium Nitrate).',
    jarTestRequired: false,
    verifiedSource: 'Fertilizer_Control_Order'
  },
  // 14. Boron 20% + GA3 (PGR)
  {
    productAId: 'prod-boron-20',
    productBId: 'prod-ga3-pgr',
    status: 'conditional',
    primaryReason: 'pH Check Required (Boron Raises Solution pH)',
    detailedExplanation: 'Boron 20% is slightly alkaline in solution (pH 7.5 - 8.5), whereas GA3 is unstable in alkaline water (requires pH 5.0 - 6.0). If mixing, use a mild acidifier/pH buffer to bring tank water down to pH 5.5 - 6.0 before adding GA3.',
    jarTestRequired: true,
    verifiedSource: 'University_Agronomy_Trial'
  },
  // 15. Glyphosate 41 SL + Silicon Spreader
  {
    productAId: 'prod-glyphosate-41sl',
    productBId: 'prod-silicon-adjuvant',
    status: 'compatible',
    primaryReason: 'Rapid Stomatal Flooding & Sticking on Grassy/Waxy Weeds',
    detailedExplanation: 'Organosilicone adjuvant breaks leaf surface tension and speeds glyphosate absorption, reducing the rain-washout risk window from 6 hours down to 1 hour.',
    jarTestRequired: false,
    verifiedSource: 'University_Agronomy_Trial'
  }
];
