import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, ProductIngredient } from '../types/database.types';
import { AgriProduct } from '../types/agri';
import { AGRI_PRODUCTS } from '../data/products';
import { auditService } from './audit.service';

// Transform local AgriProduct to database Product format
export function mapAgriProductToDb(p: AgriProduct): Product {
  return {
    id: p.id,
    code: p.id,
    brand_name: p.name,
    generic_name: p.commonName,
    manufacturer: p.companyName || 'Registered Agronomy Brand',
    category: p.category,
    formulation: p.formulation,
    mixing_order_rank: p.mixingOrderRank,
    ideal_ph: p.idealPh,
    standard_dose: p.standardDose || p.recommendedDosage.foliar,
    standard_unit: p.standardUnit || 'ml/L',
    default_dose_per_litre: p.defaultDosePerLitre || 2.0,
    purpose: p.purpose,
    cib_rc_registered: p.isCibRcRegistered ?? true,
    is_archived: false,
    metadata: {
      activeIngredients: p.activeIngredients,
      targetCrops: p.targetCrops,
      targetPestsOrDiseases: p.targetPestsOrDiseases,
      phiDays: p.phiDays,
      reentryIntervalHours: p.reentryIntervalHours,
      npkOrNutrients: p.npkOrNutrients,
      safetyPrecaution: p.safetyPrecaution
    }
  };
}

// Transform database Product back to AgriProduct format
export function mapDbProductToAgri(p: Product): AgriProduct {
  const meta = p.metadata || {};
  const doseStr = p.standard_dose || `${p.default_dose_per_litre || 2} ${p.standard_unit || 'ml/L'}`;

  return {
    id: p.code || p.id,
    name: p.brand_name,
    brandName: p.brand_name,
    companyName: p.manufacturer || 'Registered Agronomy Brand',
    chemicalName: p.generic_name || p.brand_name,
    commonName: p.generic_name || p.brand_name,
    category: p.category,
    activeIngredients: meta.activeIngredients || p.generic_name || '',
    npkOrNutrients: meta.npkOrNutrients,
    formulation: p.formulation as any,
    formulationFullName: p.formulation,
    mixingOrderRank: p.mixing_order_rank,
    idealPh: p.ideal_ph || 6.5,
    phRange: `${((p.ideal_ph || 6.5) - 0.5).toFixed(1)} - ${((p.ideal_ph || 6.5) + 0.5).toFixed(1)}`,
    standardDose: doseStr,
    standardUnit: p.standard_unit || 'ml/L',
    defaultDosePerLitre: p.default_dose_per_litre || 2,
    purpose: p.purpose || '',
    modeOfAction: 'Foliar / Soil Crop Protection and Nutrition',
    targetCrops: meta.targetCrops || ['All Field Crops'],
    growthStages: ['Vegetative', 'Flowering', 'Fruit Growth'],
    recommendedDosage: {
      foliar: doseStr
    },
    advantages: ['High field efficacy', 'Quality assured formulation'],
    limitations: ['Follow label dosage instructions'],
    precautions: ['Use PPE during handling'],
    isVerifiedLabel: true,
    rainfastHours: 2,
    tempMinC: 15,
    tempMaxC: 35,
    optimalHumidityMin: 40,
    optimalHumidityMax: 80,
    waterHardnessSensitivity: 'medium',
    targetPestsOrDiseases: meta.targetPestsOrDiseases,
    phiDays: meta.phiDays,
    reentryIntervalHours: meta.reentryIntervalHours,
    isCibRcRegistered: p.cib_rc_registered ?? true,
    safetyPrecaution: meta.safetyPrecaution || 'Wear protective PPE and avoid inhalation.'
  };
}

export interface ProductQueryParams {
  category?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
  includeArchived?: boolean;
}

