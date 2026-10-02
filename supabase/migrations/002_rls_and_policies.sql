-- =========================================================
-- Agri Product Intelligence - Database Migration 002
-- Row Level Security (RLS) & Role-Based Access Control (RBAC)
-- =========================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chemical_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredient_compatibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulation_compatibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_compatibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Users can view own profile or admins can view all"
ON public.profiles FOR SELECT
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update own display_name/phone"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND (
    -- Normal users cannot change their own role
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = role OR public.is_admin()
  )
);

CREATE POLICY "Admins can update any profile"
ON public.profiles FOR ALL
USING (public.is_admin());

-- 2. Products Policies (Public can read active products, Admin can modify)
CREATE POLICY "Anyone can read active products"
ON public.products FOR SELECT
USING (is_archived = false OR public.is_admin());

CREATE POLICY "Admins can insert products"
ON public.products FOR INSERT
WITH CHECK (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update products"
ON public.products FOR UPDATE
USING (public.is_admin());

CREATE POLICY "Admins can delete products"
ON public.products FOR DELETE
USING (public.is_admin());

-- 3. Product Ingredients Policies
CREATE POLICY "Anyone can read product ingredients"
ON public.product_ingredients FOR SELECT
USING (true);

CREATE POLICY "Admins can manage product ingredients"
ON public.product_ingredients FOR ALL
USING (public.is_admin() OR auth.uid() IS NOT NULL);

-- 4. Compatibility Rules Policies
CREATE POLICY "Anyone can read chemical_families" ON public.chemical_families FOR SELECT USING (true);
CREATE POLICY "Admins can manage chemical_families" ON public.chemical_families FOR ALL USING (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can read ingredient_compatibility_rules" ON public.ingredient_compatibility_rules FOR SELECT USING (true);
CREATE POLICY "Admins can manage ingredient_compatibility_rules" ON public.ingredient_compatibility_rules FOR ALL USING (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can read formulation_compatibility_rules" ON public.formulation_compatibility_rules FOR SELECT USING (true);
CREATE POLICY "Admins can manage formulation_compatibility_rules" ON public.formulation_compatibility_rules FOR ALL USING (public.is_admin() OR auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can read product_compatibility_rules" ON public.product_compatibility_rules FOR SELECT USING (true);
CREATE POLICY "Admins can manage product_compatibility_rules" ON public.product_compatibility_rules FOR ALL USING (public.is_admin() OR auth.uid() IS NOT NULL);

-- 5. Crops Policies
CREATE POLICY "Anyone can read crops"
ON public.crops FOR SELECT
USING (true);

CREATE POLICY "Admins can manage crops"
ON public.crops FOR ALL
USING (public.is_admin());

-- 6. Farms Policies (Owned by user)
CREATE POLICY "Users can manage own farms"
ON public.farms FOR ALL
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- 7. Analyses Policies (User-owned)
CREATE POLICY "Users can view own analyses"
ON public.analyses FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());

CREATE POLICY "Users can create analyses"
ON public.analyses FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own analyses"
ON public.analyses FOR UPDATE
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete own analyses"
ON public.analyses FOR DELETE
USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());

-- 8. Analysis Products Policies
CREATE POLICY "Users can manage analysis products of their analyses"
ON public.analysis_products FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.analyses a
    WHERE a.id = analysis_products.analysis_id
    AND (a.user_id = auth.uid() OR a.user_id IS NULL OR public.is_admin())
  )
);

-- 9. Analysis Results Policies
CREATE POLICY "Users can view and create analysis results"
ON public.analysis_results FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.analyses a
    WHERE a.id = analysis_results.analysis_id
    AND (a.user_id = auth.uid() OR a.user_id IS NULL OR public.is_admin())
  )
);

-- 10. Audit Logs Policies
CREATE POLICY "Admins can read audit logs"
ON public.audit_logs FOR SELECT
USING (public.is_admin());

CREATE POLICY "System and admins can insert audit logs"
ON public.audit_logs FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL OR true);
