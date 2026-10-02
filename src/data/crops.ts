import { CropInfo } from '../types/crop';

export const CROPS_DATABASE: CropInfo[] = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    localNameMr: 'टोमॅटो (Tomato)',
    category: 'Vegetable',
    idealSoil: 'Well-drained sandy loam or clay loam rich in organic matter',
    idealSoilPh: '6.0 – 7.0',
    tempRangeC: '18°C – 28°C (Night 15°C – 20°C)',
    waterRequirementMm: '600 – 800 mm',
    seedRatePerAcre: '40 – 50 grams (Hybrid seedlings)',
    spacing: '4 to 5 ft row-to-row × 1.5 to 2 ft plant-to-plant',
    durationDays: '120 – 150 Days',
    yieldPerAcre: '25 – 40 Tonnes / Acre (under staking & drip)',
    criticalGrowthStages: [
      {
        stageName: 'Establishment & Early Rooting (0 - 20 DAT)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Transplanting, gap filling, drenching with systemic fungicide + humic acid.',
        recommendedNutrients: '12:61:00 (MAP) + Humic Acid + Chelated Zinc',
        vulnerablePestsAndDiseases: 'Damping off, Cutworms, Early Aphids'
      },
      {
        stageName: 'Vegetative & Branching (20 - 45 DAT)',
        durationDays: 'Day 20 to 45',
        keyActivities: 'Staking, thread tying, lateral shoot pruning.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate + Micronutrient Mix',
        vulnerablePestsAndDiseases: 'Leaf Miner, Whitefly, Early Blight'
      },
      {
        stageName: 'Flowering & Fruit Setting (45 - 75 DAT)',
        durationDays: 'Day 45 to 75',
        keyActivities: 'Vibration pollination, balanced irrigation (avoid water stress).',
        recommendedNutrients: '0:52:34 (MKP) + Boron 20% + Calcium Nitrate (Separate tank)',
        vulnerablePestsAndDiseases: 'Fruit Borer (Helicoverpa), Blossom End Rot, Powdery Mildew'
      },
      {
        stageName: 'Fruit Sizing & Harvest (75 - 130 DAT)',
        durationDays: 'Day 75 to 130',
        keyActivities: 'Harvesting at breaker/pink stage, selective defoliation.',
        recommendedNutrients: '0:0:50 (SOP) + 13:0:45 (Potassium Nitrate) + Calcium Nitrate',
        vulnerablePestsAndDiseases: 'Late Blight, Pinworm (Tuta absoluta), Fruit Cracking'
      }
    ],
    majorPests: [
      { name: 'Tomato Pinworm (Tuta absoluta)', symptoms: 'Mines in leaves, pinholes near fruit calyx with black frass.', management: 'Pheromone traps (16/acre) + Spinetoram 11.7 SC / Emamectin Benzoate 5 SG.' },
      { name: 'Whitefly (Bemisia tabaci)', symptoms: 'Yellow leaf curling, transmitting Tomato Leaf Curl Virus (ToLCV).', management: 'Yellow sticky cards (20/acre) + Imidacloprid 17.8 SL / Acetamiprid 20 SP.' },
      { name: 'Fruit Borer (Helicoverpa armigera)', symptoms: 'Circular bore holes in developing green and ripe fruits.', management: 'Emamectin Benzoate 5 SG (0.4 g/L) or Chlorantraniliprole 18.5 SC.' }
    ],
    majorDiseases: [
      { name: 'Early Blight (Alternaria solani)', symptoms: 'Concentric rings (target board spots) on lower mature leaves.', management: 'Mancozeb 75 WP (2.5 g/L) or Azoxystrobin + Difenoconazole SC (1 ml/L).' },
      { name: 'Late Blight (Phytophthora infestans)', symptoms: 'Water-soaked dark lesions with white fungal downy growth underneath.', management: 'Metalaxyl 8% + Mancozeb 64% WP (2.5 g/L) or Cymoxanil + Mancozeb.' },
      { name: 'Bacterial Wilt (Ralstonia)', symptoms: 'Sudden daytime wilting of plant without leaf yellowing.', management: 'Copper Oxychloride 50 WP drenching (3 g/L) + Streptocycline (0.1 g/L).' }
    ],
    fertigationSchedule: [
      { stage: '1st Month (Vegetative)', products: '19:19:19 + 12:61:00 + MgSO4', dose: '3 kg 19:19:19 + 2 kg MAP / acre / week' },
      { stage: '2nd Month (Flowering/Fruiting)', products: '0:52:34 + Calcium Nitrate (Separate)', dose: '3 kg MKP + 4 kg Cal-Nitrate / acre / week' },
      { stage: '3rd Month (Harvesting)', products: '0:0:50 (SOP) + 13:0:45', dose: '4 kg SOP + 2 kg Potassium Nitrate / acre / week' }
    ],
    harvestingTips: [
      'Harvest at "Breaker Stage" (pink bottom) for long-distance transport.',
      'Harvest at full red-ripe stage for local retail markets.',
      'Always pick early in the morning before daytime heat builds up.'
    ]
  },
  {
    id: 'crop-chilli',
    name: 'Chilli / Capsicum',
    scientificName: 'Capsicum annuum',
    localNameMr: 'मिरची / ढोबळी मिरची (Chilli)',
    category: 'Vegetable',
    idealSoil: 'Deep, fertile, well-drained loamy soil rich in organic matter',
    idealSoilPh: '6.5 – 7.5',
    tempRangeC: '20°C – 30°C (Sensitive to frost and extreme heat >38°C)',
    waterRequirementMm: '500 – 700 mm',
    seedRatePerAcre: '60 – 80 grams (Hybrids)',
    spacing: '3 to 4 ft row-to-row × 1.5 ft plant-to-plant',
    durationDays: '150 – 180 Days',
    yieldPerAcre: '8 – 12 Tonnes green chilli / 1.5 – 2.5 Tonnes dry chilli',
    criticalGrowthStages: [
      {
        stageName: 'Nursery & Seedling Establishment (0 - 25 DAT)',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Transplanting on raised beds with silver-black mulch, root drenching.',
        recommendedNutrients: '12:61:0 + Humic Acid + Trichoderma bio-agent',
        vulnerablePestsAndDiseases: 'Damping off, Root Rot, Thrips'
      },
      {
        stageName: 'Vegetative Branching (25 - 50 DAT)',
        durationDays: 'Day 25 to 50',
        keyActivities: 'Nipping terminal buds to induce multi-branching canopy.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Thrips, Yellow Mites, Cercospora Leaf Spot'
      },
      {
        stageName: 'Peak Flowering & Fruit Set (50 - 90 DAT)',
        durationDays: 'Day 50 to 90',
        keyActivities: 'Preventing flower drop, micronutrient supplementation.',
        recommendedNutrients: '0:52:34 + Boron 20% + Planofix/PGR (Calibrated ppm)',
        vulnerablePestsAndDiseases: 'Murda Complex (Thrips + Mites), Anthracnose (Dieback)'
      },
      {
        stageName: 'Fruiting & Multi-Pickings (90 - 180 DAT)',
        durationDays: 'Day 90 to 180',
        keyActivities: 'Continuous pickings every 8-10 days, potassium feeding.',
        recommendedNutrients: '13:0:45 + 0:0:50 + Calcium Nitrate',
        vulnerablePestsAndDiseases: 'Anthracnose Fruit Rot, Powdery Mildew'
      }
    ],
    majorPests: [
      { name: 'Chilli Black Thrips (Thrips parvispinus)', symptoms: 'Upward leaf curling, boat-shaped leaves, flower dropping, fruit scarring.', management: 'Spinetoram 11.7 SC (1 ml/L) or Fipronil 5 SC (2 ml/L) + Blue sticky traps (25/acre).' },
      { name: 'Yellow Mite (Polyphagotarsonemus latus)', symptoms: 'Downward leaf curling (inverted boat shape), elongated petiole, bronzing.', management: 'Spiromesifen 22.9 SC (1 ml/L) or Diafenthiuron 50 WP (1.2 g/L).' },
      { name: 'Fruit Borer (Spodoptera / Helicoverpa)', symptoms: 'Bored holes in pods with discolored internal seeds.', management: 'Emamectin Benzoate 5 SG (0.5 g/L) or Chlorantraniliprole 18.5 SC.' }
    ],
    majorDiseases: [
      { name: 'Anthracnose / Dieback (Colletotrichum)', symptoms: 'Circular sunken black lesions on ripe pods; branches dry from tip downward.', management: 'Azoxystrobin + Difenoconazole SC (1 ml/L) or Copper Oxychloride (2.5 g/L).' },
      { name: 'Powdery Mildew (Leveillula taurica)', symptoms: 'White powdery patches on leaf underside, yellow chlorotic spots on upper side.', management: 'Hexaconazole 5 EC (1.5 ml/L) or Tebuconazole 25.9 EC (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative Stage', products: '19:19:19 + 12:61:0', dose: '3 kg / acre / week' },
      { stage: 'Flowering & Fruiting', products: '0:52:34 + 13:0:45 + Calcium Nitrate', dose: '4 kg / acre / week' },
      { stage: 'Harvesting Phase', products: '0:0:50 (SOP)', dose: '3 - 4 kg / acre / week' }
    ],
    harvestingTips: [
      'Pick green chillies when pods are firm and glossy.',
      'For dry red chilli, allow fruits to turn fully deep red on plant before harvesting.',
      'Dry in clean shade/poly-tunnel to retain bright red capsanthin color.'
    ]
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    localNameMr: 'कापूस (Cotton)',
    category: 'Cash Crop',
    idealSoil: 'Deep black clayey soils (Vertisols) with good water retention capacity',
    idealSoilPh: '6.5 – 8.0',
    tempRangeC: '22°C – 35°C (Warm sun during boll maturation)',
    waterRequirementMm: '600 – 900 mm',
    seedRatePerAcre: '1.8 – 2.2 kg (Bt Hybrids)',
    spacing: '4 to 5 ft row-to-row × 1.5 to 2 ft plant-to-plant',
    durationDays: '150 – 180 Days',
    yieldPerAcre: '10 – 18 Quintals / Acre seed cotton',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Seedling (0 - 30 DAS)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Thinning to single plant per hill, inter-cultivation for weed management.',
        recommendedNutrients: 'Basal: DAP / 20:20:0:13 + Zinc Sulphate',
        vulnerablePestsAndDiseases: 'Sucking pest complex (Aphids, Jassids, Thrips), Collar Rot'
      },
      {
        stageName: 'Squaring / Bud Formation (30 - 65 DAS)',
        durationDays: 'Day 30 to 65',
        keyActivities: 'Canopy height management, protective sucking pest spray.',
        recommendedNutrients: '19:19:19 (Foliar 5g/L) + Magnesium Sulphate (prevent leaf reddening)',
        vulnerablePestsAndDiseases: 'Pink Bollworm entry, Mirid Bugs, Square drop'
      },
      {
        stageName: 'Flowering & Boll Development (65 - 120 DAS)',
        durationDays: 'Day 65 to 120',
        keyActivities: 'Peak water requirement, installation of pink bollworm pheromone traps.',
        recommendedNutrients: '0:52:34 + 13:0:45 + Boron 20% (Foliar) + MgSO4 (Foliar 10g/L)',
        vulnerablePestsAndDiseases: 'Pink Bollworm (PBW), Whitefly, Grey Mildew, Leaf Reddening'
      },
      {
        stageName: 'Boll Bursting & Picking (120 - 170 DAS)',
        durationDays: 'Day 120 to 170',
        keyActivities: 'Selective picking of fully opened clean dry bolls.',
        recommendedNutrients: '0:0:50 (SOP) spray to improve staple length & fiber strength',
        vulnerablePestsAndDiseases: 'Stainers, Bacterial Blight'
      }
    ],
    majorPests: [
      { name: 'Pink Bollworm (Pectinophora gossypiella)', symptoms: 'Rosette flowers, bored bolls, stained lint, damaged seeds inside locules.', management: 'Pheromone traps (8-10/acre) + Spinetoram 11.7 SC or Chlorpyrifos + Cypermethrin EC.' },
      { name: 'Jassids / Leafhoppers (Amrasca biguttula)', symptoms: 'Downward leaf hopper burn, yellowing margins, brown necrotic leaf edges.', management: 'Flonicamid 50 WG (0.3 g/L) or Imidacloprid 17.8 SL (0.4 ml/L).' },
      { name: 'Whitefly (Bemisia tabaci)', symptoms: 'Sooty mold on leaves, transmitting Cotton Leaf Curl Virus (CLCuV).', management: 'Pyriproxyfen 10 EC + Diafenthiuron 50 WP.' }
    ],
    majorDiseases: [
      { name: 'Leaf Reddening (Lalya / Physiological)', symptoms: 'Leaves turn purple/red from margins inwards due to Magnesium & Nitrogen deficiency under cold nights.', management: 'Foliar spray of 19:19:19 (10 g/L) + Magnesium Sulphate (10 g/L).' },
      { name: 'Grey Mildew / Dahiya (Ramularia areola)', symptoms: 'White powdery angular spots on lower leaf surface looking like curd/dahi.', management: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L) or Carbendazim 50 WP.' }
    ],
    fertigationSchedule: [
      { stage: 'Basal / Vegetative', products: 'NPK 10:26:26 / Urea + DAP', dose: 'Split in 3 top dressings' },
      { stage: 'Boll Formation', products: 'Potassium Nitrate 13:0:45 + MKP', dose: 'Foliar sprays @ 5 g/L at 75 & 90 DAS' }
    ],
    harvestingTips: [
      'Pick dry cotton in afternoon after morning dew has completely evaporated.',
      'Store in clean cotton cloth bags to avoid plastic contamination.'
    ]
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    scientificName: 'Saccharum officinarum',
    localNameMr: 'ऊस (Sugarcane)',
    category: 'Cash Crop',
    idealSoil: 'Deep, rich loamy soil with minimum 1 meter depth and good drainage',
    idealSoilPh: '6.5 – 7.8',
    tempRangeC: '24°C – 35°C (Long sunny days with high humidity)',
    waterRequirementMm: '1500 – 2500 mm',
    seedRatePerAcre: '25,000 – 30,000 eye buds / Acre (Two-bud setts)',
    spacing: '4 to 5 ft wide single row or 6 ft paired row',
    durationDays: '330 – 360 Days (Adsali: 450-500 Days)',
    yieldPerAcre: '50 – 90 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination Phase (0 - 45 DAP)',
        durationDays: 'Day 0 to 45',
        keyActivities: 'Sett treatment with carbendazim + imidacloprid, gap filling.',
        recommendedNutrients: 'Basal DAP + MOP + Zinc Sulphate + Single Super Phosphate',
        vulnerablePestsAndDiseases: 'Early Shoot Borer, Termites, Sett Rot'
      },
      {
        stageName: 'Tillering Phase (45 - 120 DAP)',
        durationDays: 'Day 45 to 120',
        keyActivities: 'Frequent light irrigations, partial earthing up.',
        recommendedNutrients: '19:19:19 + Urea + Ferrous Sulphate + Magnesium Sulphate',
        vulnerablePestsAndDiseases: 'Early Shoot Borer, White Grub, Scale Insect'
      },
      {
        stageName: 'Grand Growth / Cane Elongation (120 - 270 DAP)',
        durationDays: 'Day 120 to 270',
        keyActivities: 'Full earthing up, trash mulching, propping canes to prevent lodging.',
        recommendedNutrients: '12:61:0 + 0:52:34 + Gibberellic Acid (GA3) @ 40 ppm for internode stretch',
        vulnerablePestsAndDiseases: 'Top Shoot Borer, Pyrilla, Pokkah Boeng, Red Rot'
      },
      {
        stageName: 'Maturity & Sugar Ripening (270 - 360 DAP)',
        durationDays: 'Day 270 to 360',
        keyActivities: 'Withhold nitrogen; reduce irrigation 15 days before harvest to concentrate sucrose.',
        recommendedNutrients: '0:0:50 (SOP) / MOP for brix improvement',
        vulnerablePestsAndDiseases: 'Smut, Grassy Shoot Disease'
      }
    ],
    majorPests: [
      { name: 'Early Shoot Borer (Chilo infuscatellus)', symptoms: 'Dead hearts in shoots <90 days; foul smell when dead shoot is pulled.', management: 'Chlorantraniliprole 0.4% GR (7.5 kg/acre in soil) or Fipronil 5 SC (2 ml/L).' },
      { name: 'White Grub (Holotrichia serrata)', symptoms: 'Entire cane clump yellowing and drying up; roots completely eaten.', management: 'Soil drenching with Chlorpyrifos 20 EC (2 L/acre) with irrigation water.' }
    ],
    majorDiseases: [
      { name: 'Pokkah Boeng (Fusarium moniliforme)', symptoms: 'Chlorotic patches at base of young leaves, crinkling, rotting of cane top.', management: 'Copper Oxychloride 50 WP (2.5 g/L) or Carbendazim 50 WP (1 g/L).' },
      { name: 'Red Rot (Colletotrichum falcatum)', symptoms: 'Third/fourth leaf yellowing; splitting cane reveals red pith with white cross-bands.', management: 'Use certified disease-free setts + Trichoderma soil application.' }
    ],
    fertigationSchedule: [
      { stage: 'Tillering Phase', products: 'Urea + 19:19:19 + Micronutrients', dose: 'Every 10 days through drip' },
      { stage: 'Grand Growth Phase', products: '12:61:0 + 0:52:34 + SOP', dose: '5 kg / acre per week' }
    ],
    harvestingTips: [
      'Harvest at base level (flush with ground) using sharp cane cutters.',
      'Crush within 24-48 hours of cutting to prevent sucrose inversion and weight loss.'
    ]
  },
  {
    id: 'crop-grapes',
    name: 'Grapes',
    scientificName: 'Vitis vinifera',
    localNameMr: 'द्राक्षे (Grapes)',
    category: 'Fruit & Horticulture',
    idealSoil: 'Well-drained sandy loam to gravelly soil with no hard pan layer',
    idealSoilPh: '6.5 – 7.5',
    tempRangeC: '15°C – 35°C (Requires warm dry weather during fruit ripening)',
    waterRequirementMm: '500 – 700 mm (Regulated Deficit Irrigation)',
    seedRatePerAcre: '450 – 550 Vines / Acre (Grafted on Dogridge rootstock)',
    spacing: '8 to 10 ft row-to-row × 5 to 6 ft vine-to-vine (Y-trellis / Bower)',
    durationDays: 'Perennial (Pruning to Harvest: 120 – 140 Days)',
    yieldPerAcre: '10 – 15 Tonnes / Acre (Table grapes)',
    criticalGrowthStages: [
      {
        stageName: 'Foundation Pruning (April - Sept)',
        durationDays: 'Apr to Sept',
        keyActivities: 'Cane development, sub-cane pinching, internodal maturity.',
        recommendedNutrients: '19:19:19 + SSP + Magnesium Sulphate + 0:52:34',
        vulnerablePestsAndDiseases: 'Anthracnose, Flea Beetle, Mealybug'
      },
      {
        stageName: 'Forward / Fruit Pruning (Oct - Nov)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Hydrogen Cyanamide (Dormex) paste on bud eyes for uniform bud break.',
        recommendedNutrients: '12:61:0 (MAP) + Humic Acid + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Spodoptera, Thrips on sprouting shoots'
      },
      {
        stageName: 'Bunch Elongation & Flowering (30 - 65 Days)',
        durationDays: 'Day 30 to 65',
        keyActivities: 'GA3 dipping @ 10-15 ppm for bunch rachis stretching, berry thinning.',
        recommendedNutrients: '0:52:34 + Boron 20% + Calcium Nitrate',
        vulnerablePestsAndDiseases: 'Downy Mildew, Powdery Mildew, Thrips'
      },
      {
        stageName: 'Berry Sizing & Veraison (65 - 120 Days)',
        durationDays: 'Day 65 to 120',
        keyActivities: 'GA3 (40 ppm) + CPPU (1-2 ppm) berry sizing dips, bunch paper bagging.',
        recommendedNutrients: '13:0:45 + 0:0:50 (SOP) + Calcium Nitrate',
        vulnerablePestsAndDiseases: 'Powdery Mildew, Mealybug, Berry Cracking'
      }
    ],
    majorPests: [
      { name: 'Grapevine Mealybug (Maconellicoccus hirsutus)', symptoms: 'White cottony waxy mass on bunches, honeydew excretion, sooty mold.', management: 'Spirotetramat 15.31 OD (0.6 ml/L) or Buprofezin 25 SC (1.25 ml/L).' },
      { name: 'Thrips (Scirtothrips dorsalis)', symptoms: 'Scab formation/corky ring around berry pedicel, curled leaves.', management: 'Spinetoram 11.7 SC (0.5 ml/L) or Cyantraniliprole 10.26 OD.' }
    ],
    majorDiseases: [
      { name: 'Downy Mildew (Plasmopara viticola)', symptoms: 'Yellow oily spots on leaf surface, dense white downy growth on underside & bunches.', management: 'Dimethomorph 50 WP (1 g/L) or Mandipropamid 23.4 SC (0.8 ml/L) or Mancozeb 75 WP.' },
      { name: 'Powdery Mildew (Uncinula necator)', symptoms: 'Ash-grey powder on leaves and berries; berry cracking and foul mushroom smell.', management: 'Tebuconazole 25.9 EC (0.75 ml/L) or Fluopyram + Trifloxystrobin SC.' }
    ],
    fertigationSchedule: [
      { stage: 'Bud break to Flowering', products: '12:61:0 + 19:19:19 + Zinc', dose: '3 kg / acre / week' },
      { stage: 'Berry Development', products: '0:52:34 + Calcium Nitrate', dose: '4 kg / acre / week' },
      { stage: 'Veraison to Harvest', products: '0:0:50 (SOP) + 13:0:45', dose: '5 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest when Total Soluble Solids (TSS / Brix) reaches 18°–20° Brix.',
      'Cut bunches by pedicel with grape trimming scissors without touching the natural berry bloom wax.'
    ]
  },
  {
    id: 'crop-pomegranate',
    name: 'Pomegranate',
    scientificName: 'Punica granatum',
    localNameMr: 'डाळिंब (Pomegranate)',
    category: 'Fruit & Horticulture',
    idealSoil: 'Deep loamy to sandy loam soils with excellent subsoil drainage',
    idealSoilPh: '6.5 – 8.2',
    tempRangeC: '20°C – 38°C (Hot dry climate during fruit maturity develops deep ruby arils)',
    waterRequirementMm: '600 – 800 mm',
    seedRatePerAcre: '300 – 400 plants / Acre (Air-layered / Bhagwa variety)',
    spacing: '12 to 14 ft row-to-row × 8 to 10 ft plant-to-plant',
    durationDays: 'Bahar flowering to harvest: 150 – 180 Days',
    yieldPerAcre: '6 – 10 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Bahar Treatment & Defoliation',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Water stress for 30-45 days, ethrel defoliation spray, light pruning.',
        recommendedNutrients: 'Basal well-decomposed FYM + 10:26:26 + Micronutrients + Biofertilizers',
        vulnerablePestsAndDiseases: 'Stem Borer, Bacterial Blight on stem'
      },
      {
        stageName: 'Flowering & Fruit Setting',
        durationDays: 'Day 25 to 65',
        keyActivities: 'Preventing flower shedding, hand pollination if required.',
        recommendedNutrients: '0:52:34 + Boron 20% + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Thrips, Anar Butterfly (Deudorix isocrates), Anthracnose'
      },
      {
        stageName: 'Fruit Enlargement & Aril Coloring',
        durationDays: 'Day 65 to 140',
        keyActivities: 'Bagging individual fruits with non-woven fruit covers.',
        recommendedNutrients: 'Calcium Nitrate (5 kg/acre) + 13:0:45 + 0:0:50 (SOP)',
        vulnerablePestsAndDiseases: 'Bacterial Blight (Telya / Xanthomonas), Fruit Cracking, Mealybug'
      },
      {
        stageName: 'Harvesting Phase',
        durationDays: 'Day 140 to 180',
        keyActivities: 'Selective harvesting based on metallic ring sound on tapping.',
        recommendedNutrients: '0:0:50 for deep ruby red aril pigmentation',
        vulnerablePestsAndDiseases: 'Cercospora spot, Aspergillus internal rot'
      }
    ],
    majorPests: [
      { name: 'Pomegranate Fruit Borer / Anar Butterfly (Deudorix isocrates)', symptoms: 'Offensive odor, fruit rotting, excreta protruding from bored holes.', management: 'Emamectin Benzoate 5 SG (0.5 g/L) + non-woven fruit bagging.' },
      { name: 'Thrips & Mites', symptoms: 'Scabbing and star-shaped corky russeting on fruit skin.', management: 'Spinetoram 11.7 SC (1 ml/L) or Spiromesifen 22.9 SC.' }
    ],
    majorDiseases: [
      { name: 'Bacterial Blight / Telya (Xanthomonas axonopodis)', symptoms: 'Water-soaked oily dark spots with Y-shaped fruit cracking; brown nodal stem cankers.', management: 'Copper Oxychloride 50 WP (2.5 g/L) + Streptocycline (0.25 g/L) + 2-Bromo-2-nitropropane-1,3-diol (Bactericide).' },
      { name: 'Fruit Cracking (Physiological)', symptoms: 'Splitting of outer rind due to sudden fluctuations in soil moisture and Calcium/Boron deficiency.', management: 'Maintain uniform drip irrigation + Calcium Nitrate (4 g/L) + Boron (1.5 g/L) foliar sprays.' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative / Sprouting', products: '19:19:19 + 12:61:0', dose: '3 kg / acre / week' },
      { stage: 'Fruit Development', products: '0:52:34 + Calcium Nitrate', dose: '4 kg / acre / week' },
      { stage: 'Color Development', products: '13:0:45 + 0:0:50', dose: '4 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest using secateurs without damaging the fruit crown.',
      'Fruits should make a metallic ringing sound when tapped, indicating aril maturity.'
    ]
  },
  {
    id: 'crop-paddy',
    name: 'Paddy / Rice',
    scientificName: 'Oryza sativa',
    localNameMr: 'भात / धान (Paddy)',
    category: 'Cereal / Grain',
    idealSoil: 'Heavy clay or clayey loam with poor drainage / water-holding capacity',
    idealSoilPh: '5.5 – 7.0',
    tempRangeC: '22°C – 32°C',
    waterRequirementMm: '1200 – 1600 mm',
    seedRatePerAcre: '6 – 8 kg (Hybrids) / 15 – 20 kg (Varieties)',
    spacing: '20 cm × 15 cm in puddle transplanted field',
    durationDays: '115 – 145 Days',
    yieldPerAcre: '25 – 35 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Seedling & Tillering (0 - 40 DAT)',
        durationDays: 'Day 0 to 40',
        keyActivities: 'Puddling, transplanting 2-3 seedlings per hill, standing water 2-3 cm.',
        recommendedNutrients: 'Basal DAP + Zinc Sulphate (10 kg/acre in soil) + Urea',
        vulnerablePestsAndDiseases: 'Yellow Stem Borer, Gall Midge, Blast'
      },
      {
        stageName: 'Panicle Initiation & Booting (40 - 75 DAT)',
        durationDays: 'Day 40 to 75',
        keyActivities: 'Maintaining 5 cm water depth, split nitrogen top dressing.',
        recommendedNutrients: 'Urea + MOP + 19:19:19 (Foliar)',
        vulnerablePestsAndDiseases: 'Brown Plant Hopper (BPH), Sheath Blight, Leaf Folder'
      },
      {
        stageName: 'Flowering & Grain Filling (75 - 110 DAT)',
        durationDays: 'Day 75 to 110',
        keyActivities: 'Intermittent wetting and drying, foliar nutrition.',
        recommendedNutrients: '0:52:34 (MKP) + 13:0:45 + Boron 20%',
        vulnerablePestsAndDiseases: 'False Smut, Neck Blast, Gundhi Bug'
      },
      {
        stageName: 'Maturity & Ripening (110 - 135 DAT)',
        durationDays: 'Day 110 to 135',
        keyActivities: 'Drain field 10-12 days prior to harvest.',
        recommendedNutrients: 'Nil',
        vulnerablePestsAndDiseases: 'Rodents, Grain Discoloration'
      }
    ],
    majorPests: [
      { name: 'Brown Plant Hopper - BPH (Nilaparvata lugens)', symptoms: '"Hopper burn" circular drying patches in dense field, lodging.', management: 'Pymetrozine 50 WDG (0.6 g/L) or Triflumezopyrim 10 SC (0.5 ml/L).' },
      { name: 'Yellow Stem Borer (Scirpophaga incertulas)', symptoms: '"Dead hearts" in vegetative stage and "White ears" during panicle emergence.', management: 'Cartap Hydrochloride 4G (10 kg/acre) or Chlorantraniliprole 18.5 SC (0.3 ml/L).' },
      { name: 'Leaf Folder (Cnaphalocrocis medinalis)', symptoms: 'Longitudinally folded leaves with scraped white papery stripes.', management: 'Flubendiamide 39.35 SC or Emamectin Benzoate 5 SG.' }
    ],
    majorDiseases: [
      { name: 'Rice Blast (Pyricularia oryzae)', symptoms: 'Spindle-shaped eye spots with brown margins on leaves and blackened rotten panicle neck.', management: 'Tricyclazole 75 WP (0.6 g/L) or Isoprothiolane 40 EC (1.5 ml/L).' },
      { name: 'Sheath Blight (Rhizoctonia solani)', symptoms: 'Snake-skin like greenish-grey lesions on leaf sheath near water line.', management: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L) or Hexaconazole 5 SC.' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP + MOP + Zinc Sulphate', dose: 'At time of final puddling' },
      { stage: 'Active Tillering (20 DAT)', products: 'Urea (40 kg/acre)', dose: 'Top dressing' },
      { stage: 'Panicle Initiation (45 DAT)', products: 'Urea (25 kg) + MOP (15 kg)', dose: 'Top dressing' }
    ],
    harvestingTips: [
      'Harvest when 80-85% grains in the panicle turn golden yellow.',
      'Thresh at 20-22% grain moisture and sun-dry to 12-14% moisture before storage.'
    ]
  },
  {
    id: 'crop-onion',
    name: 'Onion',
    scientificName: 'Allium cepa',
    localNameMr: 'कांदा (Onion)',
    category: 'Vegetable',
    idealSoil: 'Deep, loose friable sandy loam with good organic matter',
    idealSoilPh: '6.5 – 7.5 (Sensitive to soil acidity)',
    tempRangeC: '15°C – 28°C (Bulbing requires 20°C–25°C & long photoperiod)',
    waterRequirementMm: '400 – 600 mm',
    seedRatePerAcre: '3.5 – 4.5 kg (Seed for nursery) / 4 – 5 Quintals sets',
    spacing: '15 cm row-to-row × 10 cm plant-to-plant on raised beds',
    durationDays: '110 – 130 Days (Kharif/Rabi)',
    yieldPerAcre: '12 – 18 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Transplanting & Establishment (0 - 30 DAT)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Seedling root dip in carbendazim + imidacloprid, light irrigation.',
        recommendedNutrients: 'Basal 10:26:26 + Sulphur 90% (10 kg/acre in soil)',
        vulnerablePestsAndDiseases: 'Thrips, Damping off, Basal Rot'
      },
      {
        stageName: 'Vegetative & Foliage Growth (30 - 65 DAT)',
        durationDays: 'Day 30 to 65',
        keyActivities: 'Weed management, frequent uniform irrigations.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate + Silicon Spreader',
        vulnerablePestsAndDiseases: 'Thrips, Purple Blotch, Stemphylium Blight'
      },
      {
        stageName: 'Bulb Development & Swelling (65 - 100 DAT)',
        durationDays: 'Day 65 to 100',
        keyActivities: 'Maintain consistent soil moisture; avoid water stress to prevent split bulbs.',
        recommendedNutrients: '0:52:34 + 13:0:45 + Boron 20% (Foliar 1.5 g/L)',
        vulnerablePestsAndDiseases: 'Purple Blotch, Downy Mildew, Thrips'
      },
      {
        stageName: 'Neck Fall & Curing (100 - 125 DAT)',
        durationDays: 'Day 100 to 125',
        keyActivities: 'Stop irrigation 15 days before harvest when 50% tops fall naturally.',
        recommendedNutrients: '0:0:50 (SOP) spray to thicken outer scale skin and prevent rot',
        vulnerablePestsAndDiseases: 'Collar Rot, Storage Black Mold'
      }
    ],
    majorPests: [
      { name: 'Onion Thrips (Thrips tabaci)', symptoms: 'Silvery white patches on foliage, curled leaf tips, reduced bulb size.', management: 'Fipronil 5 SC (2 ml/L) or Spinetoram 11.7 SC (0.75 ml/L) + Organosilicone sticker.' }
    ],
    majorDiseases: [
      { name: 'Purple Blotch (Alternaria porri)', symptoms: 'Small water-soaked sunken lesions with purple centers and yellow halos.', management: 'Azoxystrobin + Difenoconazole SC (1 ml/L) or Mancozeb 75 WP (2.5 g/L).' },
      { name: 'Basal Rot (Fusarium oxysporum)', symptoms: 'Yellowing of leaf blade starting from tip downwards, rotting of basal plate and roots.', management: 'Trichoderma harzianum soil application + Carbendazim 50 WP drench.' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative Phase', products: '19:19:19 + Sulphur', dose: '3 kg / acre / week' },
      { stage: 'Bulb Initiation', products: '0:52:34 + Micronutrients', dose: '4 kg / acre / week' },
      { stage: 'Bulb Development', products: '0:0:50 (SOP) + 13:0:45', dose: '4 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest when 50% to 70% of crop shows natural neck fall.',
      'Cure harvested bulbs in shade under dry airy condition for 10-15 days before cold storage.'
    ]
  },
  {
    id: 'crop-soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    localNameMr: 'सोयाबीन (Soybean)',
    category: 'Pulse / Oilseed',
    idealSoil: 'Well-drained medium black to loamy soil rich in organic matter',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '20°C – 32°C',
    waterRequirementMm: '450 – 600 mm',
    seedRatePerAcre: '25 – 30 kg / Acre (Broadbed Furrow BBF method)',
    spacing: '45 cm row-to-row × 5 to 7.5 cm plant-to-plant',
    durationDays: '90 – 105 Days',
    yieldPerAcre: '10 – 14 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Nodulation (0 - 25 DAS)',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Seed treatment with Rhizobium + PSB + Fungicide (Thiram+Carbendazim).',
        recommendedNutrients: 'Basal: 20:20:0:13 (Sulphur enriched) + Single Super Phosphate',
        vulnerablePestsAndDiseases: 'Stem Fly, Girdle Beetle, Collar Rot'
      },
      {
        stageName: 'Branching & Pre-Flowering (25 - 45 DAS)',
        durationDays: 'Day 25 to 45',
        keyActivities: 'Inter-cultivation, post-emergence weed control.',
        recommendedNutrients: '19:19:19 (Foliar 5g/L) + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Semilooper, Tobacco Caterpillar (Spodoptera), Yellow Mosaic Virus'
      },
      {
        stageName: 'Pod Formation & Seed Filling (45 - 75 DAS)',
        durationDays: 'Day 45 to 75',
        keyActivities: 'Critical moisture window for pod filling and grain size accumulation.',
        recommendedNutrients: '0:52:34 (MKP) + 13:0:45 + Boron 20%',
        vulnerablePestsAndDiseases: 'Pod Borer (Helicoverpa), Rust, Anthracnose Pod Blight'
      },
      {
        stageName: 'Pod Maturity & Harvesting (75 - 100 DAS)',
        durationDays: 'Day 75 to 100',
        keyActivities: 'Harvesting when 90% leaves turn yellow and drop off naturally.',
        recommendedNutrients: 'Nil',
        vulnerablePestsAndDiseases: 'Pod shattering if delayed'
      }
    ],
    majorPests: [
      { name: 'Girdle Beetle (Oberia brevis)', symptoms: 'Two parallel ring cuts on plant stem/petiole causing upper shoot to wither and droop.', management: 'Thiamethoxam + Lambda Cyhalothrin ZC (0.4 ml/L) or Chlorantraniliprole 18.5 SC.' },
      { name: 'Semilooper & Spodoptera Caterpillars', symptoms: 'Defoliated leaves with windowpane skeletonized appearance.', management: 'Emamectin Benzoate 5 SG (0.4 g/L) or Flubendiamide 39.35 SC.' }
    ],
    majorDiseases: [
      { name: 'Yellow Mosaic Virus (YMV)', symptoms: 'Bright yellow mosaic patches on leaves, transmitted by whiteflies.', management: 'Control whitefly vectors using Thiamethoxam 25 WG or Acetamiprid 20 SP.' },
      { name: 'Soybean Rust (Phakopsora pachyrhizi)', symptoms: 'Tiny brown pustules on leaf underside causing premature leaf drop.', management: 'Hexaconazole 5 EC (1 ml/L) or Propiconazole 25 EC (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal Soil Application', products: 'Single Super Phosphate (SSP) + 20:20:0:13', dose: '100 kg SSP + 50 kg 20:20:0:13 per acre' },
      { stage: 'Foliar Spray at Flowering', products: '19:19:19 + Micronutrients', dose: '5 g / L water' },
      { stage: 'Foliar Spray at Pod Fill', products: '0:52:34 + Boron 20%', dose: '5 g / L + 1 g/L' }
    ],
    harvestingTips: [
      'Harvest when pods make a rattling sound when shaken.',
      'Harvest in morning hours to prevent mechanical pod shattering.'
    ]
  },
  {
    id: 'crop-watermelon',
    name: 'Watermelon',
    scientificName: 'Citrullus lanatus',
    localNameMr: 'कलिंगड (Watermelon)',
    category: 'Fruit / Vine',
    idealSoil: 'Well-drained sandy loam or alluvial soil rich in organic matter',
    idealSoilPh: '6.0 – 7.0',
    tempRangeC: '25°C – 35°C (Warm sunny days and cool nights increase sweetness)',
    waterRequirementMm: '400 – 600 mm (Drip irrigation and mulching highly recommended)',
    seedRatePerAcre: '300 – 400 grams (approx. 4000-5000 seeds)',
    spacing: '5 to 6 ft row-to-row × 1.5 to 2 ft plant-to-plant on raised beds',
    durationDays: '65 – 85 Days',
    yieldPerAcre: '15 – 25 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Early Establishment (0 - 15 DAT)',
        durationDays: 'Day 0 to 15',
        keyActivities: 'Seedling transplanting on mulch paper, early root development.',
        recommendedNutrients: '12:61:0 (MAP) + Humic Acid + Trichoderma drenching',
        vulnerablePestsAndDiseases: 'Damping off, Cutworms, Thrips'
      },
      {
        stageName: 'Vine Elongation & Branching (15 - 35 DAT)',
        durationDays: 'Day 15 to 35',
        keyActivities: 'Rapid vegetative growth, lateral branch development.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate + Micronutrient Mix',
        vulnerablePestsAndDiseases: 'Leaf Miner, Red Pumpkin Beetle, Downy Mildew'
      },
      {
        stageName: 'Flowering & Fruit Setting (35 - 55 DAT)',
        durationDays: 'Day 35 to 55',
        keyActivities: 'Honeybee pollination is critical (do not spray toxic insecticides during morning hours).',
        recommendedNutrients: '0:52:34 (MKP) + Boron 20% + Calcium Nitrate',
        vulnerablePestsAndDiseases: 'Fruit Fly, Powdery Mildew, Gummy Stem Blight'
      },
      {
        stageName: 'Fruit Sizing & Maturation (55 - 80 DAT)',
        durationDays: 'Day 55 to 80',
        keyActivities: 'Fruit enlargement, sugar accumulation (brix development), stop watering 3-5 days before harvest.',
        recommendedNutrients: '13:0:45 (Potassium Nitrate) + 0:0:50 (SOP)',
        vulnerablePestsAndDiseases: 'Fruit Cracking, Watermelon Bud Necrosis Virus, Fruit Fly'
      }
    ],
    majorPests: [
      { name: 'Thrips & Whiteflies', symptoms: 'Upward curling of leaves, transmitting Watermelon Bud Necrosis Virus (WBNV).', management: 'Imidacloprid 17.8 SL (0.5 ml/L) or Spinetoram 11.7 SC (0.75 ml/L) + Blue/Yellow sticky traps.' },
      { name: 'Fruit Fly (Bactrocera cucurbitae)', symptoms: 'Punctures on young fruits causing rotting and deformed fruits.', management: 'Fruit fly pheromone traps (Cue lure 10/acre) + Spinosad 45 SC (0.3 ml/L).' },
      { name: 'Leaf Miner (Liriomyza trifolii)', symptoms: 'White zig-zag mines/trails on the leaf surface.', management: 'Abamectin 1.9 EC (0.5 ml/L) or Cyromazine.' }
    ],
    majorDiseases: [
      { name: 'Downy Mildew (Pseudoperonospora cubensis)', symptoms: 'Yellow angular spots on leaves turning brown, downy growth on underside.', management: 'Metalaxyl + Mancozeb 72 WP (2.5 g/L) or Dimethomorph (1 g/L).' },
      { name: 'Powdery Mildew (Podosphaera xanthii)', symptoms: 'White powdery coating on the upper surface of older leaves.', management: 'Hexaconazole 5 EC (1 ml/L) or Azoxystrobin + Difenoconazole SC.' },
      { name: 'Gummy Stem Blight / Vine Decline', symptoms: 'Brown lesions on stems, gummy amber ooze from stem nodes, sudden vine collapse.', management: 'Thiophanate Methyl 70 WP (1 g/L) or Tebuconazole.' }
    ],
    fertigationSchedule: [
      { stage: 'Early Vegetative (0-20 Days)', products: '19:19:19 + 12:61:0 + Urea', dose: '3 kg 19:19:19 + 2 kg MAP / acre / week' },
      { stage: 'Flowering to Fruit Set (20-45 Days)', products: '0:52:34 + Calcium Nitrate', dose: '4 kg MKP + 5 kg Cal-Nitrate / acre / week' },
      { stage: 'Fruit Sizing & Ripening (45-75 Days)', products: '13:0:45 + 0:0:50 (SOP)', dose: '5 kg SOP + 3 kg Potassium Nitrate / acre / week' }
    ],
    harvestingTips: [
      'Harvest when the tendril nearest to the fruit dries and turns brown.',
      'The spot where the melon rests on the ground turns from white to creamy yellow.',
      'A dull, hollow sound when thumped indicates maturity and readiness.'
    ]
  },
  {
    id: 'crop-potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    localNameMr: 'बटाटा (Potato)',
    category: 'Vegetable / Tuber',
    idealSoil: 'Loose, friable, well-drained sandy loam with good aeration',
    idealSoilPh: '5.5 – 6.5 (Slightly acidic is best to prevent scab)',
    tempRangeC: '15°C – 20°C (Tuberization is inhibited above 30°C)',
    waterRequirementMm: '500 – 700 mm',
    seedRatePerAcre: '8 – 10 Quintals of seed tubers (30-40g each)',
    spacing: '60 cm row-to-row × 20 cm plant-to-plant',
    durationDays: '90 – 110 Days',
    yieldPerAcre: '10 – 15 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Sprouting & Emergence (0 - 30 DAP)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Seed tuber treatment with Mancozeb + Imidacloprid, blind earthing up.',
        recommendedNutrients: 'Basal 10:26:26 + MOP + Zinc Sulphate + Magnesium Sulphate',
        vulnerablePestsAndDiseases: 'Cutworms, Black Scurf, Early Blight'
      },
      {
        stageName: 'Vegetative Growth (30 - 50 DAP)',
        durationDays: 'Day 30 to 50',
        keyActivities: 'Main earthing up before tuber initiation, nitrogen top dressing.',
        recommendedNutrients: 'Urea + 19:19:19 (Foliar) + Micronutrients',
        vulnerablePestsAndDiseases: 'Aphids, Leafhoppers, Late Blight'
      },
      {
        stageName: 'Tuber Initiation & Bulking (50 - 80 DAP)',
        durationDays: 'Day 50 to 80',
        keyActivities: 'Critical water requirement; avoid moisture stress or waterlogging.',
        recommendedNutrients: '0:52:34 + 13:0:45 + Boron 20%',
        vulnerablePestsAndDiseases: 'Late Blight (Phytophthora infestans), Potato Tuber Moth'
      },
      {
        stageName: 'Maturation & Skin Curing (80 - 100 DAP)',
        durationDays: 'Day 80 to 100',
        keyActivities: 'Dehaulming (cutting aerial stems) 10-15 days before harvest to harden tuber skin.',
        recommendedNutrients: '0:0:50 (SOP) spray to improve skin finish',
        vulnerablePestsAndDiseases: 'Common Scab, Soft Rot in soil'
      }
    ],
    majorPests: [
      { name: 'Aphids (Myzus persicae)', symptoms: 'Curling of tender leaves, sticky honeydew, vector for Potato Leaf Roll Virus (PLRV).', management: 'Thiamethoxam 25 WG (0.5 g/L) or Flonicamid 50 WG.' },
      { name: 'Potato Tuber Moth (Phthorimaea operculella)', symptoms: 'Mines in leaves and bore holes in exposed tubers.', management: 'Proper earthing up to cover tubers + Quinalphos 25 EC.' }
    ],
    majorDiseases: [
      { name: 'Late Blight (Phytophthora infestans)', symptoms: 'Water-soaked irregular spots on leaves with white fungal growth on underside; rapid plant death.', management: 'Preventive: Mancozeb 75 WP. Curative: Cymoxanil + Mancozeb or Dimethomorph.' },
      { name: 'Early Blight (Alternaria solani)', symptoms: 'Concentric dark rings (target board spots) on older leaves.', management: 'Azoxystrobin + Difenoconazole SC.' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative', products: '19:19:19 + Urea', dose: '3 kg / acre / week' },
      { stage: 'Tuber Initiation', products: '0:52:34', dose: '4 kg / acre / week' },
      { stage: 'Tuber Bulking', products: '13:0:45 + 0:0:50', dose: '5 kg / acre / week' }
    ],
    harvestingTips: [
      'Dehaulm (cut green tops) 10-12 days prior to digging to ensure skin curing.',
      'Harvest when soil is workable (not too wet) to avoid mud sticking.',
      'Cure harvested tubers in a cool, shaded area for a week before cold storage.'
    ]
  },
  {
    id: 'crop-onion',
    name: 'Onion (Kanda)',
    scientificName: 'Allium cepa',
    localNameMr: 'कांदा (Onion)',
    category: 'Vegetable / Bulb',
    idealSoil: 'Deep, friable, well-drained sandy loam or clay loam rich in organic carbon',
    idealSoilPh: '6.5 – 7.5',
    tempRangeC: '15°C – 30°C',
    waterRequirementMm: '400 – 600 mm',
    seedRatePerAcre: '3 – 4 kg (Nursery seedlings)',
    spacing: '15 cm row-to-row × 10 cm plant-to-plant',
    durationDays: '120 – 140 Days',
    yieldPerAcre: '10 – 16 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Seedling Establishment (0 - 25 DAT)',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Transplanting on flat/raised beds, root dipping in Carbendazim + Imidacloprid.',
        recommendedNutrients: '12:61:00 (MAP) + Humic Acid',
        vulnerablePestsAndDiseases: 'Damping off, Onion Maggot'
      },
      {
        stageName: 'Vegetative & Foliar Canopy (25 - 55 DAT)',
        durationDays: 'Day 25 to 55',
        keyActivities: 'Weed management, foliar nitrogen and sulphur application.',
        recommendedNutrients: '19:19:19 + Elemental Sulphur 90% + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Thrips (Thrips tabaci), Purple Blotch (Alternaria porri)'
      },
      {
        stageName: 'Bulb Initiation & Sizing (55 - 95 DAT)',
        durationDays: 'Day 55 to 95',
        keyActivities: 'Strict thrips control, withhold excess nitrogen to avoid thick neck bulbs.',
        recommendedNutrients: '0:52:34 + 13:0:45 + Boron 20%',
        vulnerablePestsAndDiseases: 'Thrips, Stemphylium Blight, Downy Mildew'
      },
      {
        stageName: 'Bulb Maturity & Neck Fall (95 - 125 DAT)',
        durationDays: 'Day 95 to 125',
        keyActivities: 'Withhold irrigation 15 days before harvest, observe 50% top neck fall.',
        recommendedNutrients: '0:0:50 (SOP) spray for bulb skin redness and storage life',
        vulnerablePestsAndDiseases: 'Basal Rot, Neck Rot'
      }
    ],
    majorPests: [
      { name: 'Onion Thrips (Thrips tabaci)', symptoms: 'Silvery white blotches on leaves, curling, leaf tip drying.', management: 'Fipronil 5 SC (1.5 ml/L) or Spinetoram 11.7 SC (0.5 ml/L) with silicone spreader.' }
    ],
    majorDiseases: [
      { name: 'Purple Blotch (Alternaria porri)', symptoms: 'Small water-soaked sunken lesions turning purplish brown on leaves.', management: 'Tebuconazole 50% + Trifloxystrobin 25% WG (0.6 g/L) or Mancozeb 75 WP.' },
      { name: 'Stemphylium Leaf Blight', symptoms: 'Yellowish to orange small flecks expanding to tip burn.', management: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative (0-40 DAT)', products: '19:19:19 + Ammonium Sulphate', dose: '4 kg / acre / week' },
      { stage: 'Bulb Initiation (40-75 DAT)', products: '0:52:34 + Boron', dose: '4 kg MKP + 500g Boron / acre / week' },
      { stage: 'Bulb Sizing (75-100 DAT)', products: '13:0:45 + 0:0:50 (SOP)', dose: '5 kg SOP / acre / week' }
    ],
    harvestingTips: [
      'Harvest when 50-70% of onion tops have fallen over naturally.',
      'Field cure bulbs in windrows under foliage cover for 3-5 days to dry outer scale leaves.',
      'Cut foliage keeping 2.5 cm neck above bulb to prevent pathogen entry in storage.'
    ]
  },
  {
    id: 'crop-grapes',
    name: 'Grapes (Draksh)',
    scientificName: 'Vitis vinifera',
    localNameMr: 'द्राक्षे (Grapes)',
    category: 'Fruit',
    idealSoil: 'Well-drained sandy loam to medium black soil, electrical conductivity <1.0 dS/m',
    idealSoilPh: '6.5 – 8.0',
    tempRangeC: '15°C – 35°C',
    waterRequirementMm: '700 – 900 mm',
    seedRatePerAcre: '450 – 550 Rootstocks (Dogridge/Salt Creek)',
    spacing: '9 to 10 ft row-to-row × 5 to 6 ft vine-to-vine',
    durationDays: '130 – 160 Days (Forward Pruning)',
    yieldPerAcre: '10 – 15 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Sprouting & Shoot Growth (0 - 30 DAP)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Hydrogen Cyanamide application for uniform bud break, shoot thinning.',
        recommendedNutrients: '12:61:00 + Urea + Micronutrient Mix',
        vulnerablePestsAndDiseases: 'Flea Beetle, Thrips, Anthracnose'
      },
      {
        stageName: 'Flowering & Cap Fall (30 - 55 DAP)',
        durationDays: 'Day 30 to 55',
        keyActivities: 'Inflorescence dipping in GA3 (Gibberellic Acid) for elongation, berry thinning.',
        recommendedNutrients: '0:52:34 + Boron 20% + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Downy Mildew (Plasmopara viticola), Powdery Mildew'
      },
      {
        stageName: 'Berry Sizing & Softening (55 - 90 DAP)',
        durationDays: 'Day 55 to 90',
        keyActivities: 'GA3 dipping for berry enlargement, canopy tipping and cluster aeration.',
        recommendedNutrients: 'Calcium Nitrate + Magnesium Sulphate + 13:0:45',
        vulnerablePestsAndDiseases: 'Mealybug, Downy Mildew, Leafhopper'
      },
      {
        stageName: 'Veraison, Sugar Accumulation & Harvest (90 - 145 DAP)',
        durationDays: 'Day 90 to 145',
        keyActivities: 'Bunch aeration, bird netting, monitoring brix levels (18-20° Brix).',
        recommendedNutrients: '0:0:50 (SOP) + Potassium Silicate',
        vulnerablePestsAndDiseases: 'Berry Cracking, Botrytis Bunch Rot'
      }
    ],
    majorPests: [
      { name: 'Grapevine Mealybug (Maconellicoccus hirsutus)', symptoms: 'White waxy colonies on bunches and canes, sticky honeydew and sooty mould.', management: 'Spirotetramat + Imidacloprid SC (0.6 ml/L) or Cryptolaemus predatory beetles.' }
    ],
    majorDiseases: [
      { name: 'Downy Mildew (Plasmopara viticola)', symptoms: 'Yellow oily spots on upper leaf surface, white downy growth underneath, infected bunches turn brown and shrivel.', management: 'Cymoxanil 8% + Mancozeb 64% WP (2.5 g/L) or Dimethomorph 50 WP (1 g/L).' },
      { name: 'Powdery Mildew (Uncinula necator)', symptoms: 'White powdery coating on leaves and young berries, leading to berry cracking.', management: 'Hexaconazole 5 EC (1 ml/L) or Nativo (Tebuconazole + Trifloxystrobin WG, 0.4 g/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Shoot Growth', products: '19:19:19 + 12:61:0', dose: '5 kg / acre / week' },
      { stage: 'Berry Sizing', products: 'Calcium Nitrate + 0:52:34 (Separate)', dose: '5 kg / acre / week' },
      { stage: 'Veraison to Harvest', products: '0:0:50 (SOP)', dose: '6 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest when berries reach minimum 18-20° Brix sugar content and acidity drops below 0.6%.',
      'Harvest during cool morning hours using sharp harvesting shears.'
    ]
  },
  {
    id: 'crop-banana',
    name: 'Banana (Kela)',
    scientificName: 'Musa acuminata',
    localNameMr: 'केळी (Banana)',
    category: 'Fruit',
    idealSoil: 'Deep, rich, loamy soil with 0.5-1% organic carbon and good drainage',
    idealSoilPh: '6.5 – 7.5',
    tempRangeC: '20°C – 35°C',
    waterRequirementMm: '1200 – 1800 mm (High water consumer)',
    seedRatePerAcre: '1200 – 1400 Tissue Culture Plantlets (Grand Naine - G9)',
    spacing: '5 ft × 5 ft or 6 ft × 5 ft',
    durationDays: '330 – 365 Days (11-12 Months)',
    yieldPerAcre: '35 – 45 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Establishment & Vegetative (0 - 5 Months)',
        durationDays: 'Month 0 to 5',
        keyActivities: 'Weed management, desuckering, monthly drip fertigation.',
        recommendedNutrients: 'Urea + 19:19:19 + Magnesium Sulphate + Ferrous Sulphate',
        vulnerablePestsAndDiseases: 'Rhizome Weevil, Nematodes, Sigatoka Leaf Spot'
      },
      {
        stageName: 'Shooting & Flower Inflorescence (6 - 8 Months)',
        durationDays: 'Month 6 to 8',
        keyActivities: 'Bunch emergence, opening petals, spraying bunch, removing male bud (denavelling).',
        recommendedNutrients: '0:52:34 + Calcium Nitrate + Potassium Nitrate',
        vulnerablePestsAndDiseases: 'Thrips (Rust Thrips), Bunch Aphid, Sigatoka'
      },
      {
        stageName: 'Bunch Sizing & Finger Development (8 - 11 Months)',
        durationDays: 'Month 8 to 11',
        keyActivities: 'Bunch sleeve covering (blue polyethylene bag), bamboo prop support.',
        recommendedNutrients: '0:0:50 (SOP) + Micronutrient spray + GA3 (10 ppm)',
        vulnerablePestsAndDiseases: 'Anthracnose, Cigar End Rot'
      }
    ],
    majorPests: [
      { name: 'Banana Pseudostem Weevil (Odoiporus longicollis)', symptoms: 'Pinholes with gummy exudation on pseudostem, yellowing of crown.', management: 'Stem injection with Chlorpyrifos 20 EC or monocrotophos.' }
    ],
    majorDiseases: [
      { name: 'Sigatoka Leaf Spot (Mycosphaerella musicola)', symptoms: 'Spindle-shaped brown streaks with grey center on leaves, drying green canopy.', management: 'Propiconazole 25 EC (1 ml/L) + Mineral oil or Azoxystrobin SC (1 ml/L).' },
      { name: 'Panama Wilt (Fusarium oxysporum f. sp. cubense)', symptoms: 'Yellowing of lower leaves, longitudinal splitting of pseudostem.', management: 'Drenching with Trichoderma viride + Carbendazim 50 WP.' }
    ],
    fertigationSchedule: [
      { stage: 'Vegetative Phase', products: 'Urea + 19:19:19 + DAP', dose: '15-20 kg N-P-K per acre / week' },
      { stage: 'Shooting to Harvest', products: '0:0:50 + SOP + Potassium Nitrate', dose: '25 kg Potash / acre / week' }
    ],
    harvestingTips: [
      'Harvest bunches when fingers become plump and angles disappear (3/4th to full maturity).',
      'Leave 20-30 cm stalk above the first hand for convenient handling.'
    ]
  },
  {
    id: 'crop-ginger',
    name: 'Ginger (Adrak)',
    scientificName: 'Zingiber officinale',
    localNameMr: 'आले / अद्रक (Ginger)',
    category: 'Spice / Cash Crop',
    idealSoil: 'Sandy loam or clay loam with high organic humus and zero waterlogging',
    idealSoilPh: '6.0 – 6.8',
    tempRangeC: '19°C – 28°C',
    waterRequirementMm: '1500 – 2000 mm',
    seedRatePerAcre: '8 – 10 Quintals of seed rhizomes (25-30g pieces with 1-2 buds)',
    spacing: 'Raised beds (120 cm width) × 25 cm row × 20 cm plant',
    durationDays: '210 – 240 Days (7-8 Months)',
    yieldPerAcre: '8 – 14 Tonnes green ginger / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Sprouting & Emergence (0 - 45 DAP)',
        durationDays: 'Day 0 to 45',
        keyActivities: 'Rhizome treatment with Trichoderma + Mancozeb, green leaf mulching.',
        recommendedNutrients: 'Basal FYM + DAP + Neem cake + 12:61:00',
        vulnerablePestsAndDiseases: 'Rhizome Rot (Pythium), Shoot Borer'
      },
      {
        stageName: 'Tillering & Vegetative Canopy (45 - 120 DAP)',
        durationDays: 'Day 45 to 120',
        keyActivities: 'Second and third earthing up, replenishing leaf mulch.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate + Micronutrient Foliar',
        vulnerablePestsAndDiseases: 'Bacterial Wilt, Soft Rot, Leaf Spot'
      },
      {
        stageName: 'Rhizome Development & Maturation (120 - 220 DAP)',
        durationDays: 'Day 120 to 220',
        keyActivities: 'Regulated moisture, drenching bio-fungicides to prevent soft rot.',
        recommendedNutrients: '0:52:34 + 13:0:45 + Potassium Silicate',
        vulnerablePestsAndDiseases: 'Rhizome Scale, Soft Rot (Pythium aphanidermatum)'
      }
    ],
    majorPests: [
      { name: 'Shoot Borer (Conogethes punctiferalis)', symptoms: 'Bore holes on pseudo-stems with frass, central shoot dies (dead heart).', management: 'Chlorantraniliprole 18.5 SC (0.4 ml/L) or Flubendiamide 39.35 SC.' }
    ],
    majorDiseases: [
      { name: 'Soft Rot / Rhizome Rot (Pythium spp.)', symptoms: 'Water-soaked soft brown decay of collar region, rotting rhizomes emit foul smell.', management: 'Metalaxyl-M 4% + Mancozeb 64% WP drenching (2.5 g/L) + Trichoderma viride.' }
    ],
    fertigationSchedule: [
      { stage: 'Tillering Stage', products: '19:19:19 + Humic Acid', dose: '4 kg / acre / week' },
      { stage: 'Rhizome Expansion', products: '0:52:34 + 13:0:45', dose: '5 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest green ginger at 6 months; harvest mature dry ginger at 8 months when leaves turn completely yellow and dry.'
    ]
  },
  {
    id: 'crop-turmeric',
    name: 'Turmeric (Haldi)',
    scientificName: 'Curcuma longa',
    localNameMr: 'हळद (Turmeric)',
    category: 'Spice / Cash Crop',
    idealSoil: 'Deep, loose, fertile sandy loam or alluvial soil with high drainage',
    idealSoilPh: '6.5 – 7.5',
    tempRangeC: '20°C – 35°C',
    waterRequirementMm: '1200 – 1500 mm',
    seedRatePerAcre: '8 – 10 Quintals mother or finger rhizomes',
    spacing: 'Raised beds (4.5 to 5 ft broad beds) with 2 rows × 30 cm spacing',
    durationDays: '240 – 270 Days (8-9 Months)',
    yieldPerAcre: '12 – 18 Tonnes fresh rhizomes (2.5 – 3.5 Tonnes cured dry)',
    criticalGrowthStages: [
      {
        stageName: 'Sprouting & Establishment (0 - 60 DAP)',
        durationDays: 'Day 0 to 60',
        keyActivities: 'Seed rhizome treatment, straw/sugarcane bagasse mulching.',
        recommendedNutrients: '12:61:0 + Humic Acid + VAM bio-fertilizer',
        vulnerablePestsAndDiseases: 'Rhizome Rot, Damping off'
      },
      {
        stageName: 'Tillering & Canopy Expansion (60 - 150 DAP)',
        durationDays: 'Day 60 to 150',
        keyActivities: 'Earthing up to facilitate finger development, weed removal.',
        recommendedNutrients: '19:19:19 + Sulphur 90% + Ferrous Sulphate + Zinc EDTA',
        vulnerablePestsAndDiseases: 'Leaf Blotch (Taphrina maculans), Leaf Spot (Colletotrichum)'
      },
      {
        stageName: 'Rhizome Bulking & Curcumin Accumulation (150 - 240 DAP)',
        durationDays: 'Day 150 to 240',
        keyActivities: 'High potassium nutrition for curcumin synthesis and finger density.',
        recommendedNutrients: '0:52:34 + 0:0:50 (SOP) + Boron 20%',
        vulnerablePestsAndDiseases: 'Rhizome Scale, Shoot Borer'
      }
    ],
    majorPests: [
      { name: 'Shoot Borer (Conogethes punctiferalis)', symptoms: 'Larva bores into pseudo-stem leading to central shoot drying.', management: 'Spinetoram 11.7 SC (0.5 ml/L) or Emamectin Benzoate 5 SG.' }
    ],
    majorDiseases: [
      { name: 'Rhizome Rot (Pythium aphanidermatum)', symptoms: 'Basal leaf yellowing progressing upwards, rhizomes become soft and rot.', management: 'Copper Oxychloride 50 WP (3 g/L) + Streptocycline drenching.' },
      { name: 'Leaf Blotch (Taphrina maculans)', symptoms: 'Small reddish brown spots coalescing on both sides of leaf.', management: 'Mancozeb 75 WP (2.5 g/L) or Azoxystrobin + Difenoconazole (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Canopy Development', products: '19:19:19 + Urea', dose: '5 kg / acre / week' },
      { stage: 'Rhizome Bulking', products: '0:52:34 + 0:0:50 (SOP)', dose: '6 kg / acre / week' }
    ],
    harvestingTips: [
      'Harvest when aerial leaves turn yellow and dry completely (around 8-9 months after planting).'
    ]
  },
  {
    id: 'crop-groundnut',
    name: 'Groundnut / Peanut (Mungfali)',
    scientificName: 'Arachis hypogaea',
    localNameMr: 'भुईमूग (Groundnut)',
    category: 'Oilseed / Legume',
    idealSoil: 'Light sandy loam or loamy sand with good calcium and organic matter',
    idealSoilPh: '6.0 – 7.0',
    tempRangeC: '22°C – 30°C',
    waterRequirementMm: '450 – 600 mm',
    seedRatePerAcre: '40 – 50 kg kernels (Seed treated with Rhizobium + Trichoderma)',
    spacing: '30 cm row-to-row × 10 cm plant-to-plant',
    durationDays: '105 – 120 Days',
    yieldPerAcre: '1.2 – 1.8 Tonnes dry pods / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Vegetative Growth (0 - 30 DAS)',
        durationDays: 'Day 0 to 30',
        keyActivities: 'Seed treatment, weed control with post-emergence herbicide.',
        recommendedNutrients: 'Basal SSP + Gypsum (200 kg/acre) + Zinc Sulphate',
        vulnerablePestsAndDiseases: 'Collar Rot, Aphids'
      },
      {
        stageName: 'Flowering & Pegging (30 - 60 DAS)',
        durationDays: 'Day 30 to 60',
        keyActivities: 'Crucial Gypsum application at pegging (Day 40-45) for shell development.',
        recommendedNutrients: 'Gypsum (Calcium & Sulphur) + Boron foliar spray (1 g/L)',
        vulnerablePestsAndDiseases: 'Tikka Leaf Spot (Cercospora), Spodoptera litura (Tobacco Caterpillar)'
      },
      {
        stageName: 'Pod Development & Kernel Filling (60 - 100 DAS)',
        durationDays: 'Day 60 to 100',
        keyActivities: 'Moisture maintenance; avoid soil compaction around developing pods.',
        recommendedNutrients: '0:52:34 + 13:0:45 (Foliar)',
        vulnerablePestsAndDiseases: 'Rust (Puccinia arachidis), Pod Borers'
      }
    ],
    majorPests: [
      { name: 'Spodoptera Caterpillar (Spodoptera litura)', symptoms: 'Defoliation of leaves, skeletonized leaf appearance.', management: 'Emamectin Benzoate 5 SG (0.4 g/L) or Chlorantraniliprole 18.5 SC.' }
    ],
    majorDiseases: [
      { name: 'Tikka Leaf Spot (Cercospora arachidicola)', symptoms: 'Dark brown spots with yellow halo on leaves leading to premature leaf shedding.', management: 'Hexaconazole 5 EC (1 ml/L) or Mancozeb 75 WP (2.5 g/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Pegging Phase', products: 'Gypsum (Soil) + Boron (Foliar)', dose: '200 kg Gypsum soil + 1g/L Boron' },
      { stage: 'Pod Filling', products: '0:52:34 + 0:0:50', dose: '3 kg / acre' }
    ],
    harvestingTips: [
      'Harvest when inside shell turns dark brownish-black and kernels have natural pink seed coats.'
    ]
  },
  {
    id: 'crop-wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    localNameMr: 'गहू (Wheat)',
    category: 'Cereal / Grain',
    idealSoil: 'Well-drained loamy or clay loam soil, good water retention',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '10°C – 25°C (Cold tolerant; sensitive to frost at flowering)',
    waterRequirementMm: '450 – 650 mm',
    seedRatePerAcre: '40 – 45 kg (Broadcast); 30 – 35 kg (Drilled)',
    spacing: 'Row-to-row: 20–22 cm (Drill sowing)',
    durationDays: '110 – 130 Days',
    yieldPerAcre: '15 – 22 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Crown Root (0 - 21 DAS)',
        durationDays: 'Day 0 to 21',
        keyActivities: 'Seed treatment with Carbendazim + Thiram, basal fertilizer (DAP + Urea).',
        recommendedNutrients: 'DAP (18:46:0) 50 kg/acre + Urea 25 kg/acre (Basal)',
        vulnerablePestsAndDiseases: 'Loose Smut (Ustilago), Termites, Root Aphid'
      },
      {
        stageName: 'Tillering (21 - 45 DAS)',
        durationDays: 'Day 21 to 45',
        keyActivities: 'First top dressing of Urea; weed management with Clodinafop + Metsulfuron.',
        recommendedNutrients: 'Urea 25 kg/acre (Top Dressing)',
        vulnerablePestsAndDiseases: 'Yellow Rust (Puccinia striiformis), Aphids, Weeds'
      },
      {
        stageName: 'Jointing & Booting (45 - 75 DAS)',
        durationDays: 'Day 45 to 75',
        keyActivities: 'Second top dressing; monitor for rust with fungicide.',
        recommendedNutrients: 'Urea 20 kg/acre + Potassium Sulphate 10 kg/acre',
        vulnerablePestsAndDiseases: 'Brown Rust, Black Rust, Leaf Blight'
      },
      {
        stageName: 'Grain Filling & Harvest (75 - 120 DAS)',
        durationDays: 'Day 75 to 120',
        keyActivities: 'Irrigation at grain filling; avoid lodging; harvest at golden yellow stage.',
        recommendedNutrients: 'Potassium Nitrate (13:0:45) Foliar 0.5% solution',
        vulnerablePestsAndDiseases: 'Karnal Bunt, Aphid (Grain), Rodents'
      }
    ],
    majorPests: [
      { name: 'Aphid (Sitobion avenae)', symptoms: 'Colonies on leaves and ears; honeydew causes sooty mould.', management: 'Dimethoate 30 EC (1 ml/L) or Thiamethoxam 25 WG (0.3 g/L).' },
      { name: 'Army Worm (Mythimna separata)', symptoms: 'Defoliation and cutting of ears during grain filling.', management: 'Chlorpyrifos 20 EC (2 ml/L) or Emamectin Benzoate 5 SG.' }
    ],
    majorDiseases: [
      { name: 'Yellow Rust (Puccinia striiformis)', symptoms: 'Stripe pattern of yellow pustules running along leaf veins.', management: 'Propiconazole 25 EC (1 ml/L) or Tebuconazole 250 EW (1 ml/L).' },
      { name: 'Loose Smut (Ustilago tritici)', symptoms: 'Entire ear replaced with black fungal mass of spores.', management: 'Seed treatment with Carboxin + Thiram 37.5 DS (2 g/kg seed).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal (At Sowing)', products: 'DAP + Muriate of Potash', dose: '50 kg DAP + 25 kg MOP/acre' },
      { stage: 'First Top Dressing (21 DAS)', products: 'Urea', dose: '25 kg/acre' },
      { stage: 'Second Top Dressing (45 DAS)', products: 'Urea', dose: '20 kg/acre' }
    ],
    harvestingTips: [
      'Harvest when crop turns golden yellow and grains are hard.',
      'Moisture at harvest should be 12–14% for safe storage.',
      'Thrashing within 2–3 days of cutting to prevent field losses.'
    ]
  },
  {
    id: 'crop-maize',
    name: 'Maize / Corn',
    scientificName: 'Zea mays',
    localNameMr: 'मका (Maize)',
    category: 'Cereal / Grain',
    idealSoil: 'Deep, well-drained loamy soil; does not tolerate waterlogging',
    idealSoilPh: '5.8 – 7.0',
    tempRangeC: '18°C – 32°C (Sensitive to frost)',
    waterRequirementMm: '500 – 800 mm',
    seedRatePerAcre: '8 – 10 kg (Hybrid) / 20 kg (Open Pollinated)',
    spacing: '60–75 cm row × 20–25 cm plant',
    durationDays: '90 – 110 Days (Kharif); 100 – 120 Days (Rabi)',
    yieldPerAcre: '25 – 40 Quintals / Acre (Hybrid)',
    criticalGrowthStages: [
      {
        stageName: 'Seedling & Establishment (0 - 20 DAS)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Seed treatment with fungicide + insecticide slurry; adequate soil moisture at sowing.',
        recommendedNutrients: '12:32:16 (Complex) 50 kg/acre as basal',
        vulnerablePestsAndDiseases: 'Seed rot, Pythium damping off, Cutworms'
      },
      {
        stageName: 'Vegetative (V3 - V8) (20 - 50 DAS)',
        durationDays: 'Day 20 to 50',
        keyActivities: 'First top dressing; earthing up for root anchorage; weed management.',
        recommendedNutrients: 'Urea 30 kg + Potassium Sulphate 15 kg/acre',
        vulnerablePestsAndDiseases: 'Fall Army Worm (Spodoptera frugiperda), Shoot Fly, Downy Mildew'
      },
      {
        stageName: 'Tasseling & Silking (50 - 75 DAS)',
        durationDays: 'Day 50 to 75',
        keyActivities: 'Most critical irrigation window; ensure no water stress at silking.',
        recommendedNutrients: '0:52:34 (MKP) + Boron 0.5 g/L foliar',
        vulnerablePestsAndDiseases: 'Corn Borer (Chilo partellus), Smut, Corn Leaf Aphid'
      },
      {
        stageName: 'Grain Filling & Maturity (75 - 110 DAS)',
        durationDays: 'Day 75 to 110',
        keyActivities: 'Withhold irrigation 20 days before harvest; harvest at black layer formation.',
        recommendedNutrients: 'Potassium Nitrate (13:0:45) Foliar 0.5%',
        vulnerablePestsAndDiseases: 'Rust, Ear Borer, Fusarium Ear Rot'
      }
    ],
    majorPests: [
      { name: 'Fall Army Worm (Spodoptera frugiperda)', symptoms: 'Window-pane damage on whorl leaves with pinhole pattern; frass deposits.', management: 'Emamectin Benzoate 5 SG (0.4 g/L) or Chlorantraniliprole 18.5 SC (0.4 ml/L) applied into whorl.' },
      { name: 'Corn Stem Borer (Chilo partellus)', symptoms: 'Dead heart in whorl stage; bored stems with frass at tasseling.', management: 'Carbofuran 3G granules into whorl (8 kg/acre) or Quinalphos 25 EC (2 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Turcicum Blight (Exserohilum turcicum)', symptoms: 'Long cigar-shaped tan lesions with wavy margins on leaves.', management: 'Mancozeb 75 WP (2.5 g/L) or Azoxystrobin + Difenoconazole SC (1 ml/L).' },
      { name: 'Downy Mildew (Peronosclerospora sorghi)', symptoms: 'Chlorotic stripes on leaves; white downy growth on underside.', management: 'Metalaxyl 8% + Mancozeb 64% WP (2.5 g/L); seed treatment with Metalaxyl.' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: '12:32:16 Complex', dose: '50 kg/acre' },
      { stage: '25 DAS Top Dressing', products: 'Urea + MOP', dose: '30 kg + 15 kg/acre' },
      { stage: '45 DAS Top Dressing', products: 'Urea', dose: '20 kg/acre' }
    ],
    harvestingTips: [
      'Harvest at 25–30% grain moisture (black layer visible at tip of grain).',
      'Dry to 12–13% for safe storage.',
      'Separate cobs from husk and shell promptly to prevent aflatoxin contamination.'
    ]
  },
  {
    id: 'crop-mango',
    name: 'Mango',
    scientificName: 'Mangifera indica',
    localNameMr: 'आंबा (Mango)',
    category: 'Fruit & Horticulture',
    idealSoil: 'Deep, well-drained sandy loam to loamy soil; tolerates slightly acidic soils',
    idealSoilPh: '5.5 – 7.5',
    tempRangeC: '24°C – 30°C (Cool dry period needed for flowering)',
    waterRequirementMm: '1000 – 1500 mm',
    seedRatePerAcre: '40 – 50 Grafted plants / acre (5 × 8 m spacing)',
    spacing: '8 m × 5 m (High Density) to 10 m × 10 m (Conventional)',
    durationDays: 'Perennial; 3–5 years to first commercial harvest',
    yieldPerAcre: '4 – 10 Tonnes / Acre (Bearing stage)',
    criticalGrowthStages: [
      {
        stageName: 'Pre-flowering / Panicle Initiation (Oct - Dec)',
        durationDays: 'October to December',
        keyActivities: 'Withhold irrigation 4–6 weeks to induce stress for flower initiation; apply Paclobutrazol.',
        recommendedNutrients: 'Potassium Sulphate 2 kg/tree; Superphosphate 1 kg/tree',
        vulnerablePestsAndDiseases: 'Anthracnose (Colletotrichum), Powdery Mildew, Thrips'
      },
      {
        stageName: 'Flowering & Fruit Set (Jan - Mar)',
        durationDays: 'January to March',
        keyActivities: 'Protect panicles from fungal diseases; bee pollination is critical.',
        recommendedNutrients: 'Boron 0.5 g/L + Calcium Nitrate 2 g/L foliar spray',
        vulnerablePestsAndDiseases: 'Powdery Mildew (Oidium mangiferae), Hoppers (Amritodus atkinsoni), Mango Inflorescence Midge'
      },
      {
        stageName: 'Fruit Development (Mar - May)',
        durationDays: 'March to May',
        keyActivities: 'Regular irrigation; calcium sprays to prevent fruit drop and cracking.',
        recommendedNutrients: '13:0:45 + Calcium Nitrate (2 g/L each) — alternate sprays',
        vulnerablePestsAndDiseases: 'Mango Fruit Fly (Bactrocera dorsalis), Fruit Anthracnose, Stone Weevil'
      }
    ],
    majorPests: [
      { name: 'Mango Hopper (Amritodus atkinsoni)', symptoms: 'Nymphs and adults suck sap from panicles; honeydew promotes sooty mold.', management: 'Imidacloprid 17.8 SL (0.5 ml/L) or Deltamethrin 2.8 EC (1 ml/L) before flowering.' },
      { name: 'Mango Fruit Fly (Bactrocera dorsalis)', symptoms: 'Punctured ripe fruits; maggots inside; premature fruit drop.', management: 'Protein bait traps + Malathion 50 EC (2 ml/L) + sugar 1%.' }
    ],
    majorDiseases: [
      { name: 'Powdery Mildew (Oidium mangiferae)', symptoms: 'White powdery coating on panicles and tender leaves; flower and fruit abortion.', management: 'Sulphur 80 WP (3 g/L) or Hexaconazole 5 EC (1 ml/L); spray at panicle emergence.' },
      { name: 'Anthracnose (Colletotrichum gloeosporioides)', symptoms: 'Black irregular lesions on panicles, young fruits; post-harvest fruit rot.', management: 'Mancozeb 75 WP (2.5 g/L) alternated with Carbendazim 50 WP (1 g/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Post Harvest (Jun–Jul)', products: 'FYM + Urea + SSP', dose: '20 kg FYM + 500 g Urea + 750 g SSP per tree' },
      { stage: 'Pre-flowering (Oct)', products: 'Potassium Sulphate + SSP', dose: '500 g SOP + 500 g SSP per tree' },
      { stage: 'Fruit Growth (Mar)', products: 'Urea + MOP', dose: '250 g Urea + 250 g MOP per tree' }
    ],
    harvestingTips: [
      'Harvest when skin shows yellow blush and stalk end gives slight pressure.',
      'Use clippers leaving 5 cm stalk to prevent sap burn.',
      'Pre-cool harvested fruits at 12–14°C for long-distance transport.'
    ]
  },
  {
    id: 'crop-garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    localNameMr: 'लसूण (Garlic)',
    category: 'Vegetable',
    idealSoil: 'Well-drained sandy loam; heavy clay soils cause bulb deformity',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '12°C – 24°C (Cool season crop)',
    waterRequirementMm: '350 – 500 mm',
    seedRatePerAcre: '200 – 250 kg (Cloves)',
    spacing: '15 cm row × 8–10 cm clove',
    durationDays: '120 – 150 Days',
    yieldPerAcre: '25 – 40 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Clove Establishment (0 - 20 DAS)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Clove treatment with fungicide; shallow irrigation; basal fertilizer.',
        recommendedNutrients: 'DAP 50 kg + MOP 25 kg/acre (Basal)',
        vulnerablePestsAndDiseases: 'Clove Rot (Fusarium), Basal Rot, Thrips'
      },
      {
        stageName: 'Vegetative Growth (20 - 75 DAS)',
        durationDays: 'Day 20 to 75',
        keyActivities: 'Top dressing; weed management; irrigation every 8–10 days.',
        recommendedNutrients: 'Urea 30 kg + Potassium Sulphate 20 kg/acre',
        vulnerablePestsAndDiseases: 'Thrips, Purple Blotch (Alternaria porri), Stemphylium Blight'
      },
      {
        stageName: 'Bulb Formation (75 - 130 DAS)',
        durationDays: 'Day 75 to 130',
        keyActivities: 'Irrigation critical; stop N application at bulb initiation; apply SOP.',
        recommendedNutrients: '0:52:34 (MKP) 3 kg + 0:0:50 (SOP) 3 kg/acre/week foliar',
        vulnerablePestsAndDiseases: 'Neck Rot (Botrytis), White Rot (Sclerotium), Leaf Blight'
      }
    ],
    majorPests: [
      { name: 'Thrips (Thrips tabaci)', symptoms: 'Silver streaks on leaves; severe infestation causes leaf tip drying.', management: 'Fipronil 5 SC (1 ml/L) or Spinosad 45 SC (0.3 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Purple Blotch (Alternaria porri)', symptoms: 'Water-soaked lesions turning purple with yellow border on leaves.', management: 'Mancozeb 75 WP (2.5 g/L) + Iprodione 50 WP (1.5 g/L).' },
      { name: 'Basal Rot (Fusarium oxysporum)', symptoms: 'Yellowing, rotting at base of bulb; pink mycelial mat under bulb scales.', management: 'Clove treatment with Carbendazim 2 g/kg; drench with Copper Oxychloride 3 g/L.' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP + MOP', dose: '50 kg + 25 kg/acre' },
      { stage: '30 DAS', products: 'Urea + SOP', dose: '30 kg Urea + 20 kg SOP/acre' },
      { stage: '60 DAS (Bulbing)', products: '0:52:34 + 0:0:50 Foliar', dose: '3 kg each/acre/week' }
    ],
    harvestingTips: [
      'Harvest when 50–75% of foliage falls over naturally.',
      'Cure garlic in shade for 3–4 weeks before storage.',
      'Never wash bulbs before storage; moisture causes Fusarium rot.'
    ]
  },
  {
    id: 'crop-brinjal',
    name: 'Brinjal / Eggplant',
    scientificName: 'Solanum melongena',
    localNameMr: 'वांगे (Brinjal)',
    category: 'Vegetable',
    idealSoil: 'Deep, well-drained loamy soil; tolerates wide range of soils',
    idealSoilPh: '5.5 – 6.8',
    tempRangeC: '22°C – 32°C (Sensitive to frost)',
    waterRequirementMm: '500 – 700 mm',
    seedRatePerAcre: '150 – 200 grams (Hybrid seedlings)',
    spacing: '2.5–3 ft row × 1.5–2 ft plant',
    durationDays: '120 – 160 Days',
    yieldPerAcre: '10 – 20 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Transplanting & Establishment (0 - 20 DAT)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Drench transplants with Trichoderma + Pseudomonas; silver mulch on raised beds.',
        recommendedNutrients: '12:61:0 + Humic Acid drip fertigation',
        vulnerablePestsAndDiseases: 'Damping off, Cutworms, Shoot & Fruit Borer (early attack)'
      },
      {
        stageName: 'Vegetative Phase (20 - 50 DAT)',
        durationDays: 'Day 20 to 50',
        keyActivities: 'Pheromone trap deployment for Leucinodes; regular irrigation.',
        recommendedNutrients: '19:19:19 + Magnesium Sulphate 1 g/L',
        vulnerablePestsAndDiseases: 'Shoot & Fruit Borer (Leucinodes orbonalis), Aphids, Jassids'
      },
      {
        stageName: 'Flowering & Fruiting (50 - 130 DAT)',
        durationDays: 'Day 50 to 130',
        keyActivities: 'Spray Spinosad at first borer damage; pick fruits regularly.',
        recommendedNutrients: '0:52:34 + Calcium Nitrate (Alternate weeks)',
        vulnerablePestsAndDiseases: 'Shoot & Fruit Borer, Phomopsis Blight, Bacterial Wilt'
      }
    ],
    majorPests: [
      { name: 'Brinjal Shoot & Fruit Borer (Leucinodes orbonalis)', symptoms: 'Wilting growing shoots; bore holes in fruits with excreta.', management: 'Pheromone traps (5/acre) + Spinosad 45 SC (0.3 ml/L) or Emamectin Benzoate 5 SG (0.4 g/L).' },
      { name: 'Whitefly (Bemisia tabaci)', symptoms: 'Yellowing and upward leaf curl; sooty mold; virus vector.', management: 'Imidacloprid 17.8 SL (0.5 ml/L) or Spiromesifen 22.9 SC (0.9 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Phomopsis Blight (Phomopsis vexans)', symptoms: 'Circular lesions on leaves and fruits; grey centre with dark border.', management: 'Mancozeb 75 WP (2.5 g/L) or Copper Oxychloride 50 WP (3 g/L).' },
      { name: 'Bacterial Wilt (Ralstonia solanacearum)', symptoms: 'Rapid wilting of plant; slime test positive; brown discolouration in stem.', management: 'Drench with Copper Oxychloride (3 g/L) + Streptocycline (0.1 g/L).' }
    ],
    fertigationSchedule: [
      { stage: '1st Month', products: '19:19:19 + MAP', dose: '3 kg 19:19:19 + 2 kg MAP/acre/week' },
      { stage: '2nd Month (Flowering)', products: '0:52:34 + CaNO3', dose: '3 kg MKP + 4 kg CaN/acre/week' },
      { stage: '3rd Month+', products: '0:0:50 + 13:0:45', dose: '4 kg SOP + 2 kg KNO3/acre/week' }
    ],
    harvestingTips: [
      'Harvest fruits when glossy and firm; delayed picking causes bitterness.',
      'Pick at regular 3–4 day intervals to sustain yield and size.',
      'Harvest with stalk attached using sharp knife or secateurs.'
    ]
  },
  {
    id: 'crop-cauliflower',
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    localNameMr: 'फुलकोबी (Cauliflower)',
    category: 'Vegetable',
    idealSoil: 'Deep, moist, well-drained fertile loamy soil with good organic matter',
    idealSoilPh: '6.0 – 7.0',
    tempRangeC: '14°C – 22°C (Best curd development in cool conditions)',
    waterRequirementMm: '400 – 600 mm',
    seedRatePerAcre: '100 – 150 grams',
    spacing: '60 cm row × 45 cm plant',
    durationDays: '80 – 120 Days (Variety dependent)',
    yieldPerAcre: '6 – 10 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Nursery & Transplanting (0 - 25 DAT)',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Raise nursery in protrays; transplant at 4–5 leaf stage; basal DAP application.',
        recommendedNutrients: 'DAP 50 kg + MOP 25 kg/acre basal',
        vulnerablePestsAndDiseases: 'Damping off, Cabbage Aphid, Diamond-back Moth (DBM)'
      },
      {
        stageName: 'Vegetative & Curd Initiation (25 - 60 DAT)',
        durationDays: 'Day 25 to 60',
        keyActivities: 'First top dressing; foliar boron for curd quality; tie outer leaves over curd for blanching.',
        recommendedNutrients: 'Urea 30 kg/acre + Boron 20% 1 g/L foliar',
        vulnerablePestsAndDiseases: 'DBM (Plutella xylostella), Cabbage Looper, Black Rot'
      }
    ],
    majorPests: [
      { name: 'Diamond-back Moth (Plutella xylostella)', symptoms: 'Windows on leaves; severe infestation causes skeletonization.', management: 'Emamectin Benzoate 5 SG (0.4 g/L) or Spinosad 45 SC (0.3 ml/L); rotate with NSKE 5%.' },
      { name: 'Cabbage Aphid (Brevicoryne brassicae)', symptoms: 'Grey waxy colonies on underside of leaves; curling.', management: 'Dimethoate 30 EC (1 ml/L) or Acetamiprid 20 SP (0.3 g/L).' }
    ],
    majorDiseases: [
      { name: 'Black Rot (Xanthomonas campestris)', symptoms: 'V-shaped yellow lesions at leaf margins; blackened veins.', management: 'Copper Oxychloride 50 WP (3 g/L) + Streptocycline (0.1 g/L).' },
      { name: 'Downy Mildew (Hyaloperonospora parasitica)', symptoms: 'Yellow angular spots on upper surface; white cottony growth below.', management: 'Metalaxyl + Mancozeb WP (2.5 g/L) or Dimethomorph 50 WP (1 g/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP + MOP', dose: '50 kg + 25 kg/acre' },
      { stage: '30 DAT', products: 'Urea', dose: '30 kg/acre top dressing' },
      { stage: 'Curd Initiation', products: 'Boron + Molybdenum foliar', dose: '1 g/L each' }
    ],
    harvestingTips: [
      'Harvest when curd is compact, white, and firm before yellowing.',
      'Cut with 3–4 outer guard leaves attached for market protection.',
      'Morning harvest preferred; avoid evening harvest in humid conditions.'
    ]
  },
  {
    id: 'crop-okra',
    name: 'Okra / Bhindi',
    scientificName: 'Abelmoschus esculentus',
    localNameMr: 'भेंडी (Okra / Bhindi)',
    category: 'Vegetable',
    idealSoil: 'Well-drained sandy loam to clay loam; responds well to organic manure',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '25°C – 35°C (Warm season crop)',
    waterRequirementMm: '350 – 500 mm',
    seedRatePerAcre: '2 – 3 kg (Hybrid)',
    spacing: '45–60 cm row × 20–25 cm plant',
    durationDays: '55 – 70 Days (first harvest); continuous up to 150 days',
    yieldPerAcre: '5 – 8 Tonnes / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Establishment (0 - 20 DAS)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Seed soaking in water 12 hr before sowing; basal fertilizer; weed management.',
        recommendedNutrients: 'DAP 30 kg + MOP 20 kg/acre basal',
        vulnerablePestsAndDiseases: 'Damping off, Whitefly (early YVMV vector)'
      },
      {
        stageName: 'Vegetative & Flowering (20 - 55 DAS)',
        durationDays: 'Day 20 to 55',
        keyActivities: 'Top dress urea; spray for whitefly and jassid control (YVMV management).',
        recommendedNutrients: 'Urea 25 kg/acre + 0:52:34 + Boron foliar',
        vulnerablePestsAndDiseases: 'Yellow Vein Mosaic Virus (YVMV via Whitefly), Jassid, Shoot & Fruit Borer'
      }
    ],
    majorPests: [
      { name: 'Whitefly (Bemisia tabaci) — YVMV Vector', symptoms: 'Yellow vein mosaic pattern on leaves; stunted plants; no fruit set.', management: 'Imidacloprid 17.8 SL (0.5 ml/L); use YVMV-tolerant hybrids; rogue infected plants.' },
      { name: 'Jassid (Amrasca biguttula)', symptoms: 'Leaf curl upward; yellow discolouration; plants become crinkled.', management: 'Acetamiprid 20 SP (0.3 g/L) or Thiamethoxam 25 WG (0.3 g/L).' }
    ],
    majorDiseases: [
      { name: 'Yellow Vein Mosaic (YVMV Virus)', symptoms: 'Network of yellow veins on green leaf; complete yellowing; no fruits.', management: 'Use resistant/tolerant varieties (Arka Anamika, Varsha Uphar); control whitefly vector.' },
      { name: 'Powdery Mildew (Erysiphe cichoracearum)', symptoms: 'White powdery coating on upper leaf surface in humid conditions.', management: 'Sulphur 80 WP (3 g/L) or Hexaconazole 5 EC (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP + MOP', dose: '30 kg + 20 kg/acre' },
      { stage: '25 DAS', products: 'Urea', dose: '25 kg/acre top dressing' },
      { stage: 'Fruiting Stage', products: '0:52:34 + CaNO3 drip', dose: '2 kg each/acre/week' }
    ],
    harvestingTips: [
      'Harvest pods at 4–6 cm length every 2–3 days; over-mature pods become fibrous.',
      'Use sharp knife; wear gloves as trichomes cause skin irritation.',
      'Harvest early morning for firmness and shelf life.'
    ]
  },
  {
    id: 'crop-mustard',
    name: 'Mustard / Rapeseed',
    scientificName: 'Brassica juncea',
    localNameMr: 'मोहरी (Mustard)',
    category: 'Pulse / Oilseed',
    idealSoil: 'Well-drained loamy to sandy loam soil; good drainage essential',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '10°C – 25°C (Cool dry season crop)',
    waterRequirementMm: '200 – 400 mm',
    seedRatePerAcre: '1.5 – 2 kg (Line sowing)',
    spacing: '30–45 cm row × 10–15 cm plant',
    durationDays: '110 – 130 Days',
    yieldPerAcre: '6 – 10 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Emergence & Early Growth (0 - 25 DAS)',
        durationDays: 'Day 0 to 25',
        keyActivities: 'Thin to one plant per station; basal fertilizer; weed control.',
        recommendedNutrients: 'DAP 40 kg + Sulphur 30 kg/acre basal',
        vulnerablePestsAndDiseases: 'Aphids (early), Downy Mildew, White Rust'
      },
      {
        stageName: 'Vegetative & Stem Elongation (25 - 55 DAS)',
        durationDays: 'Day 25 to 55',
        keyActivities: 'First irrigation at rosette stage; top dress urea; monitor for aphids.',
        recommendedNutrients: 'Urea 25 kg/acre; Boron 0.5 g/L foliar',
        vulnerablePestsAndDiseases: 'Mustard Aphid (Lipaphis erysimi), Alternaria Blight'
      },
      {
        stageName: 'Flowering & Pod Fill (55 - 110 DAS)',
        durationDays: 'Day 55 to 110',
        keyActivities: 'Critical irrigation at flowering and pod formation stages.',
        recommendedNutrients: 'Potassium Sulphate 15 kg/acre + Boron 1 g/L',
        vulnerablePestsAndDiseases: 'Mustard Aphid, Powdery Mildew, Pod Borer'
      }
    ],
    majorPests: [
      { name: 'Mustard Aphid (Lipaphis erysimi)', symptoms: 'Dense yellow colonies on growing tips; shoot curling; severe damage at flowering.', management: 'Dimethoate 30 EC (1 ml/L) or Oxydemeton Methyl 25 EC (1 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Alternaria Blight (Alternaria brassicae)', symptoms: 'Circular dark spots with concentric rings on leaves and pods; premature shedding.', management: 'Mancozeb 75 WP (2.5 g/L) or Iprodione 50 WP (1 g/L).' },
      { name: 'White Rust (Albugo candida)', symptoms: 'White blister-like pustules on underside of leaves; distorted shoots.', management: 'Metalaxyl + Mancozeb WP (2.5 g/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP + Elemental Sulphur', dose: '40 kg DAP + 30 kg Sulphur/acre' },
      { stage: '30 DAS', products: 'Urea', dose: '25 kg/acre top dressing' }
    ],
    harvestingTips: [
      'Harvest when 75% of pods turn golden yellow.',
      'Cut and bundle; thresh after 2–3 days of drying.',
      'Seed moisture for safe storage is below 8%.'
    ]
  },
  {
    id: 'crop-sunflower',
    name: 'Sunflower',
    scientificName: 'Helianthus annuus',
    localNameMr: 'सूर्यफूल (Sunflower)',
    category: 'Pulse / Oilseed',
    idealSoil: 'Deep, well-drained loamy soil; tap root system; avoid waterlogged areas',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '20°C – 30°C (Sensitive to frost at seedling and flowering)',
    waterRequirementMm: '500 – 700 mm',
    seedRatePerAcre: '1.5 – 2 kg (Hybrid)',
    spacing: '60–75 cm row × 20–30 cm plant',
    durationDays: '90 – 110 Days',
    yieldPerAcre: '6 – 12 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Seedling (0 - 20 DAS)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Seed priming with water; basal fertilizer; thin to one plant.',
        recommendedNutrients: '12:32:16 Complex 50 kg/acre basal',
        vulnerablePestsAndDiseases: 'Downy Mildew, Cutworms, Leaf Eating Caterpillar'
      },
      {
        stageName: 'Vegetative & Bud Formation (20 - 55 DAS)',
        durationDays: 'Day 20 to 55',
        keyActivities: 'Top dressing; earthing up; monitor for head borer.',
        recommendedNutrients: 'Urea 25 kg + Boron 1 g/L foliar',
        vulnerablePestsAndDiseases: 'Head Borer, Capitulum Borer, Alternaria Blight'
      },
      {
        stageName: 'Flowering & Seed Filling (55 - 90 DAS)',
        durationDays: 'Day 55 to 90',
        keyActivities: 'Release bees for pollination; brush heads to assist cross-pollination.',
        recommendedNutrients: '0:52:34 + 0:0:50 Foliar combination',
        vulnerablePestsAndDiseases: 'Capitulum Borer, Sclerotinia Stem Rot, Bird Damage'
      }
    ],
    majorPests: [
      { name: 'Capitulum Borer (Homoescana atomosalis)', symptoms: 'Larvae bore into developing heads; severe yield loss.', management: 'Quinalphos 25 EC (2 ml/L) or Chlorpyrifos 20 EC (2 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Alternaria Leaf Spot (Alternaria helianthi)', symptoms: 'Dark brown circular spots with yellow halo on leaves and bracts.', management: 'Mancozeb 75 WP (2.5 g/L) or Iprodione 50 WP (1.5 g/L).' },
      { name: 'Sclerotinia Stem Rot (Sclerotinia sclerotiorum)', symptoms: 'White cottony mycelium at stem base; plant wilts and dies.', management: 'Carbendazim 50 WP (1 g/L) stem drench; avoid excess moisture.' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: '12:32:16 Complex', dose: '50 kg/acre' },
      { stage: '30 DAS', products: 'Urea + SOP', dose: '25 kg + 15 kg/acre' },
      { stage: 'Flowering', products: 'Boron foliar', dose: '1 g/L (twice)' }
    ],
    harvestingTips: [
      'Harvest when 80% of seeds are fully developed and backs of heads turn brownish-yellow.',
      'Cut heads; dry in sun 3–4 days before threshing.',
      'Oil content: 35–45%; store at less than 8% moisture.'
    ]
  },
  {
    id: 'crop-orange-citrus',
    name: 'Orange / Citrus (Nagpur Mandarin)',
    scientificName: 'Citrus reticulata',
    localNameMr: 'नागपूर संत्रा (Nagpur Mandarin)',
    category: 'Fruit & Horticulture',
    idealSoil: 'Well-drained medium deep black cotton soil or sandy loam',
    idealSoilPh: '6.0 – 7.5',
    tempRangeC: '22°C – 35°C (Dry cool period required for flowering)',
    waterRequirementMm: '1200 – 1500 mm',
    seedRatePerAcre: '100 – 120 budded plants/acre (6 m × 6 m)',
    spacing: '6 m × 6 m (Standard); 5 m × 5 m (High Density)',
    durationDays: 'Perennial; commercial production from 3rd year',
    yieldPerAcre: '4 – 8 Tonnes / Acre (Bearing stage)',
    criticalGrowthStages: [
      {
        stageName: 'Mrig Bahar (Monsoon Flush — June-July)',
        durationDays: 'June to July (Stress Release)',
        keyActivities: 'Apply stress period (withhold water 60 days); heavy irrigation to induce Mrig Bahar flowering.',
        recommendedNutrients: 'NPK 300:150:150 g/tree after stress release',
        vulnerablePestsAndDiseases: 'Citrus Psylla (Diaphorina citri), Thrips, Leaf Miner'
      },
      {
        stageName: 'Flowering & Fruit Set (Aug - Oct)',
        durationDays: 'August to October',
        keyActivities: 'Spray Planofix (NAA) at petal fall to reduce fruit drop; calcium sprays.',
        recommendedNutrients: 'Boron 0.5 g/L + Calcium Nitrate 2 g/L foliar (monthly)',
        vulnerablePestsAndDiseases: 'Citrus Canker (Xanthomonas axonopodis), Psylla (HLB vector)'
      },
      {
        stageName: 'Fruit Growth & Colouring (Oct - Dec)',
        durationDays: 'October to December',
        keyActivities: 'Potassium application for colour and sugar; ethephon for degreening.',
        recommendedNutrients: '13:0:45 (Potassium Nitrate) 2 g/L foliar + Magnesium Sulphate',
        vulnerablePestsAndDiseases: 'Fruit Fly (Bactrocera dorsalis), Gummosis (Phytophthora), Sooty Mold'
      }
    ],
    majorPests: [
      { name: 'Citrus Psylla (Diaphorina citri) — HLB Vector', symptoms: 'Waxy secretions on new flushes; distorted young leaves; Huanglongbing (HLB greening disease) vector.', management: 'Imidacloprid 17.8 SL (0.5 ml/L) or Spirotetramat 15 OD (0.8 ml/L) at new flush stage.' },
      { name: 'Citrus Leaf Miner (Phyllocnistis citrella)', symptoms: 'Silvery serpentine mines on young leaves; leaf curling.', management: 'Spinosad 45 SC (0.3 ml/L) or Abamectin 1.8 EC (0.5 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Citrus Canker (Xanthomonas axonopodis)', symptoms: 'Raised, corky, water-soaked lesions on leaves, fruits, and branches.', management: 'Copper Oxychloride 50 WP (3 g/L) + Streptocycline (0.1 g/L); prune infected parts.' },
      { name: 'Gummosis (Phytophthora parasitica)', symptoms: 'Gum exuding from bark near root collar; bark darkening and rotting.', management: 'Metalaxyl + Mancozeb WP (2.5 g/L) soil drench + trunk painting with Bordeaux paste.' }
    ],
    fertigationSchedule: [
      { stage: 'Post Stress Release (Jun)', products: 'NPK + FYM', dose: '300 g N: 150 g P: 150 g K per tree + 20 kg FYM' },
      { stage: 'Fruit Development (Sep)', products: 'Urea + Muriate of Potash', dose: '150 g Urea + 150 g MOP per tree' },
      { stage: 'Pre-harvest (Nov)', products: 'Potassium Nitrate + MgSO4 Foliar', dose: '2 g/L each monthly' }
    ],
    harvestingTips: [
      'Harvest Nagpur mandarin November–January at full colour and sweetness.',
      'Use ring cutters; do not pull fruit to avoid stem end damage.',
      'Pre-cool at 5–8°C; wax coating extends shelf life significantly.'
    ]
  },
  {
    id: 'crop-lentil',
    name: 'Lentil (Masoor Dal)',
    scientificName: 'Lens culinaris',
    localNameMr: 'मसूर (Lentil)',
    category: 'Pulse / Oilseed',
    idealSoil: 'Light sandy loam to loamy soil; well-drained; tolerates low fertility',
    idealSoilPh: '6.0 – 8.0',
    tempRangeC: '15°C – 25°C (Cool season Rabi crop)',
    waterRequirementMm: '250 – 400 mm',
    seedRatePerAcre: '15 – 20 kg',
    spacing: '25–30 cm row × 5–10 cm plant',
    durationDays: '100 – 120 Days',
    yieldPerAcre: '5 – 8 Quintals / Acre',
    criticalGrowthStages: [
      {
        stageName: 'Germination & Seedling (0 - 20 DAS)',
        durationDays: 'Day 0 to 20',
        keyActivities: 'Seed treatment with Rhizobium + Trichoderma; basal fertilizer; pre-emergence weed control.',
        recommendedNutrients: 'DAP 25 kg/acre basal (low N as legume)',
        vulnerablePestsAndDiseases: 'Seed rot, Aphid, Leaf Eating Caterpillar'
      },
      {
        stageName: 'Vegetative & Flowering (20 - 70 DAS)',
        durationDays: 'Day 20 to 70',
        keyActivities: 'One irrigation at pre-flowering; spray for aphid and blight.',
        recommendedNutrients: 'Sulphur 80 WP 3 g/L foliar; Boron 0.5 g/L',
        vulnerablePestsAndDiseases: 'Aphid (Aphis craccivora), Stemphylium Blight, Rust'
      },
      {
        stageName: 'Pod Fill & Maturity (70 - 110 DAS)',
        durationDays: 'Day 70 to 110',
        keyActivities: 'Withhold irrigation; harvest when 90% pods turn brown.',
        recommendedNutrients: 'No fertilizer required at maturity stage',
        vulnerablePestsAndDiseases: 'Pod Borer (Helicoverpa), Rust (Uromyces viciae-fabae)'
      }
    ],
    majorPests: [
      { name: 'Pea Aphid (Aphis craccivora)', symptoms: 'Colonies on stems and growing tips; honeydew; curled leaves.', management: 'Dimethoate 30 EC (1 ml/L) or Imidacloprid 17.8 SL (0.5 ml/L).' }
    ],
    majorDiseases: [
      { name: 'Stemphylium Blight (Stemphylium botryosum)', symptoms: 'Oval tan necrotic lesions on leaves; premature defoliation in humid conditions.', management: 'Iprodione 50 WP (1.5 g/L) or Tebuconazole 250 EW (1 ml/L).' },
      { name: 'Rust (Uromyces viciae-fabae)', symptoms: 'Chocolate brown pustules on leaves; defoliation in severe cases.', management: 'Mancozeb 75 WP (2.5 g/L) or Propiconazole 25 EC (1 ml/L).' }
    ],
    fertigationSchedule: [
      { stage: 'Basal', products: 'DAP (no Urea needed — legume)', dose: '25 kg/acre' },
      { stage: 'Pre-flowering', products: 'Sulphur foliar + Boron', dose: 'S 3 g/L + B 0.5 g/L' }
    ],
    harvestingTips: [
      'Harvest when 90% pods turn brown; avoid over-ripening (shattering losses).',
      'Thresh after 3–4 days of drying in sun.',
      'Store at less than 10% moisture to prevent weevil damage.'
    ]
  }
];

