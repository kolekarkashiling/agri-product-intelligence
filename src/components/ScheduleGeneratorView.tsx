import React, { useState, useEffect } from 'react';
import {
  CalendarClock, Save, Trash2, Plus, Calculator, CheckCircle2, ChevronDown,
  ChevronUp, Leaf, Cloud, Sparkles, Printer, Copy, AlertCircle, Droplets,
  Calendar, Layers, Check, ShieldCheck, IndianRupee
} from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { isSupabaseConfigured, saveCropScheduleToSupabase, getSavedCropSchedulesFromSupabase } from '../lib/supabase';

interface ScheduleGeneratorViewProps {
  language: Language;
}

export interface ScheduleRow {
  id: string;
  day: string;
  date: string;
  fertilizer: string;
  spray: string;
  mode: string;
  dose: string;
  cost: number | '';
}

export interface CropSchedule {
  id: string;
  cropName: string;
  rows: ScheduleRow[];
  isExpanded: boolean;
}

const modeOptions = [
  'Foliar Spray',
  'Drip Fertigation',
  'Soil Application',
  'Drenching',
  'Broadcasting'
];

// Pre-configured Expert Agricultural Schedules
const EXPERT_SCHEDULE_PRESETS: Record<string, { cropName: string; rows: Omit<ScheduleRow, 'id'>[] }> = {
  tomato: {
    cropName: 'Tomato (High-Yield 120-Day Program)',
    rows: [
      { day: 'Day 1 (Transplanting)', date: '', fertilizer: '12:61:00 (MAP) - Root Establisher', spray: 'Trichoderma viride root drench', mode: 'Drenching', dose: '3 kg / acre', cost: 750 },
      { day: 'Day 15 (Early Vegetative)', date: '', fertilizer: '19:19:19 Balanced NPK + Humic Acid', spray: 'Mancozeb 75% WP (Early Blight prevention)', mode: 'Drip Fertigation', dose: '4 kg / acre', cost: 1100 },
      { day: 'Day 30 (Vegetative & Branching)', date: '', fertilizer: '13:00:45 (Potassium Nitrate)', spray: 'Imidacloprid 17.8% SL (Whitefly / Aphid)', mode: 'Foliar Spray', dose: '1.5 kg / acre', cost: 850 },
      { day: 'Day 45 (Flower Bud Initiation)', date: '', fertilizer: '12:61:00 + Boron 20%', spray: 'Metalaxyl 8% + Mancozeb 64% WP', mode: 'Foliar Spray', dose: '2 kg / acre', cost: 1450 },
      { day: 'Day 60 (Fruit Setting & Sizing)', date: '', fertilizer: '00:52:34 (MKP) + Chelate Zinc 12%', spray: 'Chlorantraniliprole 18.5% SC (Fruit borer)', mode: 'Foliar Spray', dose: '2.5 kg / acre', cost: 2200 },
      { day: 'Day 75 (Fruit Development)', date: '', fertilizer: 'Calcium Nitrate + Boron', spray: 'Azoxystrobin 23% SC', mode: 'Drip Fertigation', dose: '5 kg / acre', cost: 1800 },
      { day: 'Day 90 (Color Break & Maturity)', date: '', fertilizer: '00:00:50 (SOP - Potassium Sulphate)', spray: 'Biological Spreader & Sticker', mode: 'Drip Fertigation', dose: '5 kg / acre', cost: 1650 }
    ]
  },
  grapes: {
    cropName: 'Grapes (Pruning to Harvest 130-Day Export)',
    rows: [
      { day: 'Day 1 (Foundation Pruning)', date: '', fertilizer: 'Basal FYM + DAP + SOP', spray: 'Hydrogen Cyanamide bud break spray', mode: 'Soil Application', dose: '50 kg / acre', cost: 3500 },
      { day: 'Day 20 (5-Leaf Stage)', date: '', fertilizer: '12:61:00 + Micronutrient Combo', spray: 'Mancozeb 75% WP + Bio-stimulant', mode: 'Foliar Spray', dose: '2 kg / acre', cost: 1400 },
      { day: 'Day 40 (Pre-Bloom / Inflorescence)', date: '', fertilizer: '00:52:34 (MKP) + Boron 20%', spray: 'Dimethomorph 50% WP (Downy Mildew control)', mode: 'Foliar Spray', dose: '2.5 kg / acre', cost: 2100 },
      { day: 'Day 65 (Berry Set - 4mm)', date: '', fertilizer: 'Gibberellic Acid (GA3) + 13:40:13', spray: 'Kresoxim-methyl 44.3% SC (Powdery Mildew)', mode: 'Foliar Spray', dose: '1.5 kg / acre', cost: 2800 },
      { day: 'Day 85 (Berry Sizing - 8mm)', date: '', fertilizer: 'Calcium Nitrate + Potassium Nitrate', spray: 'Spinetoram 11.7% SC (Thrips management)', mode: 'Drip Fertigation', dose: '6 kg / acre', cost: 3200 },
      { day: 'Day 110 (Veraison / Sugar Loading)', date: '', fertilizer: '00:00:50 (Potassium Sulphate)', spray: 'Potassium Silicate foliar coat', mode: 'Drip Fertigation', dose: '7 kg / acre', cost: 1950 }
    ]
  },
  cotton: {
    cropName: 'Cotton (Kapas Boll Maximizer 150-Day)',
    rows: [
      { day: 'Day 1 (Basal at Sowing)', date: '', fertilizer: 'DAP (18:46:0) + MOP + Zinc Sulphate', spray: 'Pre-emergence Pendimethalin 30% EC', mode: 'Soil Application', dose: '50 kg / acre', cost: 2800 },
      { day: 'Day 30 (Square Initiation)', date: '', fertilizer: '19:19:19 + Magnesium Sulphate', spray: 'Diafenthiuron 50% WP (Whitefly / Jassid)', mode: 'Foliar Spray', dose: '2 kg / acre', cost: 1250 },
      { day: 'Day 55 (Peak Flowering)', date: '', fertilizer: '13:00:45 + Planofix (NAA) anti-dropping', spray: 'Acephate 75% SP + Spreader', mode: 'Foliar Spray', dose: '2 kg / acre', cost: 1600 },
      { day: 'Day 80 (Boll Formation)', date: '', fertilizer: '00:52:34 + Boron 20%', spray: 'Flubendiamide 39.35% SC (Bollworm)', mode: 'Foliar Spray', dose: '2.5 kg / acre', cost: 2400 },
      { day: 'Day 110 (Boll Opening & Retaining)', date: '', fertilizer: '00:00:50 + Micronutrient Grade-II', spray: 'Biological prophylactic rinse', mode: 'Foliar Spray', dose: '2 kg / acre', cost: 1300 }
    ]
  }
};

