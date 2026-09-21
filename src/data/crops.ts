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
  }
];
