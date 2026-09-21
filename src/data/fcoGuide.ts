export interface FcoFertilizerEntry {
  id: string;
  name: string;
  category: 'Straight / Primary' | 'Complex / Compound' | 'Water-Soluble / Fertigation' | 'Secondary & Amendments' | 'Micronutrients' | 'Organic & Biofertilizers' | 'Specialty & Fortified';
  gradeOrAnalysis: string;
  whatItSupplies: string;
  typicalPlanningContext: string;
  handlingAndSafetyNotes: string;
  fcoStandardNote?: string;
}

export const FCO_REFERENCE_DATABASE: FcoFertilizerEntry[] = [
  // Straight & Primary
  {
    id: 'fco-urea',
    name: 'Urea / Neem-Coated Urea',
    category: 'Straight / Primary',
    gradeOrAnalysis: '46-0-0 (46% Total Nitrogen)',
    whatItSupplies: 'High-concentration Nitrogen (Amide form)',
    typicalPlanningContext: 'Primary source of nitrogen for vegetative growth, leaf color, and protein synthesis across all field and horticulture crops.',
    handlingAndSafetyNotes: 'Surface volatilization losses can occur on alkaline/dry soils; split applications recommended. Keep moisture-free.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-dap',
    name: 'Di-Ammonium Phosphate (DAP)',
    category: 'Straight / Primary',
    gradeOrAnalysis: '18-46-0 (18% N + 46% P2O5)',
    whatItSupplies: 'Ammoniacal Nitrogen + Water & Citrate Soluble Phosphate',
    typicalPlanningContext: 'Widely used basal fertilizer for root establishment, early seedling vigor, and cellular energy transfer.',
    handlingAndSafetyNotes: 'Place 5cm below and beside seed line. May temporarily increase local pH around granules before nitrification.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-mop',
    name: 'Muriate of Potash (MOP / Potassium Chloride)',
    category: 'Straight / Primary',
    gradeOrAnalysis: '0-0-60 (60% Water Soluble K2O)',
    whatItSupplies: 'Potassium + Chloride (~47% Cl)',
    typicalPlanningContext: 'Economical potash source for non-chloride-sensitive field crops (Paddy, Sugarcane, Cotton, Maize, Wheat).',
    handlingAndSafetyNotes: 'Avoid using on chloride-sensitive crops (Grapes, Tobacco, Potato, Citrus, Chilli). Use SOP (0:0:50) instead for quality produce.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-ssp',
    name: 'Single Super Phosphate (SSP) / Boronated SSP',
    category: 'Straight / Primary',
    gradeOrAnalysis: '16% P2O5 + 11% S + 19% Ca (0.15% B in fortified grade)',
    whatItSupplies: 'Water Soluble Phosphate + Sulphur + Calcium + Boron',
    typicalPlanningContext: 'Ideal multi-nutrient basal application for oilseeds (Groundnut, Soybean, Mustard), pulses, and legumes requiring sulphur.',
    handlingAndSafetyNotes: 'Bulkier material; store in moisture-proof conditions. Excellent source of low-cost Sulphur and Calcium alongside Phosphorus.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-tsp',
    name: 'Triple Super Phosphate (TSP)',
    category: 'Straight / Primary',
    gradeOrAnalysis: 'About 46% P2O5',
    whatItSupplies: 'Concentrated Water Soluble Phosphate',
    typicalPlanningContext: 'High-analysis phosphate source without nitrogen for legume crops or situations with adequate nitrogen.',
    handlingAndSafetyNotes: 'Availability and local supply vary; follow registered product label for basal placement.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-ammonium-sulphate',
    name: 'Ammonium Sulphate',
    category: 'Straight / Primary',
    gradeOrAnalysis: '21-0-0-24S (21% N + 24% S)',
    whatItSupplies: 'Ammoniacal Nitrogen + Readily Available Sulphate Sulphur',
    typicalPlanningContext: 'Excellent nitrogen source for alkaline and calcareous soils where acid-forming tendency helps mobilize locked nutrients.',
    handlingAndSafetyNotes: 'Acid-forming in soil; ideal water conditioner (AMS @ 10g/L) for herbicide mixing (Glyphosate).',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-can',
    name: 'Calcium Ammonium Nitrate (CAN)',
    category: 'Straight / Primary',
    gradeOrAnalysis: '25% - 26% N + Calcium compound',
    whatItSupplies: 'Nitrate & Ammoniacal Nitrogen (50:50) + Calcium',
    typicalPlanningContext: 'Neutral fertilizer suitable for acidic and neutral soils; supplies rapid nitrate nitrogen with calcium.',
    handlingAndSafetyNotes: 'Hygroscopic; store in airtight bags in a cool dry warehouse.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-ammonium-chloride',
    name: 'Ammonium Chloride',
    category: 'Straight / Primary',
    gradeOrAnalysis: '25-0-0 (25% Ammoniacal Nitrogen)',
    whatItSupplies: 'Ammoniacal Nitrogen + Chloride',
    typicalPlanningContext: 'Used primarily in paddy cultivation under waterlogged anaerobic conditions where denitrification losses are minimized.',
    handlingAndSafetyNotes: 'Avoid on chloride-sensitive crops (fruits, tobacco, vegetables).',
    fcoStandardNote: 'FCO Schedule I Notified'
  },

  // Complex & Compound Grades
  {
    id: 'fco-102626',
    name: 'NPK Complex 10:26:26',
    category: 'Complex / Compound',
    gradeOrAnalysis: '10% N : 26% P2O5 : 26% K2O',
    whatItSupplies: 'Balanced High Phosphate & High Potash Complex',
    typicalPlanningContext: 'Basal nutrient program for sugarcane, cotton, oilseeds, and vegetables where high root-zone P and K are needed.',
    handlingAndSafetyNotes: 'Uniform granulated complex ensures each granule contains equal proportion of all 3 nutrients.',
    fcoStandardNote: 'FCO Schedule I Notified Complex'
  },
  {
    id: 'fco-123216',
    name: 'NPK Complex 12:32:16',
    category: 'Complex / Compound',
    gradeOrAnalysis: '12% N : 32% P2O5 : 16% K2O',
    whatItSupplies: 'High-Phosphate Dominant NPK Complex',
    typicalPlanningContext: 'Early crop stage and root-zone nutrient planning across field and horticultural crops.',
    handlingAndSafetyNotes: 'Place in root zone during final land preparation or sowing.',
    fcoStandardNote: 'FCO Schedule I Notified Complex'
  },
  {
    id: 'fco-2020013',
    name: 'Ammonium Phosphate Sulphate (20:20:0:13)',
    category: 'Complex / Compound',
    gradeOrAnalysis: '20% N : 20% P2O5 : 0% K2O : 13% S',
    whatItSupplies: 'Nitrogen + Phosphate + Elemental/Sulphate Sulphur',
    typicalPlanningContext: 'Standard starter for pulses, oilseeds (Soybean, Mustard, Groundnut), and onion requiring simultaneous N, P, and S.',
    handlingAndSafetyNotes: 'Sulphur present in fourth-value grade enhances oil formation and protein content.',
    fcoStandardNote: 'FCO Schedule I Notified Complex'
  },
  {
    id: 'fco-143514',
    name: 'NPK Complex 14:35:14',
    category: 'Complex / Compound',
    gradeOrAnalysis: '14% N : 35% P2O5 : 14% K2O',
    whatItSupplies: 'Phosphate-Forward Complex',
    typicalPlanningContext: 'Phosphate-focused basal program for cereals, cotton, and tuber crops.',
    handlingAndSafetyNotes: 'Provides strong early vigor and root branching.',
    fcoStandardNote: 'FCO Schedule I Notified Complex'
  },
  {
    id: 'fco-151515',
    name: 'Balanced NPK 15:15:15 / 16:16:16 / 17:17:17',
    category: 'Complex / Compound',
    gradeOrAnalysis: '15:15:15 | 16:16:16 | 17:17:17 Balanced NPK',
    whatItSupplies: 'Equal ratio Nitrogen, Phosphate, and Potash',
    typicalPlanningContext: 'Balanced primary nutrient source for orchards, plantation crops (Tea, Coffee, Rubber), and maintenance basal doses.',
    handlingAndSafetyNotes: 'Ensure soil moisture during application.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-24240',
    name: 'NP Complex 24:24:0 / 28:28:0',
    category: 'Complex / Compound',
    gradeOrAnalysis: '24:24:0 and 28:28:0 High Analysis NP',
    whatItSupplies: 'Concentrated Nitrogen and Phosphate without Potash',
    typicalPlanningContext: 'For soils with high native potassium reserves or top-dressing during active tillering.',
    handlingAndSafetyNotes: 'High water solubility of phosphate fraction ensures fast response.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },

  // Secondary & Amendments
  {
    id: 'fco-gypsum',
    name: 'Agriculture Grade Gypsum (CaSO4·2H2O)',
    category: 'Secondary & Amendments',
    gradeOrAnalysis: 'Calcium (~20% Ca) + Sulphur (~16% S)',
    whatItSupplies: 'Calcium + Sulphate Sulphur (Soil Amendment)',
    typicalPlanningContext: 'Reclaims sodic / alkali soils by displacing toxic sodium (Na+) with calcium (Ca2+). Crucial for Groundnut peg formation.',
    handlingAndSafetyNotes: 'Need and rate must be based on soil test (ESP / pH). Not a blanket fertilizer.',
    fcoStandardNote: 'FCO Mineral Soil Amendment'
  },
  {
    id: 'fco-lime',
    name: 'Agricultural Lime / Calcitic Lime (CaCO3)',
    category: 'Secondary & Amendments',
    gradeOrAnalysis: 'Calcium Carbonate (>80% CaCO3 equivalent)',
    whatItSupplies: 'Neutralizing agent + Calcium',
    typicalPlanningContext: 'Raises soil pH in acidic soils (pH < 6.0), reducing aluminium and manganese toxicity.',
    handlingAndSafetyNotes: 'Only apply based on soil test buffer pH. Incompatible with same-tank mixing.',
    fcoStandardNote: 'FCO Soil Amendment'
  },
  {
    id: 'fco-dolomite',
    name: 'Dolomite (CaCO3·MgCO3)',
    category: 'Secondary & Amendments',
    gradeOrAnalysis: 'Calcium Carbonate + Magnesium Carbonate',
    whatItSupplies: 'Neutralizing agent + Calcium + Magnesium',
    typicalPlanningContext: 'Amends acidic soils that are simultaneously deficient in magnesium (common in high-rainfall lateritic soils).',
    handlingAndSafetyNotes: 'Verify fineness (sieve mesh pass percentage) and neutralizing value.',
    fcoStandardNote: 'FCO Soil Amendment'
  },
  {
    id: 'fco-bentonite-sulphur',
    name: 'Elemental Sulphur 90% (Bentonite Pastilles)',
    category: 'Secondary & Amendments',
    gradeOrAnalysis: '90% Elemental Sulphur + 10% Bentonite Clay',
    whatItSupplies: 'Sustained-release Elemental Sulphur (S)',
    typicalPlanningContext: 'Long-term sulphur nutrition for high sulphur-demanding crops (Mustard, Onion, Garlic, Groundnut). Gradually lowers soil pH.',
    handlingAndSafetyNotes: 'Bentonite clay absorbs water and swells, breaking pastilles into micro-particles that soil Thiobacillus bacteria oxidize into plant-available sulphate (SO4 2-).',
    fcoStandardNote: 'FCO Fortified / Specialty'
  },

  // Micronutrients
  {
    id: 'fco-micro-zinc',
    name: 'Zinc Micronutrient Sources (ZnSO4 / Zn-EDTA)',
    category: 'Micronutrients',
    gradeOrAnalysis: 'ZnSO4 Monohydrate (33% Zn), Heptahydrate (21% Zn), Chelated Zn-EDTA (12% Zn)',
    whatItSupplies: 'Plant-available Zinc',
    typicalPlanningContext: 'Essential for auxin (IAA) synthesis, leaf internode elongation, and enzyme activation. Corrects Khaira disease in rice and Little Leaf in cotton/citrus.',
    handlingAndSafetyNotes: 'Zinc Sulphate precipitates with Phosphates (DAP/MKP). Use Chelated Zn-EDTA 12% when mixing with foliar fertilizers.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-micro-boron',
    name: 'Boron Sources (Solubor 20% / Borax 10.5% / Boric Acid 17%)',
    category: 'Micronutrients',
    gradeOrAnalysis: 'Disodium Octaborate Tetrahydrate (20% B), Borax (10.5% B)',
    whatItSupplies: 'Water-soluble Boron',
    typicalPlanningContext: 'Crucial for pollen tube growth, flower fertilization, fruit set, calcium mobility, and preventing hollow stems/fruit cracking.',
    handlingAndSafetyNotes: 'Narrow safety margin; over-application causes severe leaf scorch. Never exceed 1.5 g/L foliar dose.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-micro-manganese',
    name: 'Manganese Sulphate (30.5% Mn) / Mn-EDTA',
    category: 'Micronutrients',
    gradeOrAnalysis: 'Mn: 30.5% in inorganic salt / 12% in chelate',
    whatItSupplies: 'Available Manganese (Mn2+)',
    typicalPlanningContext: 'Essential for photolysis of water in Photosystem II and nitrogen metabolism.',
    handlingAndSafetyNotes: 'Deficiency shows interveinal chlorosis with brown spots (Pahala blight in sugarcane).',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-micro-copper',
    name: 'Copper Sulphate (24% Cu) / Cu-EDTA',
    category: 'Micronutrients',
    gradeOrAnalysis: 'Cu: 24% inorganic / 12% chelate',
    whatItSupplies: 'Available Copper (Cu2+)',
    typicalPlanningContext: 'Enzyme activator for plastocyanin in photosynthesis, pollen viability, and lignin synthesis.',
    handlingAndSafetyNotes: 'Narrow margin between deficiency and toxicity; strictly follow label dosage.',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-micro-molybdenum',
    name: 'Sodium Molybdate / Ammonium Molybdate (52% Mo)',
    category: 'Micronutrients',
    gradeOrAnalysis: 'Mo: 39% - 52%',
    whatItSupplies: 'Molybdenum (MoO4 2-)',
    typicalPlanningContext: 'Structural component of Nitrate Reductase and Nitrogenase enzyme in Rhizobium nodules. Essential for legume nitrogen fixation and Whiptail in cauliflower.',
    handlingAndSafetyNotes: 'Extremely low dosage required (0.05 to 0.1 g/L or seed treatment).',
    fcoStandardNote: 'FCO Schedule I Notified'
  },
  {
    id: 'fco-micro-mix',
    name: 'State-Specific FCO Micro-Nutrient Grades (Grade 1 to 5)',
    category: 'Micronutrients',
    gradeOrAnalysis: 'Balanced blend of Zn, Fe, Mn, Cu, B, Mo calibrated for regional soils',
    whatItSupplies: 'Multi-micronutrient complete nutrition',
    typicalPlanningContext: 'Cost-effective holistic correction of multi-element micro-deficiencies in intensive cropping zones.',
    handlingAndSafetyNotes: 'Check whether the product is a Soil Application Grade or Foliar Spray Grade. Never spray soil grades on tender crop leaves.',
    fcoStandardNote: 'State FCO Formulated'
  },

  // Organic & Biofertilizers
  {
    id: 'fco-prom',
    name: 'Phosphate-Rich Organic Manure (PROM)',
    category: 'Organic & Biofertilizers',
    gradeOrAnalysis: 'Min 10.4% Total P2O5, Organic Carbon min 7.9%, C:N ratio < 20:1',
    whatItSupplies: 'Bio-available Phosphorus + Humic Organic Matter',
    typicalPlanningContext: 'Green alternative to synthetic DAP/SSP; high efficiency in alkaline and calcareous soils without phosphate lockup.',
    handlingAndSafetyNotes: 'Fine rock phosphate co-composted with organic waste and phosphate-solubilizing bio-agents.',
    fcoStandardNote: 'FCO Notified Organic Fertilizer'
  },
  {
    id: 'fco-rhizobium',
    name: 'Rhizobium Biofertilizer (Carrier / Liquid)',
    category: 'Organic & Biofertilizers',
    gradeOrAnalysis: 'Min 1 × 10^8 viable CFU/g or ml',
    whatItSupplies: 'Symbiotic atmospheric nitrogen-fixing bacteria for Legumes',
    typicalPlanningContext: 'Seed treatment for Soybean, Groundnut, Chickpea, Pigeon pea, Lentil, and Black gram. Fixes 50-100 kg N/hectare.',
    handlingAndSafetyNotes: 'Crop-specific strains (e.g. Bradyrhizobium japonicum for soybean). Avoid direct sunlight or mixing with chemical fungicides during treatment (treat fungicide first, then biofertilizer).',
    fcoStandardNote: 'FCO Biofertilizer Schedule'
  },
  {
    id: 'fco-psb-kmb',
    name: 'PSB (Phosphate Solubilizing) & KMB (Potash Mobilizing) Bacteria',
    category: 'Organic & Biofertilizers',
    gradeOrAnalysis: 'Pseudomonas / Bacillus / Frateuria (Min 1 × 10^8 CFU)',
    whatItSupplies: 'Organic acid secreting microbes that solubilize fixed insoluble P & K in soil',
    typicalPlanningContext: 'Unlocks native fixed tricalcium/iron phosphates and mineral potassium in soil, saving 20-25% chemical fertilizer.',
    handlingAndSafetyNotes: 'Apply with organic manure (FYM / Vermicompost) or drip irrigation.',
    fcoStandardNote: 'FCO Biofertilizer Schedule'
  },
  {
    id: 'fco-mycorrhiza',
    name: 'Mycorrhizal Biofertilizer (VAM / Endomycorrhiza)',
    category: 'Organic & Biofertilizers',
    gradeOrAnalysis: 'Glomus intraradices (Min 100 infective propagules/g)',
    whatItSupplies: 'Symbiotic fungal hyphae network extending root absorption zone',
    typicalPlanningContext: 'Expands root surface area by 100x-1000x for phosphorus, zinc, and water uptake under drought stress.',
    handlingAndSafetyNotes: 'Apply close to root zone during sowing or transplanting.',
    fcoStandardNote: 'FCO Biofertilizer Schedule'
  },

  // Specialty & Fortified
  {
    id: 'fco-nano-urea',
    name: 'Nano Urea (Liquid) & Nano DAP (Liquid)',
    category: 'Specialty & Fortified',
    gradeOrAnalysis: '4% w/v Total Nitrogen in nanoscale particles (20-50 nm)',
    whatItSupplies: 'Nanoscale targeted Nitrogen and Phosphorus for stomatal entry',
    typicalPlanningContext: 'Foliar spray applied at active tillering/branching and pre-flowering stages to reduce bulky conventional urea top-dressing.',
    handlingAndSafetyNotes: 'Use 2-4 ml per liter of water. Shake bottle well before use. Spray on leaf underside where stomata density is highest.',
    fcoStandardNote: 'FCO Notified Nano Fertilizer'
  },
  {
    id: 'fco-customized',
    name: 'Customized Fertilizers (Crop & Region Specific)',
    category: 'Specialty & Fortified',
    gradeOrAnalysis: 'Scientifically blended N-P-K-S-Zn-B grades approved per district soil test',
    whatItSupplies: 'Site-Specific Nutrient Management (SSNM) complete formulation',
    typicalPlanningContext: 'Provides all macro, secondary, and micronutrients in a single compound granule matching specific crop extraction patterns.',
    handlingAndSafetyNotes: 'Manufactured only by authorized FCO licensed plants with strict quality specifications.',
    fcoStandardNote: 'FCO Order Section 20B'
  }
];