export const productService = {
  async getAllProducts(params?: ProductQueryParams): Promise<AgriProduct[]> {
    // 1. Check local storage for custom farmer/admin added products
    const customLocal = this.getLocalCustomProducts();

    if (!isSupabaseConfigured) {
      return this.filterLocalProducts([...customLocal, ...AGRI_PRODUCTS], params);
    }

    try {
      let query = supabase
        .from('products')
        .select('*');

      if (!params?.includeArchived) {
        query = query.eq('is_archived', false);
      }

      if (params?.category && params.category !== 'all') {
        query = query.eq('category', params.category);
      }

      if (params?.searchQuery) {
        const q = params.searchQuery.trim();
        query = query.or(`brand_name.ilike.%${q}%,generic_name.ilike.%${q}%,purpose.ilike.%${q}%`);
      }

      if (params?.limit) {
        query = query.limit(params.limit);
      }

      const { data, error } = await query;

      if (error || !data || data.length === 0) {
        // Fallback to local
        return this.filterLocalProducts([...customLocal, ...AGRI_PRODUCTS], params);
      }

      const dbProducts = data.map(mapDbProductToAgri);
      // Combine with built-in catalogue to ensure complete richness
      const combinedMap = new Map<string, AgriProduct>();
      [...customLocal, ...AGRI_PRODUCTS, ...dbProducts].forEach((p) => combinedMap.set(p.id, p));

      return this.filterLocalProducts(Array.from(combinedMap.values()), params);
    } catch (err) {
      console.warn('Product service falling back to local dataset:', err);
      return this.filterLocalProducts([...customLocal, ...AGRI_PRODUCTS], params);
    }
  },

  async createProduct(product: Partial<Product>, userEmail?: string): Promise<AgriProduct> {
    const newId = 'prod-' + Date.now();
    const dbProduct: Product = {
      id: newId,
      code: newId,
      brand_name: product.brand_name || 'New Product',
      generic_name: product.generic_name || '',
      manufacturer: product.manufacturer || 'Agricultural Brand',
      category: product.category || 'fertilizer',
      formulation: product.formulation || 'SL',
      mixing_order_rank: product.mixing_order_rank || 5,
      ideal_ph: product.ideal_ph || 6.5,
      standard_dose: product.standard_dose || '2 ml/L',
      standard_unit: product.standard_unit || 'ml/L',
      default_dose_per_litre: product.default_dose_per_litre || 2,
      purpose: product.purpose || '',
      cib_rc_registered: product.cib_rc_registered ?? true,
      is_archived: false,
      metadata: product.metadata || {
        activeIngredients: product.generic_name || ''
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Save locally
    const custom = this.getLocalCustomProducts();
    const agri = mapDbProductToAgri(dbProduct);
    localStorage.setItem('agri_custom_products', JSON.stringify([agri, ...custom]));

    // Try Supabase
    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').insert([dbProduct]);
      } catch (e) {
        console.warn('Could not insert product into Supabase:', e);
      }
    }

    // Audit log
    await auditService.logAction({
      action: 'CREATE',
      entity: 'product',
      entity_id: newId,
      user_email: userEmail || 'admin@agri-intelligence.app',
      new_data: dbProduct
    });

    return agri;
  },

  async archiveProduct(productId: string, userEmail?: string): Promise<void> {
    // Local remove/archive
    const custom = this.getLocalCustomProducts().filter((p) => p.id !== productId);
    localStorage.setItem('agri_custom_products', JSON.stringify(custom));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').update({ is_archived: true }).eq('id', productId);
      } catch (e) {
        console.warn('Could not archive product in Supabase:', e);
      }
    }

    await auditService.logAction({
      action: 'ARCHIVE',
      entity: 'product',
      entity_id: productId,
      user_email: userEmail || 'admin@agri-intelligence.app',
      old_data: { id: productId }
    });
  },

  getLocalCustomProducts(): AgriProduct[] {
    try {
      const stored = localStorage.getItem('agri_custom_products');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  filterLocalProducts(list: AgriProduct[], params?: ProductQueryParams): AgriProduct[] {
    let result = list;
    if (params?.category && params.category !== 'all') {
      result = result.filter((p) => p.category === params.category);
    }
    if (params?.searchQuery) {
      const q = params.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.commonName.toLowerCase().includes(q) ||
          p.activeIngredients.toLowerCase().includes(q) ||
          p.purpose.toLowerCase().includes(q) ||
          p.targetCrops.some((c) => c.toLowerCase().includes(q))
      );
    }
    return result;
  }
};
