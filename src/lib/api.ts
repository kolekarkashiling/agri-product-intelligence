import { AgriProduct, MixAnalysisResult, WeatherConditionInput, ConditionEvaluationResult } from '../types/agri';
import { analyzeTankMix as localAnalyzeTankMix } from '../engine/mixEngine';
import { evaluateApplicationConditions as localEvaluateApplicationConditions } from '../engine/conditionEngine';

const API_BASE = '/api';

export interface BackendHealthResponse {
  status: string;
  backend: string;
  supabase_configured: boolean;
  supabase: {
    connected: boolean;
    message: string;
    url?: string;
  };
}

/**
 * Checks if the Python FastAPI backend is online.
 */
export async function checkBackendHealth(): Promise<{ online: boolean; data?: BackendHealthResponse }> {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      return { online: true, data };
    }
    return { online: false };
  } catch {
    return { online: false };
  }
}

/**
 * Calls Python FastAPI mix analyzer with fallback to local TypeScript engine.
 */
export async function analyzeTankMixWithPython(products: AgriProduct[]): Promise<{ result: MixAnalysisResult; source: 'python' | 'local' }> {
  try {
    const res = await fetch(`${API_BASE}/analyze-mix`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });

    if (res.ok) {
      const pyResult = await res.json();
      // Map snake_case to camelCase
      const formatted: MixAnalysisResult = {
        overallStatus: pyResult.overall_status,
        safetyScore: pyResult.safety_score,
        pairwiseInteractions: (pyResult.pairwise_interactions || []).map((p: any) => ({
          productA: p.product_a,
          productB: p.product_b,
          interaction: {
            productAId: p.interaction.product_a_id,
            productBId: p.interaction.product_b_id,
            status: p.interaction.status,
            primaryReason: p.interaction.primary_reason,
            detailedExplanation: p.interaction.detailed_explanation,
            chemicalMechanism: p.interaction.chemical_mechanism,
            safeAlternatives: p.interaction.safe_alternatives,
            jarTestRequired: p.interaction.jar_test_required,
            verifiedSource: p.interaction.verified_source
          }
        })),
        criticalWarnings: pyResult.critical_warnings || [],
        conditionalNotes: pyResult.conditional_notes || [],
        mixingSequence: pyResult.mixing_sequence || products,
        jarTestChecklist: pyResult.jar_test_checklist || [],
        saferAlternatives: pyResult.safer_alternatives || [],
        phShiftRisk: pyResult.ph_shift_risk || 'none',
        phLockWarning: pyResult.ph_lock_warning
      };
      return { result: formatted, source: 'python' };
    }
  } catch {
    // Fall back smoothly to local engine
  }

  return { result: localAnalyzeTankMix(products), source: 'local' };
}

/**
 * Calls Python FastAPI condition analyzer with fallback to local TypeScript engine.
 */
export async function evaluateConditionsWithPython(input: WeatherConditionInput): Promise<{ result: ConditionEvaluationResult; source: 'python' | 'local' }> {
  try {
    const res = await fetch(`${API_BASE}/analyze-conditions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    if (res.ok) {
      const pyResult = await res.json();
      const formatted: ConditionEvaluationResult = {
        overallSuitability: pyResult.overall_suitability,
        suitabilityScore: pyResult.suitability_score,
        deltaT: pyResult.delta_t,
        deltaTStatus: pyResult.delta_t_status,
        driftRisk: pyResult.drift_risk,
        rainfastRisk: pyResult.rainfast_risk,
        waterQualityIssues: pyResult.water_quality_issues || [],
        recommendations: pyResult.recommendations || [],
        contraindications: pyResult.contraindications || [],
        bestApplicationWindow: pyResult.best_application_window
      };
      return { result: formatted, source: 'python' };
    }
  } catch {
    // Fall back to local
  }

  return { result: localEvaluateApplicationConditions(input), source: 'local' };
}
