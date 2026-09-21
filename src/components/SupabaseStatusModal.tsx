import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, X, ExternalLink, Copy, Check } from 'lucide-react';
import { checkSupabaseConnection, isSupabaseConfigured, ConnectionStatus } from '../lib/supabase';

interface SupabaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseStatusModal: React.FC<SupabaseStatusModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const runCheck = async () => {
    setChecking(true);
    try {
      const res = await checkSupabaseConnection();
      setStatus(res);
    } catch (e: any) {
      setStatus({
        connected: false,
        message: e?.message || 'Error checking connection'
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copySqlHint = () => {
    navigator.clipboard.writeText(`-- Run the contents of supabase_schema.sql in your Supabase SQL editor`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                Supabase Connection
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cloud database and real-time backend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Status Banner */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3.5 ${
            checking 
              ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
              : status?.connected
                ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}>
            {checking ? (
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            ) : status?.connected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-sm">
              <div className="font-semibold">
                {checking
                  ? 'Testing Supabase connection...'
                  : status?.connected
                    ? 'Connected to Supabase'
                    : 'Connection Notice'}
              </div>
              <p className="text-xs mt-1 opacity-90 leading-relaxed">
                {checking ? 'Pinging database endpoint...' : (status?.message || 'Checking status...')}
              </p>
              {status?.latencyMs && (
                <div className="mt-2 inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  Response latency: {status.latencyMs}ms
                </div>
              )}
            </div>
          </div>

          {/* Connection Details */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Configured Project URL
            </label>
            <div className="font-mono text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 break-all select-all">
              {status?.url || (isSupabaseConfigured ? 'Configured in .env' : 'Not configured')}
            </div>
          </div>

          {/* Database Tables Setup Hint */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Database Schema:
              </span>
              <a
                href="https://supabase.com/dashboard/project/_/sql"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Supabase SQL Editor</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We generated <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[11px]">supabase_schema.sql</code> in your project root. Execute it in the Supabase SQL editor to create the <code className="text-emerald-600 dark:text-emerald-400">saved_tank_mixes</code> and <code className="text-emerald-600 dark:text-emerald-400">saved_schedules</code> tables.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={runCheck}
            disabled={checking}
            className="inline-flex items-center space-x-2 text-xs font-medium px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
            <span>Re-check Connection</span>
          </button>

          <button
            onClick={onClose}
            className="text-xs font-medium px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm shadow-emerald-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
