import React from 'react';
import {
  LayoutDashboard, FlaskConical, Layers, History, CloudSun,
  BookOpen, ShieldCheck, ShieldAlert, Info, Sparkles, User, Globe, CalendarClock,
  Camera, ScanLine
} from 'lucide-react';
import { Language } from '../types/agri';
import { UserRole } from '../types/database.types';
import { TRANSLATIONS } from '../data/translations';

export type NavTab =
  | 'dashboard'
  | 'mix_analyzer'
  | 'products'
  | 'schedule_generator'
  | 'crop_guide'
  | 'condition_analyzer'
  | 'admin'
  | 'about';

interface SidebarNavigationProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  selectedTankCount?: number;
  onOpenScanner?: () => void;
}

export function SidebarNavigation({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  role,
  selectedTankCount = 0,
  onOpenScanner
}: SidebarNavigationProps) {
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'dashboard' as NavTab, label: t.nav_dashboard || 'Dashboard', icon: LayoutDashboard, badge: undefined },
    { id: 'mix_analyzer' as NavTab, label: t.nav_mix_analyzer || 'Tank Mix Analyzer', icon: FlaskConical, badge: selectedTankCount > 0 ? selectedTankCount : undefined, highlight: true },
    { id: 'schedule_generator' as NavTab, label: t.nav_schedule_generator || 'Schedule Generator', icon: CalendarClock },
    { id: 'crop_guide' as NavTab, label: t.nav_crop_guide || 'Crop Suggestion & Guide', icon: BookOpen },
    { id: 'products' as NavTab, label: t.nav_products || 'Crop Inputs Catalog', icon: Layers },
    { id: 'condition_analyzer' as NavTab, label: t.nav_condition_analyzer || 'Spray Weather Engine', icon: CloudSun },
    { id: 'admin' as NavTab, label: t.nav_admin || 'Admin Governance', icon: ShieldAlert, adminOnly: true },
    { id: 'about' as NavTab, label: t.nav_about || 'About & Agronomy', icon: Info }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'mr', label: 'MR' },
    { code: 'hi', label: 'HI' },
  ];

  return (
    <>
      {/* ── Desktop Sidebar (Collapsible Mini) ───────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-[5.5rem] hover:w-64 transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 p-4 shrink-0 h-screen sticky top-0 overflow-x-hidden overflow-y-auto group z-50 shadow-2xl hover:shadow-emerald-900/20">
        {/* Brand Header */}
        <div className="flex items-center gap-4 px-1 py-3 mb-4 shrink-0 overflow-hidden">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-agri-400 flex items-center justify-center shadow-lg shadow-emerald-900/20 text-white">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <div className="font-black text-sm text-slate-900 dark:text-white leading-tight">
              {language === 'hi' ? 'कृषि उत्पाद' : language === 'mr' ? 'कृषी प्रॉडक्ट' : 'Agri Product'}
            </div>
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
              INTELLIGENCE
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="space-y-2 mb-4">
          <button
            onClick={() => setCurrentTab('mix_analyzer')}
            className="
              w-full flex items-center justify-center gap-3 px-3 py-3 rounded-2xl
              bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500
              text-white font-black text-xs shadow-lg shadow-emerald-950/20
              transition-all duration-200 hover:scale-102 active:scale-98 overflow-hidden
            "
            title="New Tank Mix"
          >
            <Sparkles className="w-5 h-5 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{t.nav_new_tank || 'New Tank Mix'}</span>
          </button>

          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="
                w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-2xl
                bg-indigo-600/15 hover:bg-indigo-600 text-indigo-600 dark:text-indigo-400 hover:text-white
                border border-indigo-500/30 font-black text-xs
                transition-all duration-200 hover:scale-102 active:scale-98 overflow-hidden
              "
              title="Scan Bottle Label with AI"
            >
              <Camera className="w-4 h-4 shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Scan Bottle AI</span>
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-3 rounded-2xl text-xs font-bold transition-all overflow-hidden
                  ${isActive
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
                title={item.label}
              >
                <div className="flex items-center gap-4 shrink-0">
                  <Icon className={`w-6 h-6 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${isActive ? 'bg-white text-emerald-600' : 'bg-emerald-500 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Role Card & Language Picker */}
        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 overflow-hidden">
          <div className="p-2 group-hover:p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between transition-all">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
                <User className="w-5 h-5" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <div className="text-[10px] text-slate-400 uppercase font-bold">{t.role_label || 'Role Profile'}</div>
                <div className="text-xs font-black text-slate-900 dark:text-white capitalize">{role}</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('admin')}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
            >
              {t.change_label || 'Change'}
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex flex-col group-hover:flex-row items-center justify-center group-hover:justify-between px-1 group-hover:px-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="hidden group-hover:flex text-[11px] font-bold text-slate-400 items-center gap-1.5 whitespace-nowrap">
              <Globe className="w-3.5 h-3.5" /> {t.language_label || 'Language'}
            </span>
            <div className="flex flex-row gap-1 text-[11px] font-bold">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    language === code
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation Bar (Fixed) ─────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
            currentTab === 'dashboard' ? 'text-emerald-500 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px]">{t.nav_dashboard || 'Home'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('mix_analyzer')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all relative ${
            currentTab === 'mix_analyzer' ? 'text-emerald-500 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <div className="relative">
            <FlaskConical className="w-5 h-5" />
            {selectedTankCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">
                {selectedTankCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">{t.nav_mix_analyzer?.split(' ')[0] || 'Tank'}</span>
        </button>

        {/* Center Prominent Scan Button for Mobile Farmers */}
        {onOpenScanner && (
          <button
            onClick={onOpenScanner}
            className="-mt-5 flex flex-col items-center gap-1 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/40 border-2 border-white dark:border-slate-900 group-active:scale-90 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">
              Scan
            </span>
          </button>
        )}

        <button
          onClick={() => setCurrentTab('products')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
            currentTab === 'products' ? 'text-emerald-500 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">{language === 'hi' ? 'उत्पाद' : language === 'mr' ? 'उत्पादने' : 'Products'}</span>
        </button>

        <button
          onClick={() => setCurrentTab('about')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all ${
            currentTab === 'about' ? 'text-emerald-500 font-bold' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px]">{language === 'hi' ? 'बारे में' : language === 'mr' ? 'माहिती' : 'About'}</span>
        </button>
      </div>
    </>
  );
}

