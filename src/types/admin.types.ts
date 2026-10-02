import { Product, CompatibilityRule, AuditLogRecord, Profile } from './database.types';

export interface AdminStats {
  totalProducts: number;
  totalRules: number;
  totalAnalyses: number;
  totalUsers: number;
}

export interface ProductFormData {
  brand_name: string;
  generic_name: string;
  manufacturer: string;
  category: Product['category'];
  formulation: string;
  mixing_order_rank: number;
  ideal_ph: number;
  standard_dose: string;
  standard_unit: string;
  purpose: string;
  cib_rc_registered: boolean;
  active_ingredients?: string;
}

export interface CompatibilityRuleFormData {
  product_a_id?: string;
  product_b_id?: string;
  product_a_code?: string;
  product_b_code?: string;
  product_a_name: string;
  product_b_name: string;
  status: 'compatible' | 'caution' | 'conflict';
  reason: string;
  recommendation: string;
  chemical_mechanism?: string;
  source: string;
}
