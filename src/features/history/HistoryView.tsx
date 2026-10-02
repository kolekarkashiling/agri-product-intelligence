import React, { useState, useEffect } from 'react';
import {
  History, Search, Filter, Trash2, ArrowRight, X, Clock,
  Beaker, CheckCircle2, AlertTriangle, XCircle, FileText, ChevronLeft, ChevronRight
} from 'lucide-react';
import { analysisService, SavedAnalysisComplete } from '../../services/analysis.service';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Skeleton } from '../../components/ui/Skeleton';

interface HistoryViewProps {
  onReopenAnalysis: (analysis: SavedAnalysisComplete) => void;
  onStartNewMix: () => void;
}

export function HistoryView({ onReopenAnalysis, onStartNewMix }: HistoryViewProps) {
  const [analyses, setAnalyses] = useState<SavedAnalysisComplete[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState<SavedAnalysisComplete | null>(null);

  const pageSize = 8;

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await analysisService.getAnalyses({
        search,
        status: statusFilter,
        page,
        pageSize
      });
      setAnalyses(res.items);
      setTotalCount(res.total);
    } catch (e) {
      console.warn('Error loading history:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, statusFilter, page]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Delete this saved analysis?')) {
      await analysisService.deleteAnalysis(id);
      loadData();
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/20">
              <History className="w-3.5 h-3.5" /> Tank Mix Analysis Archive
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Saved Analyses & Application History
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Search and reopen past tank mix recipes, WALES sequences, and agronomic citations.
            </p>
          </div>

          <button
            onClick={onStartNewMix}
            className="btn-agri px-5 py-3 text-xs font-bold shrink-0 flex items-center gap-2"
          >
            <Beaker className="w-4 h-4" />
            <span>New Tank Mix</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by mix name, crop, or product ingredient..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none"
          >
            <option value="all">All Compatibility States</option>
            <option value="compatible">Compatible Only</option>
            <option value="caution">Caution Only</option>
            <option value="conflict">Conflict / Incompatible Only</option>
          </select>
        </div>
      </div>

      {/* List / Cards */}
      {loading ? (
        <Skeleton count={4} className="h-24" />
      ) : analyses.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center">
          <Beaker className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching analyses found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {search || statusFilter !== 'all' ? 'Try adjusting your search query or filter.' : 'Run your first tank mix evaluation to build your application history.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analyses.map((item) => (
            <div
              key={item.header.id}
              onClick={() => onReopenAnalysis(item)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <StatusBadge status={item.header.status} size="sm" />
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.header.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {item.header.mix_name}
                </h3>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Target Crop: {item.header.crop_name} · {item.header.water_volume_litres || 200}L/Acre
                </div>

                {/* Products list */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.products.map((p, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                    >
                      {p.product_name} ({p.dose} {p.unit})
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={(e) => handleDelete(e, item.header.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete analysis"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 flex items-center gap-1">
                  <span>Reopen Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-semibold">
            Page {page} of {totalPages} ({totalCount} total)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
