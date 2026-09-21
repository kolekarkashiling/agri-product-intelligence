import React, { useState, useEffect, useRef } from 'react';
import {
  Sprout, FlaskConical, CloudSun, BookOpen, Globe, Wheat,
  BookMarked, CalendarClock, Info, Database, LogIn, LogOut,
  User as UserIcon, Menu, X, ChevronDown, Beaker, Leaf
} from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { SupabaseStatusModal } from './SupabaseStatusModal';
import { AuthModal } from './AuthModal';
import { isSupabaseConfigured, supabase, signOutUser } from '../lib/supabase';

type TabId = 'products' | 'mix_analyzer' | 'condition_analyzer' | 'crop_guide' | 'fco_guide' | 'wales_guide' | 'schedule_generator' | 'about';

interface NavbarProps {
  currentTab: TabId;
  setCurrentTab: (tab: TabId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  selectedProductsCount: number;
}

interface NavItem {
  id: TabId;
  icon: React.ReactNode;
  label: string;
  color: string;
  badge?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  selectedProductsCount
}) => {
  const t = TRANSLATIONS[language];
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevTab, setPrevTab] = useState<TabId>(currentTab);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user || null);
      });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleTabChange = (tab: TabId) => {
    if (tab !== currentTab) {
      setPrevTab(currentTab);
      setAnimating(true);
      setCurrentTab(tab);
      setTimeout(() => setAnimating(false), 400);
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  const navItems: NavItem[] = [
    { id: 'products', icon: <Sprout className="w-4 h-4" />, label: t.nav_products, color: 'text-agri-500' },
    { id: 'mix_analyzer', icon: <FlaskConical className="w-4 h-4" />, label: t.nav_mix_analyzer, color: 'text-agri-500', badge: selectedProductsCount },
    { id: 'condition_analyzer', icon: <CloudSun className="w-4 h-4" />, label: t.nav_condition_analyzer, color: 'text-sky-500' },
    { id: 'crop_guide', icon: <Wheat className="w-4 h-4" />, label: t.nav_crop_guide, color: 'text-amber-500' },
    { id: 'fco_guide', icon: <BookMarked className="w-4 h-4" />, label: t.nav_fco_guide, color: 'text-emerald-500' },
    { id: 'wales_guide', icon: <BookOpen className="w-4 h-4" />, label: t.nav_wales_guide, color: 'text-blue-500' },
    { id: 'schedule_generator', icon: <CalendarClock className="w-4 h-4" />, label: t.nav_schedule_generator, color: 'text-indigo-500' },
    { id: 'about', icon: <Info className="w-4 h-4" />, label: t.nav_about, color: 'text-slate-400' },
  ];

  return (
    <>
      {/* ── Desktop & Mobile Navbar ────────────────────────────────── */}
      <header className={`
        sticky top-0 z-40 transition-all duration-300
        glass-navbar border-b
        ${scrolled
          ? 'border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5'
          : 'border-slate-200/50 dark:border-slate-800/50 shadow-xs'
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px]">

            {/* ── Logo & Brand ───────────────────────────────── */}
            <div
              onClick={() => handleTabChange('products')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Logo icon with glow */}
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-tr from-agri-500 to-emerald-400 opacity-0 group-hover:opacity-25 blur-md transition-opacity duration-300" />
                <div className={`
                  relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl
                  bg-gradient-to-tr from-agri-700 via-agri-600 to-agri-500
                  flex items-center justify-center text-white
                  shadow-md shadow-agri-600/30
                  transition-all duration-300
                  group-hover:scale-105 group-hover:shadow-glow group-hover:shadow-agri-500/40
                `}>
                  <Sprout className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2] drop-shadow-sm" />
                  {/* Live dot */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-white dark:border-slate-900" />
                  </span>
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-[17px] tracking-tight text-slate-900 dark:text-white leading-none">
                    Agri<span className="text-agri-600 dark:text-agri-400"> Intelligence</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-none">
                  {t.app_subtitle}
                </p>
              </div>
            </div>

            {/* ── Desktop Navigation ─────────────────────────── */}
            <nav className="hidden xl:flex items-center gap-0.5 bg-slate-100/80 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold
                      transition-all duration-200
                      ${isActive
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm scale-[1.02]'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
                      }
                    `}
                  >
                    {/* Icon */}
                    <span className={`transition-colors duration-200 ${isActive ? item.color : 'text-slate-400 dark:text-slate-500'}`}>
                      {item.icon}
                    </span>

                    <span>{item.label}</span>

                    {/* Badge */}
                    {item.badge && item.badge > 0 && (
                      <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black bg-agri-600 text-white rounded-full badge-pop animate-bounce-subtle">
                        {item.badge}
                      </span>
                    )}

                    {/* Active underline dot */}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-agri-500 shadow-sm" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── Right Controls ─────────────────────────────── */}
            <div className="flex items-center gap-2">

              {/* Supabase status */}
              <button
                onClick={() => setIsSupabaseModalOpen(true)}
                title="Database Status"
                className={`
                  hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl
                  border text-xs font-bold transition-all duration-200 ring-glow
                  bg-slate-50 dark:bg-slate-800/80
                  border-slate-200 dark:border-slate-700
                  text-slate-600 dark:text-slate-300
                  hover:border-agri-300 dark:hover:border-agri-700
                `}
              >
                <Database className="w-3.5 h-3.5 text-agri-600 dark:text-agri-400" />
                <span className="hidden md:inline">DB</span>
                <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              </button>

              {/* Language select */}
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-agri-300 dark:hover:border-agri-700 transition-all duration-200 ring-glow">
                <Globe className="w-3.5 h-3.5 text-agri-500" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-transparent text-slate-800 dark:text-slate-100 focus:outline-none font-bold cursor-pointer text-xs"
                >
                  <option value="en">EN</option>
                  <option value="mr">मर</option>
                </select>
              </div>

              {/* Auth button */}
              {user ? (
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1.5 rounded-xl text-xs font-bold text-emerald-800 dark:text-emerald-300 transition-all duration-200">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-agri-600 to-emerald-400 flex items-center justify-center text-white text-[9px] font-black shrink-0">
                    {(user.user_metadata?.full_name || user.email || 'F')[0].toUpperCase()}
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Farmer'}
                  </span>
                  <button
                    onClick={handleSignOut}
                    title="Sign Out"
                    className="ml-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-agri text-xs px-3 py-1.5 rounded-xl"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-agri-300 dark:hover:border-agri-700 transition-all duration-200 active:scale-95"
              >
                {isMobileMenuOpen
                  ? <X className="w-4 h-4" />
                  : <Menu className="w-4 h-4" />
                }
              </button>
            </div>
          </div>

          {/* ── Desktop: Scrollable secondary nav for medium screens ── */}
          <div className="flex xl:hidden overflow-x-auto gap-1.5 py-2 border-t border-slate-100/80 dark:border-slate-800/60 scrollbar-none">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`
                    shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                    transition-all duration-200 active:scale-95
                    ${isActive
                      ? 'bg-agri-600 text-white shadow-sm shadow-agri-600/25'
                      : 'bg-slate-100/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 hover:border-agri-300/60 dark:hover:border-agri-700/60'
                    }
                  `}
                >
                  <span className={isActive ? 'text-white' : item.color}>
                    {item.icon}
                  </span>
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/20 text-white' : 'bg-agri-600 text-white'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Mobile Full-Screen Menu Dropdown ──────────────────── */}
        {isMobileMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 z-50 animate-slide-up">
            <div className="glass-navbar border-b border-slate-200/70 dark:border-slate-800/70 shadow-xl shadow-slate-900/10 p-4 space-y-1">
              {navItems.map((item, idx) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold
                      transition-all duration-200 active:scale-98 text-left
                      ${isActive
                        ? 'bg-gradient-to-r from-agri-600 to-agri-500 text-white shadow-md shadow-agri-600/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                      }
                    `}
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    <span className={`${isActive ? 'text-white' : item.color} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="px-2 py-0.5 bg-white/20 text-white rounded-full text-xs font-black">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white/80" />}
                  </button>
                );
              })}

              {/* Mobile Auth */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 mt-2">
                {user ? (
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-agri-600 to-emerald-400 flex items-center justify-center text-white text-xs font-black">
                        {(user.user_metadata?.full_name || user.email || 'F')[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Farmer'}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-500">Signed in</div>
                      </div>
                    </div>
                    <button onClick={handleSignOut} className="text-rose-500 hover:text-rose-600 transition-colors p-1">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                    className="w-full btn-agri justify-center py-3 rounded-2xl"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In to Sync Data
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <SupabaseStatusModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(u) => setUser(u)}
      />
    </>
  );
};
