import React from 'react';
import { ShieldAlert, Layers } from 'lucide-react';

export const WalesGuideModal: React.FC = () => {
  const steps = [
    {
      letter: 'W',
      title: 'Water & Water Conditioners',
      subtitle: 'Start with 50% to 70% clean water in tank',
      color: 'bg-blue-600 text-white',
      border: 'border-blue-200 dark:border-blue-800',
      bgLight: 'bg-blue-50/60 dark:bg-blue-950/30',
      description: 'Fill spray tank halfway with clean, filtered water. Add water conditioners, acidifiers (citric acid or pH buffer), and water-hardness neutralizing salts (like Ammonium Sulphate AMS for glyphosate). Turn on tank agitation.'
    },
    {
      letter: 'A',
      title: 'Adjuvants / Surfactants & Compatibility Agents',
      subtitle: 'Spreaders, stickers, silicon activators & anti-foaming agents',
      color: 'bg-cyan-600 text-white',
      border: 'border-cyan-200 dark:border-cyan-800',
      bgLight: 'bg-cyan-50/60 dark:bg-cyan-950/30',
      description: 'Add anti-foaming agents first if prone to frothing, followed by non-ionic surfactants, organosilicone super spreaders, and drift control agents.'
    },
    {
      letter: 'L',
      title: 'L - Dry Formulations (WP, WDG, DF, SP)',
      subtitle: 'Wettable Powders & Water Dispersible Granules',
      color: 'bg-amber-600 text-white',
      border: 'border-amber-200 dark:border-amber-800',
      bgLight: 'bg-amber-50/60 dark:bg-amber-950/30',
      description: 'Pre-slurry all powders in a bucket of water before pouring into the spray tank. (e.g. Mancozeb 75 WP, Copper Oxychloride 50 WP, Emamectin Benzoate 5 SG). Allow 5 minutes of full tank agitation to ensure complete dispersion without lumps.'
    },
    {
      letter: 'E',
      title: 'E - Flowables & Emulsions (SC, CS, EC)',
      subtitle: 'Suspension Concentrates & Emulsifiable Concentrates',
      color: 'bg-indigo-600 text-white',
      border: 'border-indigo-200 dark:border-indigo-800',
      bgLight: 'bg-indigo-50/60 dark:bg-indigo-950/30',
      description: 'Add liquid flowables (SC - e.g. Azoxystrobin + Difenoconazole SC) first, followed by microencapsulated capsules (CS), and finally solvent-based emulsifiable concentrates (EC - e.g. Chlorpyrifos + Cypermethrin EC).'
    },
    {
      letter: 'S',
      title: 'S - Solubles & Foliar Fertilizers (SL, WSF, Tonics)',
      subtitle: 'Soluble Liquids, Micro-nutrients & Macro-fertilizers',
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-200 dark:border-emerald-800',
      bgLight: 'bg-emerald-50/60 dark:bg-emerald-950/30',
      description: 'Add true water-soluble solutions (SL - e.g. Imidacloprid 17.8 SL, Glyphosate 41 SL, GA3), followed by pre-dissolved Water Soluble Fertilizers (19:19:19, 0:52:34), Chelated micronutrients (Zinc EDTA), and Bio-stimulants. Top off tank with remaining water.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-100 dark:bg-agri-950 text-agri-800 dark:text-agri-300 text-xs font-bold border border-agri-200 dark:border-agri-800 mb-3">
            <Layers className="w-3.5 h-3.5" />
            Standard Agronomic Tank Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            The WALES Mixing Order Method
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Why mixing order matters: Adding emulsifiable oils (EC) before dry powders (WP) coats the powder granules in oil, creating insoluble gummy clumps that choke filters and ruin spray uniformity.
          </p>
        </div>

        {/* Step Cards */}
        <div className="space-y-4 relative">
          {steps.map((step, idx) => (
            <div
              key={step.letter}
              className={`rounded-2xl border p-5 sm:p-6 ${step.border} ${step.bgLight} transition-all relative`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0 ${step.color}`}>
                  {step.letter}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Step {idx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Agronomy Rules */}
        <div className="mt-8 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
          <h4 className="font-bold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Golden Rules of Tank Mixing
          </h4>
          <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
            <li>1. <strong>Never pour dry powders directly into a dry tank:</strong> Always have at least 50% water with agitation running.</li>
            <li>2. <strong>Pre-slurry powders:</strong> Mix WP / WDG in a bucket with 5 liters of water before pouring into main sprayer tank.</li>
            <li>3. <strong>Never mix pure concentrates together:</strong> Never pour two chemical concentrates together into a bucket without water.</li>
            <li>4. <strong>Continuous agitation:</strong> Keep the sprayer agitator running during filling, transportation to field, and actual spraying.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
