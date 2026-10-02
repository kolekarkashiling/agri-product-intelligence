-- =========================================================
-- Agri Product Intelligence - Database Migration 001
-- Core Normalized Schema
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (User role & metadata)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'farmer' CHECK (role IN ('farmer', 'agronomist', 'admin')),
    display_name TEXT,
    phone TEXT,
    state TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Farms (User owned farms)
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    location TEXT,
    size_in_acres NUMERIC,
    soil_type TEXT,
    water_source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_farms_user_id ON public.farms(user_id);

-- 3. Crops (Master crop records)
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    variety TEXT,
    category TEXT, -- 'Cereal', 'Pulse', 'Fruit', 'Vegetable', 'Cash Crop'
    ideal_soil_ph NUMERIC,
    water_requirement TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_crops_name ON public.crops(name);

-- 4. Products (Product Master)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE, -- e.g. 'fert-npk-191919'
    brand_name TEXT NOT NULL,
    generic_name TEXT,
    manufacturer TEXT,
    category TEXT NOT NULL CHECK (category IN ('fertilizer', 'micronutrient', 'fungicide', 'insecticide', 'herbicide', 'pgr', 'adjuvant', 'biostimulant')),
    formulation TEXT NOT NULL, -- 'WP', 'WDG', 'SC', 'EC', 'SL', 'WSG', 'Granules', etc.
    mixing_order_rank INTEGER NOT NULL DEFAULT 5, -- WALES: 1:W, 2:A, 3:L, 4:E, 5:S
    ideal_ph NUMERIC DEFAULT 6.5,
    standard_dose TEXT,
    standard_unit TEXT DEFAULT 'ml/L', -- 'ml/L', 'g/L', 'kg/acre', 'L/acre'
    default_dose_per_litre NUMERIC DEFAULT 2.0,
    purpose TEXT,
    cib_rc_registered BOOLEAN DEFAULT true,
    is_archived BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_brand_name ON public.products(brand_name);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_archived ON public.products(is_archived);

-- 5. Product Ingredients
CREATE TABLE IF NOT EXISTS public.product_ingredients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    ingredient_name TEXT NOT NULL,
    concentration NUMERIC,
    unit TEXT DEFAULT '%', -- '%', 'g/kg', 'g/L'
    chemical_group TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_product_ingredients_product_id ON public.product_ingredients(product_id);
CREATE INDEX IF NOT EXISTS idx_product_ingredients_name ON public.product_ingredients(ingredient_name);

-- 6. Chemical Families (Grouping ingredients)
CREATE TABLE IF NOT EXISTS public.chemical_families (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_chemical_families_name ON public.chemical_families(name);

-- 6a. Ingredient Compatibility Rules (The Core Engine)
CREATE TABLE IF NOT EXISTS public.ingredient_compatibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ingredient_a TEXT NOT NULL,
    ingredient_b TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('compatible', 'caution', 'conflict', 'incompatible', 'conditional')),
    reason TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_ing_compat_a ON public.ingredient_compatibility_rules(ingredient_a);
CREATE INDEX IF NOT EXISTS idx_ing_compat_b ON public.ingredient_compatibility_rules(ingredient_b);

-- 6b. Formulation Compatibility Rules (Physical Rules)
CREATE TABLE IF NOT EXISTS public.formulation_compatibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formulation_a TEXT NOT NULL,
    formulation_b TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('compatible', 'caution', 'conflict', 'incompatible', 'conditional')),
    mixing_instruction TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_form_compat_a ON public.formulation_compatibility_rules(formulation_a);
CREATE INDEX IF NOT EXISTS idx_form_compat_b ON public.formulation_compatibility_rules(formulation_b);

-- 6c. Product Compatibility Rules (The Override / Exceptions)
CREATE TABLE IF NOT EXISTS public.product_compatibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_a_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_b_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_a_code TEXT,
    product_b_code TEXT,
    status TEXT NOT NULL CHECK (status IN ('compatible', 'caution', 'conflict', 'incompatible', 'conditional')),
    reason TEXT NOT NULL,
    recommendation TEXT NOT NULL,
    chemical_mechanism TEXT,
    source TEXT NOT NULL,
    verified_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_prod_compat_a ON public.product_compatibility_rules(product_a_id);
CREATE INDEX IF NOT EXISTS idx_prod_compat_b ON public.product_compatibility_rules(product_b_id);
CREATE INDEX IF NOT EXISTS idx_prod_compat_codes ON public.product_compatibility_rules(product_a_code, product_b_code);

-- 7. Analyses (Analysis Header)
CREATE TABLE IF NOT EXISTS public.analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    farm_id UUID REFERENCES public.farms(id) ON DELETE SET NULL,
    crop_name TEXT NOT NULL,
    mix_name TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('compatible', 'caution', 'conflict')),
    water_volume_litres NUMERIC DEFAULT 200,
    spray_stage TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analyses_user_id ON public.analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON public.analyses(created_at DESC);

-- 8. Analysis Products (Selected Products in an analysis)
CREATE TABLE IF NOT EXISTS public.analysis_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    product_category TEXT,
    formulation TEXT,
    dose NUMERIC NOT NULL,
    unit TEXT NOT NULL DEFAULT 'ml/L',
    sequence INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analysis_products_analysis_id ON public.analysis_products(analysis_id);

-- 9. Analysis Results (Decision engine output)
CREATE TABLE IF NOT EXISTS public.analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL REFERENCES public.analyses(id) ON DELETE CASCADE,
    status TEXT NOT NULL CHECK (status IN ('compatible', 'caution', 'conflict')),
    issues JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { severity, reason, recommendation, source }
    wales_order JSONB NOT NULL DEFAULT '[]'::jsonb,
    jar_test_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_analysis_results_analysis_id ON public.analysis_results(analysis_id);

-- 10. Audit Logs (Admin changes log)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT,
    action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'ARCHIVE', 'DELETE', 'ROLE_CHANGE'
    entity TEXT NOT NULL, -- 'product', 'compatibility_rule', 'ingredient', 'user_role'
    entity_id TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity, entity_id);
