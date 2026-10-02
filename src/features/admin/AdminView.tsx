import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Plus, Edit3, Archive, Check, X, Search,
  BookOpen, FileText, UserCheck, AlertTriangle, Layers, Clock
} from 'lucide-react';
import { productService } from '../../services/product.service';
import { ruleService } from '../../services/rule.service';
import { auditService } from '../../services/audit.service';
import { AgriProduct } from '../../types/agri';
import { CompatibilityRule, AuditLogRecord, UserRole } from '../../types/database.types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Skeleton } from '../../components/ui/Skeleton';

interface AdminViewProps {
  currentRole: UserRole;
  userEmail?: string;
  onSwitchRole: (role: UserRole) => void;
}

export function AdminView({ currentRole, userEmail, onSwitchRole }: AdminViewProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'rules' | 'audit_logs' | 'roles'>('products');
  const [products, setProducts] = useState<AgriProduct[]>([]);
  const [rules, setRules] = useState<CompatibilityRule[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // New Product Modal Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<any>('fertilizer');
  const [newProdFormulation, setNewProdFormulation] = useState('SL');
  const [newProdDose, setNewProdDose] = useState('2 ml/L');
  const [newProdPurpose, setNewProdPurpose] = useState('');

  // New Rule Modal Form State
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [ruleProdA, setRuleProdA] = useState('');
  const [ruleProdB, setRuleProdB] = useState('');
  const [ruleStatus, setRuleStatus] = useState<'compatible' | 'caution' | 'conflict'>('conflict');
  const [ruleReason, setRuleReason] = useState('');
  const [ruleRecommendation, setRuleRecommendation] = useState('');
  const [ruleSource, setRuleSource] = useState('Fertilizer Control Order 1985 / CIB-RC');

  const loadAll = async () => {
    try {
      setLoading(true);
      const [prodData, ruleData, logsData] = await Promise.all([
        productService.getAllProducts({ includeArchived: true }),
        ruleService.getAllRules(),
        auditService.getAuditLogs()
      ]);
      setProducts(prodData);
      setRules(ruleData);
      setAuditLogs(logsData);
    } catch (e) {
      console.warn('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    await productService.createProduct(
      {
        brand_name: newProdName,
        generic_name: newProdName,
        category: newProdCategory,
        formulation: newProdFormulation,
        standard_dose: newProdDose,
        purpose: newProdPurpose
      },
      userEmail
    );

    setShowProductModal(false);
    setNewProdName('');
    setNewProdPurpose('');
    loadAll();
  };

  const handleArchiveProduct = async (id: string) => {
    if (window.confirm('Archive this product? It will be hidden from user search.')) {
      await productService.archiveProduct(id, userEmail);
      loadAll();
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleProdA || !ruleProdB || !ruleReason) return;

    await ruleService.saveRule(
      {
        product_a_code: ruleProdA,
        product_b_code: ruleProdB,
        status: ruleStatus,
        reason: ruleReason,
        recommendation: ruleRecommendation || 'Test 1-L jar mix before field spraying.',
        source: ruleSource
      },
      userEmail
    );

    setShowRuleModal(false);
    setRuleReason('');
    setRuleRecommendation('');
    loadAll();
  };

  const handleDeleteRule = async (id: string) => {
    if (window.confirm('Delete this compatibility rule?')) {
      await ruleService.deleteRule(id, userEmail);
      loadAll();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Admin Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-bold mb-2 border border-rose-500/20">
              <ShieldAlert className="w-3.5 h-3.5" /> Agronomy Governance & Admin Console
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Database Registry & Rule Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Maintain active inputs, scientific compatibility rules, verified citations, and audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-bold">Active Role:</span>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
              {currentRole}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-800 mt-6 scrollbar-none">
          {[
            { id: 'products', label: `Products (${products.length})`, icon: Layers },
            { id: 'rules', label: `Compatibility Rules (${rules.length})`, icon: BookOpen },
            { id: 'audit_logs', label: `Audit Logs (${auditLogs.length})`, icon: Clock },
            { id: 'roles', label: 'Role & Permissions', icon: UserCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all
                  ${isActive
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ TAB 1: PRODUCTS MANAGEMENT ═══ */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Registered Inputs Master</h3>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Check out scripts/llm_label_parser.py to see how this AI integration works!')}
                className="btn-agri bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20 px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" /> Auto-Extract via AI
              </button>
              <button
                onClick={() => setShowProductModal(true)}
                className="btn-agri px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Manual Add
              </button>
            </div>
          </div>

          {loading ? (
            <Skeleton count={5} className="h-14" />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Product Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Formulation</th>
                      <th className="px-4 py-3">Standard Dose</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                          {p.name}
                          <div className="text-[11px] font-normal text-slate-400">{p.commonName}</div>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">
                          {p.category}
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {p.formulation}
                        </td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-medium">
                          {p.standardDose}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleArchiveProduct(p.id)}
                            className="px-2.5 py-1 rounded-lg text-rose-500 hover:bg-rose-500/10 font-bold text-[11px] transition-colors"
                          >
                            Archive
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB 2: COMPATIBILITY RULES EDITOR ═══ */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Verified Compatibility Rules Registry</h3>
            <button
              onClick={() => setShowRuleModal(true)}
              className="btn-agri px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Verified Rule
            </button>
          </div>

          {loading ? (
            <Skeleton count={4} className="h-20" />
          ) : (
            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={rule.status} size="sm" />
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {rule.product_a_code || 'Product A'} ⟷ {rule.product_b_code || 'Product B'}
                      </span>
                    </div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {rule.reason}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Recommendation: {rule.recommendation}
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-1">
                      <BookOpen className="w-3 h-3" />
                      Source: {rule.source}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 self-end sm:self-center transition-colors"
                    title="Delete rule"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB 3: AUDIT LOGS ═══ */}
      {activeTab === 'audit_logs' && (
        <div className="space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Admin Change Logs & Governance</h3>

          {auditLogs.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
              No audit records recorded yet. Any product additions or rule modifications will appear here.
            </div>
          ) : (
            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono font-bold text-[10px] uppercase text-emerald-600">
                      {log.action}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {log.entity} ({log.entity_id})
                    </span>
                    <span className="text-slate-400 text-[11px] hidden sm:inline">
                      by {log.user_email || 'admin'}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px] font-mono">
                    {new Date(log.created_at).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ TAB 4: ROLES & PERMISSIONS ═══ */}
      {activeTab === 'roles' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-500 mt-1">
              Switch role context to test authorization rules and UI permission states.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                role: 'farmer' as UserRole,
                title: '🌾 Farmer Account',
                desc: 'Can evaluate tank mixes, view crops, and save application history for owned farms.'
              },
              {
                role: 'agronomist' as UserRole,
                title: '🔬 Certified Agronomist',
                desc: 'Can view full scientific chemical profiles, recommend safe alternatives, and create schedules.'
              },
              {
                role: 'admin' as UserRole,
                title: '🛡️ System Administrator',
                desc: 'Full access to create/archive products, edit compatibility rules, manage users, and inspect audit logs.'
              }
            ].map((r) => {
              const isCurrent = currentRole === r.role;
              return (
                <div
                  key={r.role}
                  className={`
                    p-5 rounded-2xl border transition-all flex flex-col justify-between
                    ${isCurrent
                      ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                    }
                  `}
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{r.title}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onSwitchRole(r.role)}
                    disabled={isCurrent}
                    className={`
                      mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all
                      ${isCurrent
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-emerald-500 hover:text-white'
                      }
                    `}
                  >
                    {isCurrent ? 'Active Role' : `Switch to ${r.role}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Create Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 py-10">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Add New Crop Input</h3>
              <button onClick={() => setShowProductModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Brand Name / Formulation</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g., Nativo 75 WG"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                  >
                    <option value="fertilizer">Fertilizer (NPK)</option>
                    <option value="micronutrient">Micronutrient</option>
                    <option value="fungicide">Fungicide</option>
                    <option value="insecticide">Insecticide</option>
                    <option value="herbicide">Herbicide</option>
                    <option value="pgr">PGR</option>
                    <option value="adjuvant">Adjuvant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Formulation</label>
                  <select
                    value={newProdFormulation}
                    onChange={(e) => setNewProdFormulation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                  >
                    <option value="WP">WP (Wettable Powder)</option>
                    <option value="WDG">WDG / WSG</option>
                    <option value="SC">SC (Suspension Concentrate)</option>
                    <option value="EC">EC (Emulsifiable Concentrate)</option>
                    <option value="SL">SL (Soluble Liquid)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Standard Recommended Dose</label>
                <input
                  type="text"
                  value={newProdDose}
                  onChange={(e) => setNewProdDose(e.target.value)}
                  placeholder="e.g., 1.5 ml/L"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Target Purpose</label>
                <textarea
                  value={newProdPurpose}
                  onChange={(e) => setNewProdPurpose(e.target.value)}
                  placeholder="Target disease, pest or nutrient benefit..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-agri px-5 py-2.5 text-xs">
                  Save Product
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}

      {/* Compatibility Rule Create Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 py-10">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">Add Verified Compatibility Rule</h3>
              <button onClick={() => setShowRuleModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Product A (Code/Name)</label>
                  <input
                    type="text"
                    required
                    value={ruleProdA}
                    onChange={(e) => setRuleProdA(e.target.value)}
                    placeholder="e.g., fert-calcium-nitrate"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Product B (Code/Name)</label>
                  <input
                    type="text"
                    required
                    value={ruleProdB}
                    onChange={(e) => setRuleProdB(e.target.value)}
                    placeholder="e.g., fert-npk-005234"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Status</label>
                <select
                  value={ruleStatus}
                  onChange={(e) => setRuleStatus(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
                >
                  <option value="compatible">Compatible (Safe)</option>
                  <option value="caution">Caution (Conditional)</option>
                  <option value="conflict">Conflict (Incompatible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Scientific Reason</label>
                <input
                  type="text"
                  required
                  value={ruleReason}
                  onChange={(e) => setRuleReason(e.target.value)}
                  placeholder="e.g., Insoluble Calcium Phosphate Precipitation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Agronomic Recommendation</label>
                <input
                  type="text"
                  value={ruleRecommendation}
                  onChange={(e) => setRuleRecommendation(e.target.value)}
                  placeholder="e.g., Apply separately with 5 days interval."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Scientific Source Reference</label>
                <input
                  type="text"
                  value={ruleSource}
                  onChange={(e) => setRuleSource(e.target.value)}
                  placeholder="e.g., Fertilizer Control Order 1985 / ICAR Advisory"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRuleModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-agri px-5 py-2.5 text-xs">
                  Save Rule
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
