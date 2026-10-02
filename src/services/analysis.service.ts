import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AnalysisHeader, AnalysisProductItem, AnalysisResultRecord } from '../types/database.types';
import { TankMixFormState, TankMixDecisionResult } from '../types/tankMix.types';
import { AGRI_PRODUCTS } from '../data/products';

export interface SavedAnalysisComplete {
  header: AnalysisHeader;
  products: AnalysisProductItem[];
  result: AnalysisResultRecord | null;
}

export interface AnalysisQueryParams {
  search?: string;
  status?: string;
  crop?: string;
  page?: number;
  pageSize?: number;
}

export const analysisService = {
  async saveCompleteAnalysis(state: TankMixFormState, userEmail?: string, userId?: string): Promise<string> {
    const analysisId = state.savedAnalysisId || 'analysis-' + Date.now();
    const result = state.analysisResult;
    if (!result) throw new Error('Cannot save analysis without calculated result.');

    const header: AnalysisHeader = {
      id: analysisId,
      user_id: userId || null,
      mix_name: state.mixName || `${state.selectedCrop} Spray Mix (${new Date().toLocaleDateString()})`,
      crop_name: state.selectedCrop,
      status: result.status,
      water_volume_litres: state.waterVolumeL || 200,
      spray_stage: state.sprayStage || 'Foliar Application',
      notes: result.summary,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const products: AnalysisProductItem[] = state.selectedProducts.map((p, idx) => ({
      id: `ap-${analysisId}-${idx + 1}`,
      analysis_id: analysisId,
      product_id: p.product.id,
      product_name: p.product.name,
      product_category: p.product.category,
      formulation: p.product.formulation,
      dose: p.dose,
      unit: p.unit,
      sequence: idx + 1
    }));

    const resultRecord: AnalysisResultRecord = {
      id: `res-${analysisId}`,
      analysis_id: analysisId,
      status: result.status,
      issues: result.issues,
      wales_order: result.mixingSequence.map((m) => ({
        step: m.step,
        wales_category: m.walesLabel,
        product_name: m.product.name,
        formulation: m.product.formulation,
        dose_instruction: `${m.doseString} (${m.instructions})`
      })),
      jar_test_steps: result.jarTestChecklist,
      summary: result.summary,
      created_at: new Date().toISOString()
    };

    const completeItem: SavedAnalysisComplete = {
      header,
      products,
      result: resultRecord
    };

    // Save locally
    const currentList = this.getLocalAnalyses();
    const updatedList = [completeItem, ...currentList.filter((a) => a.header.id !== analysisId)];
    localStorage.setItem('agri_saved_analyses_v2', JSON.stringify(updatedList));

    // Save to Supabase
    if (isSupabaseConfigured) {
      try {
        await supabase.from('analyses').upsert([header]);
        await supabase.from('analysis_products').delete().eq('analysis_id', analysisId);
        await supabase.from('analysis_products').insert(products);
        await supabase.from('analysis_results').delete().eq('analysis_id', analysisId);
        await supabase.from('analysis_results').insert([resultRecord]);
      } catch (err) {
        console.warn('Could not save analysis into Supabase:', err);
      }
    }

    return analysisId;
  },

  async getAnalyses(params?: AnalysisQueryParams): Promise<{ items: SavedAnalysisComplete[]; total: number }> {
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;

    let items: SavedAnalysisComplete[] = [];

    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('analyses')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false });

        if (params?.status && params.status !== 'all') {
          query = query.eq('status', params.status);
        }
        if (params?.crop && params.crop !== 'all') {
          query = query.ilike('crop_name', `%${params.crop}%`);
        }
        if (params?.search) {
          query = query.or(`mix_name.ilike.%${params.search}%,crop_name.ilike.%${params.search}%`);
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data: headers, count, error } = await query;

        if (!error && headers && headers.length > 0) {
          const analysisIds = headers.map((h) => h.id);
          const { data: products } = await supabase
            .from('analysis_products')
            .select('*')
            .in('analysis_id', analysisIds);

          const { data: results } = await supabase
            .from('analysis_results')
            .select('*')
            .in('analysis_id', analysisIds);

          items = headers.map((header) => ({
            header,
            products: (products || []).filter((p) => p.analysis_id === header.id),
            result: (results || []).find((r) => r.analysis_id === header.id) || null
          }));

          return { items, total: count || items.length };
        }
      } catch (err) {
        console.warn('Supabase getAnalyses failed, using local:', err);
      }
    }

    // Local fallback
    const all = this.getLocalAnalyses();
    let filtered = all;

    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter((a) => a.header.status === params.status);
    }
    if (params?.crop && params.crop !== 'all') {
      filtered = filtered.filter((a) => a.header.crop_name.toLowerCase().includes(params.crop!.toLowerCase()));
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.header.mix_name.toLowerCase().includes(q) ||
          a.header.crop_name.toLowerCase().includes(q) ||
          a.products.some((p) => p.product_name.toLowerCase().includes(q))
      );
    }

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return { items: paginated, total: filtered.length };
  },

  async getAnalysisById(id: string): Promise<SavedAnalysisComplete | null> {
    const list = this.getLocalAnalyses();
    const found = list.find((a) => a.header.id === id);
    if (found) return found;

    if (isSupabaseConfigured) {
      try {
        const { data: header } = await supabase.from('analyses').select('*').eq('id', id).single();
        if (!header) return null;

        const { data: products } = await supabase.from('analysis_products').select('*').eq('analysis_id', id);
        const { data: result } = await supabase.from('analysis_results').select('*').eq('analysis_id', id).single();

        return {
          header,
          products: products || [],
          result: result || null
        };
      } catch {
        return null;
      }
    }

    return null;
  },

  async deleteAnalysis(id: string): Promise<void> {
    const list = this.getLocalAnalyses().filter((a) => a.header.id !== id);
    localStorage.setItem('agri_saved_analyses_v2', JSON.stringify(list));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('analyses').delete().eq('id', id);
      } catch (err) {
        console.warn('Could not delete analysis from Supabase:', err);
      }
    }
  },

  getLocalAnalyses(): SavedAnalysisComplete[] {
    try {
      const stored = localStorage.getItem('agri_saved_analyses_v2');
      if (stored) return JSON.parse(stored);
      // If legacy analyses exist, convert them
      const legacy = localStorage.getItem('agri_saved_tank_mixes');
      if (legacy) {
        const parsedLegacy = JSON.parse(legacy);
        return parsedLegacy.map((item: any, idx: number) => ({
          header: {
            id: item.id || `legacy-${idx}`,
            mix_name: item.mix_name || 'Saved Tank Mix',
            crop_name: 'Cotton (Kapas)',
            status: item.overall_status === 'incompatible' ? 'conflict' : item.overall_status === 'conditional' ? 'caution' : 'compatible',
            water_volume_litres: 200,
            created_at: item.created_at || new Date().toISOString()
          },
          products: (item.products || []).map((p: any, pIdx: number) => ({
            id: `lp-${pIdx}`,
            product_name: p.name || p.brand_name || 'Product',
            dose: p.standardDose ? parseFloat(p.standardDose) || 2 : 2,
            unit: 'ml/L',
            sequence: pIdx + 1
          })),
          result: {
            analysis_id: item.id || `legacy-${idx}`,
            status: item.overall_status === 'incompatible' ? 'conflict' : item.overall_status === 'conditional' ? 'caution' : 'compatible',
            issues: (item.critical_warnings || []).map((w: string) => ({
              severity: 'conflict',
              reason: w,
              recommendation: 'Apply separately.',
              source: 'Agronomy Archive'
            })),
            wales_order: [],
            jar_test_steps: [],
            summary: item.notes || 'Reopened from legacy saved tank mixes.'
          }
        }));
      }
      return [];
    } catch {
      return [];
    }
  }
};