export const ScheduleGeneratorView: React.FC<ScheduleGeneratorViewProps> = ({ language }) => {
  const [schedules, setSchedules] = useState<CropSchedule[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const t = TRANSLATIONS[language];

  // Load from localStorage or Supabase on mount
  useEffect(() => {
    let loaded = false;
    const savedData = localStorage.getItem('agri_multi_crop_schedules');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSchedules(parsed);
          loaded = true;
        }
      } catch (e) {
        console.error('Error parsing saved crop schedules', e);
      }
    }

    // Default to expert Tomato schedule if completely empty
    if (!loaded) {
      const defaultTomato: CropSchedule = {
        id: 'default-tomato-schedule',
        cropName: EXPERT_SCHEDULE_PRESETS.tomato.cropName,
        rows: EXPERT_SCHEDULE_PRESETS.tomato.rows.map((r, i) => ({ ...r, id: `tr-${i + 1}` })),
        isExpanded: true
      };
      setSchedules([defaultTomato]);
      localStorage.setItem('agri_multi_crop_schedules', JSON.stringify([defaultTomato]));
      loaded = true;
    }

    if (isSupabaseConfigured) {
      getSavedCropSchedulesFromSupabase().then((remoteSchedules) => {
        if (remoteSchedules && remoteSchedules.length > 0) {
          const formatted: CropSchedule[] = remoteSchedules.map((rs, idx) => ({
            id: rs.id || String(idx),
            cropName: rs.crop_name,
            rows: rs.rows || [],
            isExpanded: true
          }));
          setSchedules(formatted);
        }
      }).catch(err => console.warn('Supabase schedule load skipped:', err));
    }
  }, []);

  const handleSave = async () => {
    localStorage.setItem('agri_multi_crop_schedules', JSON.stringify(schedules));
    setIsSaved(true);

    if (isSupabaseConfigured && schedules.length > 0) {
      try {
        for (const schedule of schedules) {
          await saveCropScheduleToSupabase({
            crop_name: schedule.cropName,
            rows: schedule.rows,
            total_cost: calculateTotalCost(schedule.rows)
          });
        }
      } catch (err: any) {
        console.warn('Could not sync schedules to Supabase:', err.message);
      }
    }

    setTimeout(() => setIsSaved(false), 3000);
  };

  const createNewSchedule = () => {
    if (!newCropName.trim()) return;
    
    const newSchedule: CropSchedule = {
      id: Math.random().toString(36).substr(2, 9),
      cropName: newCropName.trim(),
      rows: [createEmptyRow()],
      isExpanded: true
    };
    
    setSchedules(prev => [newSchedule, ...prev]);
    setNewCropName('');
    setIsSaved(false);
  };

  const loadPreset = (presetKey: keyof typeof EXPERT_SCHEDULE_PRESETS) => {
    const preset = EXPERT_SCHEDULE_PRESETS[presetKey];
    if (!preset) return;

    const newSchedule: CropSchedule = {
      id: Math.random().toString(36).substr(2, 9),
      cropName: preset.cropName,
      rows: preset.rows.map((r, i) => ({ ...r, id: Math.random().toString(36).substr(2, 9) })),
      isExpanded: true
    };

    setSchedules(prev => [newSchedule, ...prev]);
    setIsSaved(false);
  };

  const createEmptyRow = (): ScheduleRow => ({
    id: Math.random().toString(36).substr(2, 9),
    day: 'Day 10',
    date: new Date().toISOString().split('T')[0],
    fertilizer: '19:19:19 Balanced NPK',
    spray: 'Mancozeb 75% WP',
    mode: 'Foliar Spray',
    dose: '2 kg / acre',
    cost: 1200
  });

  const addRowToSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return { ...schedule, rows: [...schedule.rows, createEmptyRow()] };
      }
      return schedule;
    }));
    setIsSaved(false);
  };

  const handleRowChange = (scheduleId: string, rowId: string, field: keyof ScheduleRow, value: string | number) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        const updatedRows: ScheduleRow[] = schedule.rows.map(row => {
          if (row.id === rowId) {
            if (field === 'cost') {
              const numVal = value === '' ? '' : Number(value);
              return { ...row, cost: isNaN(Number(numVal)) ? '' : numVal } as ScheduleRow;
            }
            return { ...row, [field]: String(value) } as ScheduleRow;
          }
          return row;
        });
        return { ...schedule, rows: updatedRows };
      }
      return schedule;
    }));
    setIsSaved(false);
  };

  const deleteRow = (scheduleId: string, rowId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return { ...schedule, rows: schedule.rows.filter(r => r.id !== rowId) };
      }
      return schedule;
    }));
    setIsSaved(false);
  };

  const deleteSchedule = (scheduleId: string, cropName: string) => {
    if (confirm(`Delete the entire spray schedule for "${cropName}"?`)) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
      setIsSaved(false);
    }
  };

  const toggleScheduleExpansion = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return { ...schedule, isExpanded: !schedule.isExpanded };
      }
      return schedule;
    }));
  };

  const calculateTotalCost = (rows: ScheduleRow[]) => {
    return rows.reduce((acc, row) => {
      const costValue = typeof row.cost === 'number' ? row.cost : parseFloat(row.cost as string) || 0;
      return acc + costValue;
    }, 0);
  };

  const totalApplications = schedules.reduce((sum, s) => sum + s.rows.length, 0);
  const totalCombinedBudget = schedules.reduce((sum, s) => sum + calculateTotalCost(s.rows), 0);

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Foliar Spray': return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'Drip Fertigation': return 'bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800';
      case 'Soil Application': return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Drenching': return 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-6xl mx-auto w-full">
      
      {/* ── 1. Top Flagship Command Banner ──────────────────────── */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-teal-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-black uppercase tracking-wider border border-indigo-400/30">
            <CalendarClock className="w-4 h-4 text-indigo-400" />
            <span>FLAGSHIP CORE #2 • CROP SPRAY & FERTIGATION CALENDAR</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Crop Schedule & <span className="text-gradient-agri">Spray Planner</span>
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/85 font-medium leading-relaxed max-w-2xl">
            Build day-by-day precision schedules covering basal dressing, vegetative fertigation, flowering sprays, pest protection, and maturity flushes. Calculate costs automatically per acre.
          </p>

          {/* KPI Telemetry Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-indigo-300 stat-number">{schedules.length}</div>
              <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mt-0.5">Active Crops</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 stat-number">{totalApplications}</div>
              <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mt-0.5">Total Sprays</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-teal-300 stat-number">₹{totalCombinedBudget.toLocaleString('en-IN')}</div>
              <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mt-0.5">Est. Budget / Acre</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 hover-glow-card">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 stat-number">{isSaved ? 'Synced' : 'Auto'}</div>
              <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider mt-0.5">Local + Cloud</div>
            </div>
          </div>

          {/* Quick Expert Presets Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> One-Click Expert Templates:
            </span>
            <button
              onClick={() => loadPreset('tomato')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all hover:scale-105"
            >
              + Tomato (120-Day)
            </button>
            <button
              onClick={() => loadPreset('grapes')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all hover:scale-105"
            >
              + Grapes (130-Day Export)
            </button>
            <button
              onClick={() => loadPreset('cotton')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-all hover:scale-105"
            >
              + Cotton (150-Day)
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. Create Schedule & Global Controls Bar ───────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full flex items-center gap-3">
          <div className="relative flex-1">
            <Leaf className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <input
              type="text"
              value={newCropName}
              onChange={(e) => setNewCropName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewSchedule()}
              placeholder="Enter crop name to build schedule (e.g., Pomegranate, Sugarcane, Chilli)..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
            />
          </div>
          <button
            onClick={createNewSchedule}
            disabled={!newCropName.trim()}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={() => window.print()}
            className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
            title="Print schedule for farm use"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Schedule</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 ${
              isSaved
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Saved to Cloud & Storage!' : 'Save All Schedules'}</span>
          </button>
        </div>
      </div>

      {/* ── 3. Schedule Cards List ─────────────────────────────── */}
      <div className="space-y-6">
        {schedules.map((schedule) => {
          const scheduleCost = calculateTotalCost(schedule.rows);

          return (
            <div
              key={schedule.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300"
            >
              {/* Header Accordion */}
              <div
                onClick={() => toggleScheduleExpansion(schedule.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white">
                      {schedule.cropName}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                      {schedule.rows.length} Growth Stages • Total Planned Cost: <strong className="text-emerald-600 dark:text-emerald-400">₹{scheduleCost.toLocaleString('en-IN')}</strong> / acre
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addRowToSchedule(schedule.id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Stage
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSchedule(schedule.id, schedule.cropName);
                    }}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                    title="Delete entire schedule"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    {schedule.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Table & Application Cards */}
              {schedule.isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/30 space-y-4">
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
                    <table className="w-full text-left border-collapse min-w-[850px]">
                      <thead>
                        <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <th className="p-3 w-40">Day / Stage</th>
                          <th className="p-3 w-36">Scheduled Date</th>
                          <th className="p-3">Nutrient / Fertilizer</th>
                          <th className="p-3">Crop Protection Spray</th>
                          <th className="p-3 w-36">Mode</th>
                          <th className="p-3 w-28">Dose / Acre</th>
                          <th className="p-3 w-28 text-right">Cost (₹)</th>
                          <th className="p-3 w-10 text-center"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70 text-xs">
                        {schedule.rows.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                            {/* Day / Stage */}
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={row.day}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'day', e.target.value)}
                                placeholder="Day 15 (Branching)"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Scheduled Date */}
                            <td className="p-2.5">
                              <input
                                type="date"
                                value={row.date}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'date', e.target.value)}
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 focus:outline-none"
                              />
                            </td>

                            {/* Fertilizer / Nutrient */}
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={row.fertilizer}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'fertilizer', e.target.value)}
                                placeholder="19:19:19 + Humic Acid"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Pesticide / Spray */}
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={row.spray}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'spray', e.target.value)}
                                placeholder="Mancozeb 75% WP"
                                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                              />
                            </td>

                            {/* Mode with badge */}
                            <td className="p-2.5">
                              <select
                                value={row.mode}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'mode', e.target.value)}
                                className={`w-full px-2 py-1.5 rounded-lg border font-bold text-xs focus:outline-none cursor-pointer ${getModeColor(row.mode)}`}
                              >
                                {modeOptions.map((m) => (
                                  <option key={m} value={m} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                                    {m}
                                  </option>
                                ))}
                              </select>
                            </td>

                            {/* Dose */}
                            <td className="p-2.5">
                              <input
                                type="text"
                                value={row.dose}
                                onChange={(e) => handleRowChange(schedule.id, row.id, 'dose', e.target.value)}
                                placeholder="2 kg / acre"
                                className="w-full px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-300 focus:outline-none text-center"
                              />
                            </td>

                            {/* Cost */}
                            <td className="p-2.5 text-right">
                              <div className="relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">₹</span>
                                <input
                                  type="number"
                                  value={row.cost}
                                  onChange={(e) => handleRowChange(schedule.id, row.id, 'cost', e.target.value)}
                                  placeholder="1200"
                                  className="w-full pl-5 pr-2 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-black text-emerald-600 dark:text-emerald-400 focus:outline-none text-right"
                                />
                              </div>
                            </td>

                            {/* Delete row */}
                            <td className="p-2 text-center">
                              <button
                                onClick={() => deleteRow(schedule.id, row.id)}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                title="Delete row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Add Row Button Strip */}
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/60">
                      <button
                        onClick={() => addRowToSchedule(schedule.id)}
                        className="px-4 py-2 rounded-xl text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Spray Application Stage
                      </button>

                      <div className="text-xs font-black text-slate-700 dark:text-slate-200">
                        Subtotal Budget: <span className="text-emerald-600 dark:text-emerald-400 text-sm">₹{scheduleCost.toLocaleString('en-IN')}</span> / acre
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
