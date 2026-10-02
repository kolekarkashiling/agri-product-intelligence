export type UserRole = 'farmer' | 'agronomist' | 'admin';

export type CompatibilityStatus = 'compatible' | 'caution' | 'conflict' | 'incompatible' | 'conditional';

export interface Profile {
  id: string;
  role: UserRole;
  display_name: string | null;
  phone: string | null;
  state: string | null;
  created_at: string;
  updated_at: string;
}

export interface Farm {
  id: string;
  user_id: string;
  name: string;
  location: string | null;
  size_in_acres: number | null;
  soil_type: string | null;
  water_source: string | null;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: string;
  name: string;
  variety?: string | null;
  category?: string | null;
  ideal_soil_ph?: number | null;
  water_requirement?: string | null;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface Product {
  id: string;
  code?: string;
  brand_name: string;
  generic_name?: string | null;
  manufacturer?: string | null;
  category: 'fertilizer' | 'micronutrient' | 'fungicide' | 'insecticide' | 'herbicide' | 'pgr' | 'adjuvant' | 'biostimulant';
  formulation: string;
  mixing_order_rank: number;
  ideal_ph?: number;
  standard_dose?: string;
  standard_unit?: string;
  default_dose_per_litre?: number;
  purpose?: string;
  cib_rc_registered?: boolean;
  is_archived?: boolean;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ProductIngredient {
  id: string;
  product_id: string;
  ingredient_name: string;
  concentration?: number;
  unit?: string;
  chemical_group?: string;
  created_at?: string;
}

export interface CompatibilityRule {
  id: string;
  product_a_id?: string | null;
  product_b_id?: string | null;
  product_a_code?: string | null;
  product_b_code?: string | null;
  status: 'compatible' | 'caution' | 'conflict' | 'incompatible' | 'conditional';
  reason: string;
  recommendation: string;
  chemical_mechanism?: string | null;
  source: string;
  verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AnalysisHeader {
  id: string;
  user_id?: string | null;
  farm_id?: string | null;
  crop_name: string;
  mix_name: string;
  status: 'compatible' | 'caution' | 'conflict';
  water_volume_litres?: number;
  spray_stage?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface AnalysisProductItem {
  id?: string;
  analysis_id?: string;
  product_id?: string | null;
  product_name: string;
  product_category?: string;
  formulation?: string;
  dose: number;
  unit: string;
  sequence: number;
}

export interface AnalysisIssue {
  severity: 'conflict' | 'caution' | 'info';
  product_a_name?: string;
  product_b_name?: string;
  reason: string;
  recommendation: string;
  source?: string;
}

export interface AnalysisResultRecord {
  id?: string;
  analysis_id: string;
  status: 'compatible' | 'caution' | 'conflict';
  issues: AnalysisIssue[];
  wales_order: Array<{
    step: number;
    wales_category: string;
    product_name: string;
    formulation: string;
    dose_instruction: string;
  }>;
  jar_test_steps: string[];
  summary?: string;
  created_at?: string;
}

export interface AuditLogRecord {
  id: string;
  user_id?: string | null;
  user_email?: string | null;
  action: 'CREATE' | 'UPDATE' | 'ARCHIVE' | 'DELETE' | 'ROLE_CHANGE';
  entity: 'product' | 'compatibility_rule' | 'ingredient' | 'user_role';
  entity_id: string;
  old_data?: Record<string, any> | null;
  new_data?: Record<string, any> | null;
  created_at: string;
}
