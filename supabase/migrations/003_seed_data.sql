-- =========================================================
-- Agri Product Intelligence - Database Migration 003
-- Seed Core Master Data (Crops, Products, Compatibility Rules)
-- =========================================================

-- Seed Crops
INSERT INTO public.crops (name, category, ideal_soil_ph, water_requirement, metadata) VALUES
('Cotton (Kapas)', 'Cash Crop', 6.5, 'Medium', '{"season": "Kharif", "critical_stages": ["Square formation", "Flowering", "Boll development"]}'::jsonb),
('Soybean', 'Pulse', 6.8, 'Medium', '{"season": "Kharif", "critical_stages": ["Vegetative", "Pod formation", "Grain filling"]}'::jsonb),
('Chilli (Mirchi)', 'Vegetable', 6.5, 'High', '{"season": "Year-round", "critical_stages": ["Transplanting", "Flowering", "Fruit picking"]}'::jsonb),
('Tomato', 'Vegetable', 6.5, 'High', '{"season": "Year-round", "critical_stages": ["Early growth", "Fruit set", "Ripening"]}'::jsonb),
('Paddy (Rice)', 'Cereal', 6.0, 'Very High', '{"season": "Kharif/Rabi", "critical_stages": ["Tillering", "Panicle initiation", "Milking"]}'::jsonb),
('Wheat', 'Cereal', 7.0, 'Medium', '{"season": "Rabi", "critical_stages": ["Crown root initiation", "Tillering", "Heading"]}'::jsonb),
('Pomegranate (Anar)', 'Fruit', 6.8, 'Low-Medium', '{"season": "Ambe/Mrug/Hasta Bahar", "critical_stages": ["Pruning", "Defoliation", "Fruit development"]}'::jsonb),
('Sugarcane', 'Cash Crop', 7.2, 'High', '{"season": "Annual", "critical_stages": ["Germination", "Tillering", "Grand growth"]}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Seed Sample Products
INSERT INTO public.products (id, code, brand_name, generic_name, manufacturer, category, formulation, mixing_order_rank, ideal_ph, standard_dose, standard_unit, default_dose_per_litre, purpose, cib_rc_registered) VALUES
('a0000001-0000-0000-0000-000000000001', 'fert-npk-191919', '19:19:19 Starter NPK', 'Balanced NPK Water Soluble', 'IFFCO / RCF', 'fertilizer', 'WSG', 1, 6.2, '5 g/L', 'g/L', 5.0, 'Balanced vegetative and root development', true),
('a0000001-0000-0000-0000-000000000002', 'fert-npk-005234', '00:52:34 Mono Potassium Phosphate (MKP)', 'MKP High Phosphorus', 'Coromandel / Haifa', 'fertilizer', 'WSG', 1, 4.5, '4-5 g/L', 'g/L', 4.5, 'Flower initiation and root strengthening', true),
('a0000001-0000-0000-0000-000000000003', 'fert-calcium-nitrate', 'Calcium Nitrate + Boron', 'Ca(NO3)2 + B Chelate', 'Yara / Mahadhan', 'fertilizer', 'WSG', 1, 6.0, '3-4 g/L', 'g/L', 3.5, 'Cell wall strength, fruit firmness & prevents blossom end rot', true),
('a0000001-0000-0000-0000-000000000004', 'fert-potassium-schoenite', 'Potassium Schoenite', 'Potassium Magnesium Sulphate', 'RCF / GSFC', 'fertilizer', 'WSG', 1, 6.8, '4 g/L', 'g/L', 4.0, 'Chlorophyll synthesis and potassium nutrition', true),
('a0000001-0000-0000-0000-000000000005', 'micro-zinc-edta', 'Chelated Zinc EDTA 12%', 'Zinc EDTA', 'Aries Agro', 'micronutrient', 'WSG', 1, 6.5, '1 g/L', 'g/L', 1.0, 'Auxin synthesis and interveinal chlorosis prevention', true),
('a0000001-0000-0000-0000-000000000006', 'fung-mancozeb-75wp', 'Mancozeb 75% WP (Dithane M-45)', 'Mancozeb', 'Indofil / UPL', 'fungicide', 'WP', 1, 6.5, '2.5 g/L', 'g/L', 2.5, 'Broad spectrum contact protective fungicide', true),
('a0000001-0000-0000-0000-000000000007', 'fung-copper-oxychloride', 'Copper Oxychloride 50% WP (Blitox / Blue Copper)', 'Copper Oxychloride', 'Tata Rallis', 'fungicide', 'WP', 1, 7.5, '2.5-3 g/L', 'g/L', 2.5, 'Bacterial leaf spot and fungal blight protection', true),
('a0000001-0000-0000-0000-000000000008', 'fung-azoxystrobin-tebuconazole', 'Custodia / Azoxystrobin 11% + Tebuconazole 18.3% SC', 'Azoxystrobin + Tebuconazole', 'Adama India', 'fungicide', 'SC', 3, 6.5, '1-1.5 ml/L', 'ml/L', 1.25, 'Systemic broad spectrum fruit rot & powdery mildew cure', true),
('a0000001-0000-0000-0000-000000000009', 'ins-coragen', 'Coragen (Chlorantraniliprole 18.5% SC)', 'Chlorantraniliprole', 'FMC India', 'insecticide', 'SC', 3, 6.5, '0.4 ml/L', 'ml/L', 0.4, 'Long-lasting control of bollworms, stem borer & DBM', true),
('a0000001-0000-0000-0000-000000000010', 'ins-confidor', 'Confidor (Imidacloprid 17.8% SL)', 'Imidacloprid', 'Bayer CropScience', 'insecticide', 'SL', 5, 7.0, '0.3-0.5 ml/L', 'ml/L', 0.4, 'Systemic sucking pest protection (Aphids, Jassids, Thrips)', true),
('a0000001-0000-0000-0000-000000000011', 'ins-ampligo', 'Ampligo 150 ZC', 'Chlorantraniliprole 9.3% + Lambda-cyhalothrin 4.6% ZC', 'Syngenta India', 'insecticide', 'SC', 3, 6.2, '0.5 ml/L', 'ml/L', 0.5, 'Dual action lepidopteran & sucking pest knockdown', true),
('a0000001-0000-0000-0000-000000000012', 'adj-silicone-spreader', 'Silwet Gold / Agrimax Silicone Super Spreader', 'Organosilicone Adjuvant', 'Momentive / AgriBio', 'adjuvant', 'SL', 5, 6.5, '0.3-0.5 ml/L', 'ml/L', 0.35, 'Reduces surface tension, provides rainfastness & stomatal infiltration', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Verified Compatibility Rules
INSERT INTO public.product_compatibility_rules (product_a_id, product_b_id, product_a_code, product_b_code, status, reason, recommendation, chemical_mechanism, source) VALUES
('a0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000002', 'fert-calcium-nitrate', 'fert-npk-005234', 'conflict', 'Severe Insoluble Calcium Phosphate Precipitation', 'Never mix Calcium Nitrate with 00:52:34 MKP or any Phosphate fertilizer. Apply separately with at least 5-7 days interval.', 'Ca²⁺ ions combine instantaneously with H2PO4⁻ / HPO4²⁻ to precipitate insoluble Ca3(PO4)2 which clogs spray nozzles and removes bio-availability.', 'Fertilizer (Control) Order 1985 & ICAR Agronomy Standard'),
('a0000001-0000-0000-0000-000000000003', 'a0000001-0000-0000-0000-000000000004', 'fert-calcium-nitrate', 'fert-potassium-schoenite', 'conflict', 'Gypsum (Calcium Sulphate) Sludge Precipitation', 'Do not combine Calcium Nitrate with Sulphate salts. Apply in distinct irrigation or spray tanks.', 'Ca²⁺ + SO4²⁻ ➔ CaSO4 (Gypsum), forming heavy white precipitate.', 'PAU Soil Science Advisory 2022'),
('a0000001-0000-0000-0000-000000000007', 'a0000001-0000-0000-0000-000000000009', 'fung-copper-oxychloride', 'ins-coragen', 'caution', 'Alkaline Hydrolysis Risk & Foliar Phytotoxicity', 'Perform a jar test before tank mixing. Maintain spray solution pH below 7.0 and do not add acidifying penetrants.', 'High copper hydroxide concentration can degrade ryanodine receptor binding active molecules.', 'CIB-RC Approved Label Advisory'),
('a0000001-0000-0000-0000-000000000009', 'a0000001-0000-0000-0000-000000000008', 'ins-coragen', 'fung-azoxystrobin-tebuconazole', 'compatible', 'Officially Tested Synergistic Tank Mix', 'Add Azoxystrobin+Tebuconazole SC first, dilute with water, then add Coragen SC. Maintain continuous agitation.', 'Both active compounds are stable at neutral pH and have non-interfering physical suspensions.', 'Adama & FMC Co-Trial Registration 2021'),
('a0000001-0000-0000-0000-000000000001', 'a0000001-0000-0000-0000-000000000005', 'fert-npk-191919', 'micro-zinc-edta', 'compatible', 'Compatible Chelation Mix', 'Dissolve 19:19:19 completely in tank water before adding Zinc EDTA. Fully stable in spray solutions.', 'EDTA chelate ring protects Zn²⁺ ion from reacting with phosphate ions in 19:19:19.', 'TNAU Micronutrient Guidelines 2023'),
('a0000001-0000-0000-0000-000000000012', 'a0000001-0000-0000-0000-000000000009', 'adj-silicone-spreader', 'ins-coragen', 'compatible', 'High Efficacy Super Spreading', 'Always add the silicone spreader last in the WALES sequence (as Solution/Surfactant).', 'Silicone adjuvant reduces contact angle, improving spray coverage on waxy cotton and chilli leaves.', 'International Journal of Agronomy Studies');
