-- =========================================================
-- Agri Product Intelligence - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- =========================================================

-- 1. Saved Tank Mixes Table
CREATE TABLE IF NOT EXISTS public.saved_tank_mixes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mix_name TEXT NOT NULL,
    overall_status TEXT NOT NULL, -- 'compatible', 'conditional', 'incompatible', etc.
    safety_score INTEGER DEFAULT 100,
    products JSONB NOT NULL DEFAULT '[]'::jsonb,
    critical_warnings JSONB DEFAULT '[]'::jsonb,
    conditional_notes JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for quick sorting by date
CREATE INDEX IF NOT EXISTS idx_saved_tank_mixes_created_at 
ON public.saved_tank_mixes(created_at DESC);

-- Enable RLS
ALTER TABLE public.saved_tank_mixes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read and insert for demonstration/demo mode
DROP POLICY IF EXISTS "Allow public read of saved tank mixes" ON public.saved_tank_mixes;
CREATE POLICY "Allow public read of saved tank mixes" 
ON public.saved_tank_mixes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of saved tank mixes" ON public.saved_tank_mixes;
CREATE POLICY "Allow public insert of saved tank mixes" 
ON public.saved_tank_mixes FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete of saved tank mixes" ON public.saved_tank_mixes;
CREATE POLICY "Allow public delete of saved tank mixes" 
ON public.saved_tank_mixes FOR DELETE USING (true);


-- 2. Saved Crop Schedules Table
CREATE TABLE IF NOT EXISTS public.saved_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_name TEXT NOT NULL,
    rows JSONB NOT NULL DEFAULT '[]'::jsonb,
    total_cost NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for quick sorting by date
CREATE INDEX IF NOT EXISTS idx_saved_schedules_created_at 
ON public.saved_schedules(created_at DESC);

-- Enable RLS
ALTER TABLE public.saved_schedules ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read, insert, delete
DROP POLICY IF EXISTS "Allow public read of saved schedules" ON public.saved_schedules;
CREATE POLICY "Allow public read of saved schedules" 
ON public.saved_schedules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of saved schedules" ON public.saved_schedules;
CREATE POLICY "Allow public insert of saved schedules" 
ON public.saved_schedules FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete of saved schedules" ON public.saved_schedules;
CREATE POLICY "Allow public delete of saved schedules" 
ON public.saved_schedules FOR DELETE USING (true);


-- 3. Custom Products Table (For farmer-added custom formulations)
CREATE TABLE IF NOT EXISTS public.custom_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand_name TEXT,
    company_name TEXT,
    category TEXT NOT NULL,
    active_ingredients TEXT,
    formulation TEXT,
    purpose TEXT,
    ph_range TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.custom_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read of custom products" ON public.custom_products;
CREATE POLICY "Allow public read of custom products" 
ON public.custom_products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert of custom products" ON public.custom_products;
CREATE POLICY "Allow public insert of custom products" 
ON public.custom_products FOR INSERT WITH CHECK (true);
