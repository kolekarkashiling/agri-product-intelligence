import React, { useState } from 'react';
import {
  Target,
  Code2,
  ShieldCheck,
  Sprout,
  User,
  Github,
  Linkedin,
  Mail,
  FlaskConical,
  CloudSun,
  Droplets,
  Layers,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Cpu,
  Database,
  Award,
  CheckCircle2,
  Check,
  Copy,
  BookOpen
} from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { AnimatedBackground } from './AnimatedBackground';

interface AboutViewProps {
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('kolekarkashiling705@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const faqs = [
    {
      q: 'Why is the WALES sequence critical for multi-product tank mixes?',
      a: 'The WALES sequence (Wettable powders → Agitation → Liquid flowables → Emulsifiable concentrates → Surfactants/Solubles) prevents formulation destabilization. Adding emulsifiable oils before powders coats dry particles, preventing hydration and creating sticky sludge that irreversibly blocks spray nozzles and filters.',
      tag: 'WALES Protocol'
    },
    {
      q: 'Why must Calcium Nitrate NEVER be mixed with Sulphates or Phosphates?',
      a: 'Calcium cations (Ca²⁺) react immediately with sulphate anions (SO₄²⁻) or orthophosphate anions (PO₄³⁻) in aqueous solutions to form insoluble gypsum (calcium sulphate) or calcium phosphate precipitates. This locks out nutrients from plant uptake and severely clogs drip emitters and spray nozzles.',
      tag: 'Chemical Compatibility'
    },
    {
      q: 'What is Delta-T and why shouldn’t farmers spray when Delta-T > 8°C?',
      a: 'Delta-T is the difference between dry-bulb and wet-bulb temperature, representing atmospheric moisture deficit. If Delta-T exceeds 8°C, spray droplets evaporate within seconds before contacting leaf stomata, precipitating active chemicals as ineffective airborne crystals. The ideal agricultural spraying window is strictly 2°C to 8°C.',
      tag: 'Spray Weather Engine'
    },
    {
      q: 'Is all product data verified against official Indian standards?',
      a: 'Yes. Every product in the database is indexed against Fertilizer Control Order (FCO) 1985 specifications and Central Insecticides Board & Registration Committee (CIB-RC) approved labels, ensuring accurate active ingredients, pre-harvest intervals (PHI), and maximum residue limits (MRL).',
      tag: 'FCO 1985 & CIB-RC'
    }
  ];

  const pillars = [
    {
      icon: FlaskConical,
      title: 'WALES Scientific Sequencing',
      desc: 'Enforces standard physical addition hierarchy to prevent slurry formation, greasy residues, and nozzle sedimentation.',
      badge: 'Order of Addition',
      color: 'emerald',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      border: 'border-emerald-500/30'
    },
    {
      icon: ShieldCheck,
      title: 'Chemical Antagonism Detection',
      desc: 'Real-time matrix scanning for cation precipitation, micronutrient chelate breakage, and severe pH destabilization.',
      badge: 'Antagonism Matrix',
      color: 'teal',
      bgGlow: 'rgba(20, 184, 166, 0.15)',
      border: 'border-teal-500/30'
    },
    {
      icon: CloudSun,
      title: 'Delta-T Weather Microclimate',
      desc: 'Live psychrometric calculation of droplet evaporation rates, wind drift cutoffs, and optimal spray timing windows.',
      badge: 'Evaporation Risk',
      color: 'sky',
      bgGlow: 'rgba(14, 165, 233, 0.15)',
      border: 'border-sky-500/30'
    },
    {
      icon: Sprout,
      title: 'FCO 1985 & CIB-RC Statutory Truth',
      desc: 'Zero unverified claims. Every nutrient percentage and active dose is verified against official gazetted schedules.',
      badge: 'Statutory Standards',
      color: 'lime',
      bgGlow: 'rgba(132, 204, 22, 0.15)',
      border: 'border-lime-500/30'
    }
  ];

