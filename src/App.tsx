import { useState, useEffect, useRef } from 'react';
import { AgriProduct, Language } from './types/agri';
import { AGRI_PRODUCTS } from './data/products';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { MixAnalyzerView } from './components/MixAnalyzerView';
import { ConditionAnalyzerView } from './components/ConditionAnalyzerView';
import { CropGuideView } from './components/CropGuideView';
import { FcoGuideView } from './components/FcoGuideView';
import { WalesGuideModal } from './components/WalesGuideModal';
import { ScheduleGeneratorView } from './components/ScheduleGeneratorView';
import { AboutView } from './components/AboutView';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { AnimatedBackground } from './components/AnimatedBackground';
import {
  Search, ArrowRight, ShieldCheck, Filter, Sparkles, X,
  Beaker, Droplets, Leaf, TrendingUp, FlaskConical, Zap
} from 'lucide-react';

/* ─── Animated stat counter ─────────────────────────────────── */
function AnimatedStat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        relative rounded-2xl p-4 text-center border transition-all duration-500 cursor-default group
        bg-white/5 dark:bg-white/[0.03] border-white/10
        hover:bg-white/10 hover:border-white/20 hover:scale-105
        backdrop-blur-sm
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, background 0.3s ease, border-color 0.3s ease' }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-agri-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex justify-center mb-1.5 text-agri-400 group-hover:text-agri-300 transition-colors">
          {icon}
        </div>
        <div className={`text-xl sm:text-2xl font-black text-white stat-number transition-all duration-700 ${visible ? 'animate-counter-up' : ''}`}>
          {value}
        </div>
        <div className="text-[10px] font-bold text-emerald-300/80 uppercase tracking-widest mt-1">{label}</div>
      </div>
    </div>
  );
}

/* ─── Quick search pill ──────────────────────────────────────── */
function QuickPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="
        group px-3 py-1 rounded-xl text-[11px] font-bold
        bg-white/8 hover:bg-white/15 active:bg-white/20
        text-emerald-100/90 hover:text-white
        border border-emerald-400/15 hover:border-emerald-400/40
        transition-all duration-200 hover:scale-105 active:scale-95
        backdrop-blur-sm
      "
    >
      {label}
    </button>
  );
}

