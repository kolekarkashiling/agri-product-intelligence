import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';

interface DisclaimerBannerProps {
  language: Language;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      aria-label="Legal & Safety Disclaimer"
      className="relative overflow-hidden mb-6 rounded-2xl border border-amber-400/30 dark:border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-50/40 to-amber-500/5 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/20 shadow-xs transition-all duration-300"
    >
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 text-xs text-amber-950 dark:text-amber-200">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="w-4 h-4 animate-pulse-subtle" />
          </div>
          <div className="leading-snug truncate">
            <span className="font-extrabold uppercase tracking-wide text-[11px] bg-amber-200/70 dark:bg-amber-900/60 px-2 py-0.5 rounded-md mr-2 border border-amber-300/60 dark:border-amber-700/60">
              Notice
            </span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">
              Agricultural Advisory & Label Disclaimer
            </span>
            {!isCollapsed && (
              <span className="hidden md:inline text-amber-800/80 dark:text-amber-300/80 ml-2 font-normal">
                – {t.disclaimer_text.slice(0, 110)}...
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 px-2.5 py-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-900/50 transition-colors"
          title={isCollapsed ? 'Expand Advisory' : 'Collapse Advisory'}
        >
          <span>{isCollapsed ? 'Read Advisory' : 'Hide'}</span>
          {isCollapsed ? (
            <ChevronDown className="w-3.5 h-3.5" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <div className="px-4 pb-3 sm:px-5 sm:pb-3.5 pt-0 text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed border-t border-amber-300/20 dark:border-amber-700/20 mt-1 animate-fade-in">
          <p className="pt-2 font-medium">
            <strong className="font-bold text-amber-950 dark:text-amber-100">Agricultural Decision Support Notice: </strong>
            {t.disclaimer_text}
          </p>
        </div>
      )}
    </aside>
  );
};

