import React from 'react';
import { Target, Code2, ShieldCheck, Sprout, User, Github, Linkedin, Mail } from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-slate-950 to-agri-950 text-white p-6 sm:p-10 shadow-2xl">
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold backdrop-blur-md mb-4 shadow-xs">
            <Sprout className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.about_title}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {t.about_title}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/85 mt-3 font-medium leading-relaxed max-w-2xl">
            {t.about_subtitle}
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-agri-100 dark:bg-agri-950/60 flex items-center justify-center text-agri-700 dark:text-agri-300 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            {t.about_mission_title}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.about_mission_body}
        </p>
      </div>

      {/* Developer Profile */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex items-start sm:items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
              Developed By: Kashiling Kolekar
            </h2>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              Python Developer | Machine Learning & Data Science | Full Stack Web Development
            </p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          Final-year B.Tech candidate in AI & Data Science skilled in Python, ML pipelines, REST API architecture, and full-stack web development. Creator of the Agri Product Intelligence platform.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:kolekarkashiling705@gmail.com" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
          <a href="https://linkedin.com/in/kashi-kolekar-6234a8368" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors border border-blue-200 dark:border-blue-800/50">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a href="https://github.com/kolekarkashiling" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </div>

      {/* Tech stack + compliance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-agri-100 dark:bg-agri-950/60 flex items-center justify-center text-agri-700 dark:text-agri-300 shrink-0">
              <Code2 className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {t.about_tech_title}
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.about_tech_body}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-agri-100 dark:bg-agri-950/60 flex items-center justify-center text-agri-700 dark:text-agri-300 shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
              {t.disclaimer_text ? 'FCO 1985 & CIB-RC' : ''}
            </h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.disclaimer_text}
          </p>
        </div>
      </div>
    </div>
  );
};
