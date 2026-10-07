import React, { useState } from 'react';
import { Language, AgriProduct } from './types/agri';
import { AGRI_PRODUCTS } from './data/products';
import { SidebarNavigation, NavTab } from './app/SidebarNavigation';
import { DashboardView } from './features/dashboard/DashboardView';
import { TankMixWizard } from './features/tank-mix/TankMixWizard';
import { ProductCatalogView } from './features/products/ProductCatalogView';
import { AdminView } from './features/admin/AdminView';
import { ConditionAnalyzerView } from './components/ConditionAnalyzerView';
import { CropGuideView } from './components/CropGuideView';
import { ScheduleGeneratorView } from './components/ScheduleGeneratorView';
import { AboutView } from './components/AboutView';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { ProductScannerModal } from './components/ProductScannerModal';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { useAuth } from './hooks/useAuth';
import { SavedAnalysisComplete } from './services/analysis.service';
import { ArrowRight, Leaf, Sparkles, Camera } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedProducts, setSelectedProducts] = useState<AgriProduct[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [inspectedProduct, setInspectedProduct] = useState<AgriProduct | null>(null);
  const { role, user, profile, switchRole } = useAuth();

  const toggleSelectProduct = (product: AgriProduct) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (selectedProducts.length >= 8) {
        alert('Spray tank limit is 8 products.');
        return;
      }
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleStartNewMix = () => {
    setSelectedProducts([]);
    setCurrentTab('mix_analyzer');
  };

  const handleReopenAnalysis = (analysis: SavedAnalysisComplete) => {
    // Navigate to Tank Mix Analyzer
    setCurrentTab('mix_analyzer');
  };

  const handleScannedProductSelect = (product: AgriProduct) => {
    if (!selectedProducts.some((p) => p.id === product.id)) {
      if (selectedProducts.length >= 8) {
        alert('Spray tank limit is 8 products.');
        return;
      }
      setSelectedProducts((prev) => [...prev, product]);
    }
    setCurrentTab('mix_analyzer');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col lg:flex-row relative overflow-hidden transition-colors duration-500">
      {/* Background Particles */}
      <div className="particle-field hidden dark:block pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--x': `${Math.random() * 100}%`,
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${5 + Math.random() * 5}s`
          } as React.CSSProperties} />
        ))}
      </div>

      {/* ── Desktop Sidebar & Mobile Bottom Navigation ──────── */}
      <div className="relative z-20">
        <SidebarNavigation
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          language={language}
          setLanguage={setLanguage}
          role={role}
          selectedTankCount={selectedProducts.length}
          onOpenScanner={() => setIsScannerOpen(true)}
        />
      </div>

      {/* ── Main Content Work Area ───────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 glass-navbar border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Verified Agronomy Intelligence
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick AI Scanner Button */}
            <button
              onClick={() => setIsScannerOpen(true)}
              className="btn-agri text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm bg-indigo-600 hover:bg-indigo-500"
              title="Point camera at bottle to scan"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scan Bottle AI</span>
              <span className="sm:hidden">Scan</span>
            </button>

            {selectedProducts.length > 0 && currentTab !== 'mix_analyzer' && (
              <button
                onClick={() => setCurrentTab('mix_analyzer')}
                className="btn-agri text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedProducts.length} in Tank — Analyze</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Route Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 lg:pb-12">
          {/* Permanent Legal Disclaimer */}
          <DisclaimerBanner language={language} />

          {/* TAB: DASHBOARD */}
          {currentTab === 'dashboard' && (
            <DashboardView
              onStartNewMix={handleStartNewMix}
              onViewProducts={() => setCurrentTab('products')}
              onViewHistory={() => {}}
              onViewScheduleGenerator={() => setCurrentTab('schedule_generator')}
              onViewConditionAnalyzer={() => setCurrentTab('condition_analyzer')}
              onViewCropGuide={() => setCurrentTab('crop_guide')}
              onReopenAnalysis={handleReopenAnalysis}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}

          {/* TAB: TANK MIX ANALYZER (7-Step Guided Workflow) */}
          {currentTab === 'mix_analyzer' && (
            <TankMixWizard
              allProducts={AGRI_PRODUCTS}
              language={language}
              initialSelectedProducts={selectedProducts}
              userEmail={user?.email || profile?.display_name || undefined}
              userId={user?.id || undefined}
            />
          )}

          {/* TAB: PRODUCT CATALOG */}
          {currentTab === 'products' && (
            <ProductCatalogView
              language={language}
              selectedProductIds={selectedProducts.map((p) => p.id)}
              onToggleSelect={toggleSelectProduct}
              onAnalyzeTank={() => setCurrentTab('mix_analyzer')}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}

          {/* TAB: SPRAY WEATHER ENGINE */}
          {currentTab === 'condition_analyzer' && (
            <ConditionAnalyzerView language={language} />
          )}

          {/* TAB: SCHEDULE GENERATOR */}
          {currentTab === 'schedule_generator' && (
            <ScheduleGeneratorView language={language} />
          )}

          {/* TAB: CROP SUGGESTIONS & GUIDES */}
          {currentTab === 'crop_guide' && (
            <CropGuideView language={language} />
          )}

          {/* TAB: ADMIN PANEL */}
          {currentTab === 'admin' && (
            <AdminView
              currentRole={role}
              userEmail={user?.email || undefined}
              onSwitchRole={switchRole}
            />
          )}

          {/* TAB: ABOUT US */}
          {currentTab === 'about' && (
            <AboutView language={language} />
          )}
        </main>

        {/* Floating Tank Widget for Quick Navigation */}
        {selectedProducts.length > 0 && currentTab === 'products' && (
          <div className="fixed bottom-16 lg:bottom-6 right-6 z-30 animate-scale-in">
            <button
              onClick={() => setCurrentTab('mix_analyzer')}
              className="
                flex items-center gap-3 px-6 py-3.5 rounded-full
                bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500
                text-white font-black text-sm shadow-2xl border border-white/20
                transition-all duration-200 hover:scale-105 active:scale-95
              "
            >
              <div className="w-6 h-6 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-xs">
                {selectedProducts.length}
              </div>
              <span>Analyze Tank Mix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Global Product Scanner Modal */}
        <ProductScannerModal
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          language={language}
          onSelectProductForTank={handleScannedProductSelect}
          onViewProductDetails={(prod) => setInspectedProduct(prod)}
        />

        {/* Product Details Modal (for deep inspection) */}
        {inspectedProduct && (
          <ProductDetailsModal
            product={inspectedProduct}
            onClose={() => setInspectedProduct(null)}
            language={language}
          />
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-white/10 py-4 glass-navbar text-center text-xs text-slate-500 relative z-10">
          <div className="flex items-center justify-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 mb-0.5">
            <Leaf className="w-3.5 h-3.5 text-emerald-500" />
            Agri Product Intelligence
          </div>
          <p>© 2026 India Fertilizer Reference Guide & Tank Mix Decision-Support System</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

