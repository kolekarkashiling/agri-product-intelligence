import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProductCategory, FormulationType } from '../types/agri';

export const AdminProductForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Form state for a new product
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    companyName: '',
    category: 'fertilizer' as ProductCategory,
    formulation: 'WP' as FormulationType,
    phRange: '',
    idealPh: '',
    activeIngredients: '',
    purpose: '',
    targetCrops: '', // Will split by comma
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    try {
      // TODO: Connect this to Supabase Insert query
      // const { data, error } = await supabase.from('agri_products').insert([ ... ])
      
      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus('success');
      // Reset form after success if needed
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl mt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Add New Agri Product</h2>
        <p className="text-sm text-slate-500 mt-1">Fill out the details below to add a new product to the database.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Basic Information</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Mahadhan 19:19:19" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Brand Name</label>
              <input required type="text" name="brandName" value={formData.brandName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Mahadhan" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
              <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Deepak Fertilisers" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="fertilizer">Fertilizer</option>
                  <option value="micronutrient">Micronutrient</option>
                  <option value="fungicide">Fungicide</option>
                  <option value="insecticide">Insecticide</option>
                  <option value="herbicide">Herbicide</option>
                  <option value="pgr">PGR</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Formulation</label>
                <select name="formulation" value={formData.formulation} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="WP">WP</option>
                  <option value="EC">EC</option>
                  <option value="SC">SC</option>
                  <option value="WSF">WSF</option>
                  <option value="WG">WG</option>
                </select>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">Technical Details</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Active Ingredients</label>
              <input required type="text" name="activeIngredients" value={formData.activeIngredients} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Total N: 19%, P2O5: 19%, K2O: 19%" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">pH Range</label>
                <input required type="text" name="phRange" value={formData.phRange} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 4.5 - 5.5" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Ideal pH</label>
                <input required type="number" step="0.1" name="idealPh" value={formData.idealPh} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 5.2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Crops (comma separated)</label>
              <input required type="text" name="targetCrops" value={formData.targetCrops} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Tomato, Chilli, Cotton" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Purpose / Usage</label>
              <textarea required name="purpose" value={formData.purpose} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Explain what this product is used for..." />
            </div>
          </div>

        </div>

        {/* Status & Submit */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            {status === 'success' && <p className="text-sm text-emerald-600 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Product added successfully!</p>}
            {status === 'error' && <p className="text-sm text-red-500 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Error saving product.</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={status === 'saving'}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {status === 'saving' ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};