  const devSkills = [
    { category: 'AI & Data Science', skills: ['Python 3.13', 'PyTorch', 'Scikit-Learn', 'Pandas & NumPy', 'ML Pipelines', 'Computer Vision OCR', 'FastEval'] },
    { category: 'Full Stack & UX', skills: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide UI/UX', 'Responsive Architecture', 'State Machines'] },
    { category: 'Backend & Cloud', skills: ['FastAPI REST', 'Supabase PostgreSQL', 'Row Level Security', 'Relational Schemas', 'JWT Auth'] }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-6xl mx-auto w-full">
      
      {/* ── 1. Hero Showcase Banner with Animated Background ──────────────────── */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 text-white p-6 sm:p-12 shadow-2xl">
        <AnimatedBackground variant="hero" className="opacity-70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          {/* Live pulsing tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-emerald-400/40 text-emerald-300 text-xs font-black tracking-wide shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 pulse-ring-beacon" />
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>AGRONOMIC DECISION-SUPPORT PLATFORM • FCO 1985 VALIDATED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Agri Product <span className="text-gradient-agri">Intelligence</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 font-medium leading-relaxed max-w-2xl">
            {t.about_mission_body || 'Evidence-based decision support system designed to eliminate chemical antagonism, ensure precise WALES addition sequence, and maximize agricultural spray efficacy for farmers across India.'}
          </p>

          {/* Impact Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="glass-pill rounded-2xl p-3.5 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 stat-number">50+</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Verified Inputs</div>
            </div>

            <div className="glass-pill rounded-2xl p-3.5 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-teal-300 stat-number">100%</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">FCO 1985 Compliant</div>
            </div>

            <div className="glass-pill rounded-2xl p-3.5 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-sky-400 stat-number">7-Step</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">WALES Protocol</div>
            </div>

            <div className="glass-pill rounded-2xl p-3.5 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-lime-400 stat-number">Delta-T</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">Weather Engine</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Developer Profile Card (Kashiling Kolekar) ───────────────────────── */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl overflow-hidden hover-glow-card transition-all duration-300">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Avatar / Monogram Badge with Glow */}
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-agri-400 text-white flex flex-col items-center justify-center font-black text-xl sm:text-2xl shadow-lg shadow-emerald-900/25 border-2 border-white dark:border-slate-800 group-hover:scale-105 transition-transform duration-300">
                <span>KK</span>
                <span className="text-[9px] font-mono tracking-tighter opacity-80 uppercase">AI & DEV</span>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white" title="Active Developer">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Kashiling Kolekar
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                  Lead Architect & Creator
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 shrink-0 text-emerald-500" />
                Python Developer • Machine Learning & Data Science • Full Stack Architecture
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Final-Year B.Tech in Artificial Intelligence & Data Science
              </p>
            </div>
          </div>

          {/* Social / Connect Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 border border-slate-200 dark:border-slate-700"
              title="Copy developer email"
            >
              {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Email Copied!' : 'Email Me'}</span>
            </button>

            <a
              href="https://www.linkedin.com/in/kashiling-kolekar-6234a8368"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white text-xs font-bold transition-all active:scale-95 border border-blue-500/30"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              href="https://github.com/kolekarkashiling"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 border border-slate-700 shadow-sm"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Developer Mission Bio */}
        <div className="pt-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            I built <strong className="text-slate-900 dark:text-white">Agri Product Intelligence</strong> to bridge the gap between academic chemical literature and practical field farming. In India, smallholder farmers lose thousands of rupees every season due to chemical antagonism in tank mixtures (e.g. nozzle-clogging calcium precipitation, pH drift deactivating insecticides) and poor spray timing. By combining Python data pipelines, automated rule engines, and intuitive reactive interfaces, this platform turns complex agronomy into instant, actionable field decisions.
          </p>

          {/* Technical Skills Categorized Pills */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              Technical Stack & Domain Expertise
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {devSkills.map((group) => (
                <div key={group.category} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 mb-2">
                    {group.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. The 4 Core Architectural Pillars ───────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
              Core Architectural Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Four scientifically validated engines working synchronously
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" /> 100% Rule-Based Integrity
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`
                  p-6 rounded-3xl bg-white dark:bg-slate-900 border ${pillar.border}
                  shadow-xs hover-glow-card group transition-all duration-300 stagger-${idx + 1}
                `}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. Interactive Agronomy FAQ Accordion ─────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Agronomy & Tank-Mix Knowledge Base
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Frequently asked questions on chemical compatibility and spray science
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.q} className="py-3.5 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
                </button>

                {isOpen && (
                  <div className="mt-2.5 pl-4 pr-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in border-l-2 border-emerald-500/40 ml-1">
                    <p>{faq.a}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      Tag: {faq.tag}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Statutory Regulatory Governance ───────────────────────────────── */}
      <div className="rounded-3xl p-6 bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Legal Disclaimer & FCO 1985 Reference
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
              This system is an academic & agronomic decision-support platform. Always perform a physical jar test before mixing bulk spray tanks, follow registered container label directions, and consult a certified local agronomist.
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-500 text-white shadow-xs">
            v2.4 Verified
          </span>
        </div>
      </div>

    </div>
  );
};