export function App() {
  const [currentTab, setCurrentTab] = useState<'products' | 'mix_analyzer' | 'condition_analyzer' | 'crop_guide' | 'fco_guide' | 'wales_guide' | 'schedule_generator' | 'about'>('products');
  const [language, setLanguage] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<AgriProduct[]>([]);
  const [activeDetailProduct, setActiveDetailProduct] = useState<AgriProduct | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Add / Remove from tank
  const toggleSelectProduct = (product: AgriProduct) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (selectedProducts.length >= 10) {
        alert('Tank maximum limit is 10 products.');
        return;
      }
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const removeProductFromTank = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearTank = () => setSelectedProducts([]);

  const selectPresetScenario = (productIds: string[]) => {
    const productsToAdd = AGRI_PRODUCTS.filter((p) => productIds.includes(p.id));
    setSelectedProducts(productsToAdd);
    setCurrentTab('mix_analyzer');
  };

  // Filter products
  const filteredProducts = AGRI_PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.commonName.toLowerCase().includes(q) ||
      p.activeIngredients.toLowerCase().includes(q) ||
      p.purpose.toLowerCase().includes(q) ||
      p.targetCrops.some((c) => c.toLowerCase().includes(q)) ||
      (p.npkOrNutrients && p.npkOrNutrients.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const categoryFilters: { id: string; label: string; emoji: string }[] = [
    { id: 'all', label: t.filter_all, emoji: '🌿' },
    { id: 'fertilizer', label: t.filter_fertilizer, emoji: '🌱' },
    { id: 'micronutrient', label: t.filter_micronutrient, emoji: '⚗️' },
    { id: 'fungicide', label: t.filter_fungicide, emoji: '🔵' },
    { id: 'insecticide', label: t.filter_insecticide, emoji: '🛡️' },
    { id: 'herbicide', label: t.filter_herbicide, emoji: '🌾' },
    { id: 'pgr', label: t.filter_pgr, emoji: '🧬' },
    { id: 'adjuvant', label: t.filter_adjuvant, emoji: '💧' },
    { id: 'biostimulant', label: t.filter_biostimulant, emoji: '✨' },
  ];

  const statsData = [
    { value: `${AGRI_PRODUCTS.length}+`, label: 'Crop Inputs', icon: <Leaf className="w-4 h-4" /> },
    { value: '0–100', label: 'Risk Scoring', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'WALES', label: 'Mix Sequence', icon: <FlaskConical className="w-4 h-4" /> },
    { value: 'FCO 1985', label: 'Lab Standard', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        selectedProductsCount={selectedProducts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24">
        {/* Permanent Legal Disclaimer */}
        <DisclaimerBanner language={language} />

        {/* ═══ TAB 1: PRODUCT DIRECTORY ═══════════════════════════ */}
        {currentTab === 'products' && (
          <div className="space-y-6 page-transition">

            {/* ── Hero Search Section ─────────────────────────── */}
            <div className="relative rounded-3xl overflow-hidden hero-mesh-bg text-white shadow-2xl border border-white/5">
              {/* Animated background layer */}
              <AnimatedBackground variant="hero" />

              {/* Grid overlay */}
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

              {/* Scan overlay */}
              <div className="absolute inset-0 scan-overlay pointer-events-none" />

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-10">
                <div className="max-w-4xl">

                  {/* Status badge */}
                  <div className={`
                    inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                    bg-emerald-500/10 border border-emerald-400/25
                    text-emerald-300 text-[11px] font-bold backdrop-blur-md mb-5
                    transition-all duration-700
                    ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Evidence-Based Agronomy · FCO 1985 & CIB-RC Compliance
                  </div>

                  {/* Hero heading */}
                  <h1
                    className={`
                      text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight
                      transition-all duration-700 delay-100
                      ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                    `}
                  >
                    Agricultural Product{' '}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-agri-300 bg-clip-text text-transparent">
                        Database
                      </span>
                    </span>
                    {' '}&{' '}
                    <br className="hidden sm:block" />
                    <span className="text-white/90">Compatibility Assistant</span>
                  </h1>

                  <p
                    className={`
                      text-sm text-emerald-100/75 mt-3 font-medium leading-relaxed max-w-2xl
                      transition-all duration-700 delay-200
                      ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                  >
                    Search registered fertilizers, fungicides, and crop inputs. Assess multi-product tank precipitation risks,
                    verify WALES mixing order, and evaluate field weather before spraying.
                  </p>

                  {/* ── Search Bar ─────────────────────────────── */}
                  <div
                    className={`
                      mt-6 transition-all duration-700 delay-300
                      ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                  >
                    <div className="relative group">
                      {/* Search icon */}
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-500 transition-colors group-focus-within:text-agri-400 z-10" />

                      {/* Glow ring on focus */}
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-agri-500/50 to-emerald-500/50 opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />

                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t.search_placeholder}
                        className="
                          relative w-full pl-12 pr-28 py-4 rounded-2xl
                          bg-white dark:bg-slate-900
                          text-slate-900 dark:text-white
                          placeholder:text-slate-400 dark:placeholder:text-slate-500
                          text-sm font-semibold
                          border-2 border-transparent focus:border-agri-400/60
                          focus:outline-none
                          shadow-xl shadow-black/20
                          transition-all duration-200
                          input-agri
                        "
                      />

                      {searchQuery ? (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 flex items-center gap-1 active:scale-95"
                        >
                          <X className="w-3.5 h-3.5" /> Clear
                        </button>
                      ) : (
                        <span className="hidden sm:inline-flex items-center absolute right-4 top-1/2 -translate-y-1/2 gap-1 px-2 py-1 rounded-md text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <Search className="w-3 h-3" /> Search
                        </span>
                      )}
                    </div>

                    {/* Quick search chips */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-3 text-xs">
                      <span className="text-emerald-300/70 font-semibold flex items-center gap-1 text-[11px] shrink-0">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        Quick:
                      </span>
                      {['19:19:19', 'Chlorantraniliprole', 'Mancozeb', 'Zinc Sulfate', 'Urea', 'Neem Oil'].map((item) => (
                        <QuickPill key={item} label={item} onClick={() => setSearchQuery(item)} />
                      ))}
                    </div>
                  </div>

                  {/* ── Stats Grid ─────────────────────────────── */}
                  <div
                    className={`
                      grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10
                      transition-all duration-700 delay-500
                      ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                  >
                    {statsData.map((stat, i) => (
                      <AnimatedStat
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        icon={stat.icon}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Category Filter Chips ───────────────────────── */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-agri-500" /> Category:
              </span>
              {categoryFilters.map((cat, i) => {
                const count = cat.id === 'all'
                  ? AGRI_PRODUCTS.length
                  : AGRI_PRODUCTS.filter((p) => p.category === cat.id).length;
                const isActive = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`
                      category-chip shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold
                      flex items-center gap-1.5
                      transition-all duration-200 active:scale-95
                      ${isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-agri-300/60 dark:hover:border-agri-700/40'
                      }
                    `}
                  >
                    <span className="text-sm leading-none">{cat.emoji}</span>
                    <span>{cat.label}</span>
                    <span className={`
                      text-[10px] px-1.5 py-0.5 rounded-full font-black min-w-[20px] text-center
                      ${isActive
                        ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }
                    `}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Product Count Header ────────────────────────── */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Showing{' '}
                  <span className="font-black text-slate-800 dark:text-slate-200">{filteredProducts.length}</span>
                  {' '}product{filteredProducts.length !== 1 ? 's' : ''}
                  {searchQuery && <> for <span className="text-agri-600 dark:text-agri-400 font-bold">"{searchQuery}"</span></>}
                </p>
                {selectedProducts.length > 0 && (
                  <div className="text-xs font-bold text-agri-600 dark:text-agri-400 bg-agri-50 dark:bg-agri-950/40 px-3 py-1 rounded-xl border border-agri-200/50 dark:border-agri-800/50 animate-fade-in">
                    {selectedProducts.length} in tank
                  </div>
                )}
              </div>
            )}

            {/* ── Product Cards Grid ──────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.some((p) => p.id === product.id)}
                  onToggleSelect={toggleSelectProduct}
                  onViewDetails={setActiveDetailProduct}
                  language={language}
                  animationDelay={Math.min(idx * 0.04, 0.4)}
                />
              ))}
            </div>

            {/* ── Empty state ─────────────────────────────────── */}
            {filteredProducts.length === 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-14 text-center shadow-xs animate-scale-in">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">
                  No matching crop inputs found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 max-w-md mx-auto">
                  No results for "<span className="text-agri-600 dark:text-agri-400 font-bold">{searchQuery}</span>".
                  Try searching by active ingredient, formulation (SC, WP), or NPK ratio.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="btn-agri mt-5 mx-auto"
                >
                  <X className="w-4 h-4" />
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MIX ANALYZER */}
        {currentTab === 'mix_analyzer' && (
          <div className="page-transition">
            <MixAnalyzerView
              selectedProducts={selectedProducts}
              allProducts={AGRI_PRODUCTS}
              onAddProduct={(prod) => toggleSelectProduct(prod)}
              onRemoveProduct={removeProductFromTank}
              onClearTank={clearTank}
              onSelectPreset={selectPresetScenario}
              language={language}
            />
          </div>
        )}

        {/* TAB 3: CONDITION ANALYZER */}
        {currentTab === 'condition_analyzer' && (
          <div className="page-transition">
            <ConditionAnalyzerView language={language} />
          </div>
        )}

        {/* TAB 4: CROP GUIDE */}
        {currentTab === 'crop_guide' && (
          <div className="page-transition">
            <CropGuideView language={language} />
          </div>
        )}

        {/* TAB 5: FCO FERTILIZER GUIDE */}
        {currentTab === 'fco_guide' && (
          <div className="page-transition">
            <FcoGuideView language={language} />
          </div>
        )}

        {/* TAB 6: WALES GUIDE */}
        {currentTab === 'wales_guide' && (
          <div className="page-transition">
            <WalesGuideModal />
          </div>
        )}

        {/* TAB 7: SCHEDULE GENERATOR */}
        {currentTab === 'schedule_generator' && (
          <div className="page-transition">
            <ScheduleGeneratorView language={language} />
          </div>
        )}

        {/* TAB 8: ABOUT US */}
        {currentTab === 'about' && (
          <div className="page-transition">
            <AboutView language={language} />
          </div>
        )}
      </main>

      {/* ── Floating Tank Widget ──────────────────────────────────── */}
      {selectedProducts.length > 0 && currentTab === 'products' && (
        <div className="fixed bottom-6 right-6 z-30 animate-scale-in">
          <div className="relative group">
            {/* Pulsing glow ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-agri-500 to-emerald-400 opacity-60 blur-lg group-hover:opacity-90 group-hover:blur-xl transition-all duration-300 animate-pulse-subtle" />

            <button
              onClick={() => setCurrentTab('mix_analyzer')}
              className="
                relative flex items-center gap-3 px-6 py-3.5 rounded-full
                bg-gradient-to-r from-agri-700 via-agri-600 to-emerald-600
                hover:from-agri-600 hover:via-agri-500 hover:to-emerald-500
                text-white font-black text-sm
                shadow-2xl border border-white/20
                transition-all duration-200 hover:scale-105 active:scale-95
                overflow-hidden
              "
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 bg-shimmer-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />

              <span className="relative flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white text-agri-700 flex items-center justify-center font-black text-sm shadow-md shrink-0">
                  {selectedProducts.length}
                </div>
                <span>Analyze Tank Mix</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={activeDetailProduct}
        onClose={() => setActiveDetailProduct(null)}
        language={language}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 py-5 bg-white dark:bg-slate-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-agri-700 to-agri-500 flex items-center justify-center">
            <Leaf className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Agri Product Intelligence
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
          © 2026 India Fertilizer Reference Guide & Decision-Support System
        </p>
      </footer>
    </div>
  );
}

export default App;
