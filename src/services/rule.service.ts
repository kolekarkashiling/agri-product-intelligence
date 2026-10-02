import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CompatibilityRule } from '../types/database.types';
import { KNOWN_MIX_RULES } from '../data/mixRules';
import { auditService } from './audit.service';

export const ruleService = {
  async getAllRules(): Promise<CompatibilityRule[]> {
    // 1. Get custom locally saved rules
    const localRules = this.getLocalRules();

    if (!isSupabaseConfigured) {
      const seeded = this.getSeededMixRules();
      const map = new Map<string, CompatibilityRule>();
      [...seeded, ...localRules].forEach((r) => map.set(r.id, r));
      return Array.from(map.values());
    }

    try {
      const { data, error } = await supabase
        .from('product_compatibility_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        const seeded = this.getSeededMixRules();
        const map = new Map<string, CompatibilityRule>();
        [...seeded, ...localRules].forEach((r) => map.set(r.id, r));
        return Array.from(map.values());
      }

      return data;
    } catch (err) {
      console.warn('Rule service falling back to local dataset:', err);
      const seeded = this.getSeededMixRules();
      const map = new Map<string, CompatibilityRule>();
      [...seeded, ...localRules].forEach((r) => map.set(r.id, r));
      return Array.from(map.values());
    }
  },

  async findRuleForPair(prodAId: string, prodBId: string): Promise<CompatibilityRule | null> {
    const allRules = await this.getAllRules();
    return (
      allRules.find(
        (r) =>
          (r.product_a_code === prodAId && r.product_b_code === prodBId) ||
          (r.product_a_code === prodBId && r.product_b_code === prodAId) ||
          (r.product_a_id === prodAId && r.product_b_id === prodBId) ||
          (r.product_a_id === prodBId && r.product_b_id === prodAId)
      ) || null
    );
  },

  async saveRule(rule: Partial<CompatibilityRule>, userEmail?: string): Promise<CompatibilityRule> {
    const id = rule.id || 'rule-' + Date.now();
    const newRule: CompatibilityRule = {
      id,
      product_a_id: rule.product_a_id || null,
      product_b_id: rule.product_b_id || null,
      product_a_code: rule.product_a_code || '',
      product_b_code: rule.product_b_code || '',
      status: rule.status || 'caution',
      reason: rule.reason || 'Agronomic interaction detected.',
      recommendation: rule.recommendation || 'Perform a physical jar test before field tank mixing.',
      chemical_mechanism: rule.chemical_mechanism || null,
      source: rule.source || 'Agronomy Advisory Reference',
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save locally
    const current = this.getLocalRules();
    const filtered = current.filter((r) => r.id !== id);
    localStorage.setItem('agri_custom_rules', JSON.stringify([newRule, ...filtered]));

    // Save to Supabase
    if (isSupabaseConfigured) {
      try {
        await supabase.from('product_compatibility_rules').upsert([newRule]);
      } catch (e) {
        console.warn('Could not upsert rule in Supabase:', e);
      }
    }

    // Audit log
    await auditService.logAction({
      action: rule.id ? 'UPDATE' : 'CREATE',
      entity: 'compatibility_rule',
      entity_id: id,
      user_email: userEmail || 'admin@agri-intelligence.app',
      new_data: newRule
    });

    return newRule;
  },

  async deleteRule(id: string, userEmail?: string): Promise<void> {
    const current = this.getLocalRules().filter((r) => r.id !== id);
    localStorage.setItem('agri_custom_rules', JSON.stringify(current));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('product_compatibility_rules').delete().eq('id', id);
      } catch (e) {
        console.warn('Could not delete rule from Supabase:', e);
      }
    }

    await auditService.logAction({
      action: 'DELETE',
      entity: 'compatibility_rule',
      entity_id: id,
      user_email: userEmail || 'admin@agri-intelligence.app'
    });
  },

  getLocalRules(): CompatibilityRule[] {
    try {
      const stored = localStorage.getItem('agri_custom_rules');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  getSeededMixRules(): CompatibilityRule[] {
    return KNOWN_MIX_RULES.map((kr, idx) => ({
      id: `seed-rule-${idx + 1}`,
      product_a_code: kr.productAId,
      product_b_code: kr.productBId,
      status: (kr.status === 'incompatible' ? 'conflict' : kr.status === 'conditional' ? 'caution' : 'compatible') as any,
      reason: kr.primaryReason,
      recommendation: kr.detailedExplanation || kr.safeAlternatives?.[0] || 'Perform jar test before applying.',
      chemical_mechanism: kr.chemicalMechanism || null,
      source: kr.verifiedSource || 'Fertilizer Control Order / CIB-RC Registration',
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }
};
