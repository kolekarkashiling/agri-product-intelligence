import React, { useState, useEffect } from 'react';
import { CalendarClock, Save, Trash2, Plus, Calculator, CheckCircle2, ChevronDown, ChevronUp, Leaf, Cloud } from 'lucide-react';
import { Language } from '../types/agri';
import { TRANSLATIONS } from '../data/translations';
import { isSupabaseConfigured, saveCropScheduleToSupabase, getSavedCropSchedulesFromSupabase } from '../lib/supabase';

interface ScheduleGeneratorViewProps {
  language: Language;
}

interface ScheduleRow {
  id: string;
  day: string;
  date: string;
  fertilizer: string;
  spray: string;
  mode: string;
  dose: string;
  cost: number | '';
}

interface CropSchedule {
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

    if (!loaded && isSupabaseConfigured) {
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
        console.warn('Could not sync schedules to Supabase (run supabase_schema.sql if table is missing):', err.message);
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

  const createEmptyRow = (): ScheduleRow => ({
    id: Math.random().toString(36).substr(2, 9),
    day: '',
    date: '',
    fertilizer: '',
    spray: '',
    mode: 'Foliar Spray',
    dose: '',
    cost: ''
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
    if (confirm(`Are you sure you want to completely delete the schedule for "${cropName}"?`)) {
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

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t.schedule_generator_title || 'Crop Schedule Builder'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {t.schedule_generator_subtitle || 'Create and manage independent day-wise schedules for multiple crops.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                isSaved 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaved ? (t.schedule_saved || 'All Schedules Saved!') : (t.schedule_save || 'Save All Schedules')}
            </button>
          </div>
        </div>

        {/* Create New Crop Input */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Leaf className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={newCropName}
              onChange={(e) => setNewCropName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createNewSchedule()}
              placeholder={t.schedule_crop_name ? `${t.schedule_crop_name} (e.g., Watermelon, Tomato, Onion)` : 'Enter crop name (e.g., Watermelon, Tomato, Onion)'}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all dark:text-white"
            />
          </div>
          <button
            onClick={createNewSchedule}
            disabled={!newCropName.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black rounded-xl text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> {t.schedule_add_crop || 'Create Schedule'}
          </button>
        </div>
      </div>

      {schedules.length === 0 && (
        <div className="bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <CalendarClock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">{t.schedule_no_crops ? t.schedule_no_crops.split('.')[0] : 'No Schedules Yet'}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto">
            {t.schedule_no_crops || 'Enter a crop name above and click "Create Schedule" to start building your first day-wise application plan.'}
          </p>
        </div>
      )}

      {/* List of Schedules */}
      {schedules.map((schedule) => (
        <div key={schedule.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden animate-slide-up">
          
          {/* Schedule Header / Accordion Toggle */}
          <div 
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200 dark:border-slate-800"
            onClick={() => toggleScheduleExpansion(schedule.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {schedule.cropName} Schedule
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {schedule.rows.length} Applications • Est. ₹{calculateTotalCost(schedule.rows).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSchedule(schedule.id, schedule.cropName);
                }}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                title="Delete Entire Schedule"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full">
                {schedule.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          {schedule.isExpanded && (
            <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/20">
              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mb-6 relative">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">{t.schedule_day || 'Day'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">{t.schedule_date || 'Date'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.schedule_fertilizer || 'Fertilizer'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.schedule_spray || 'Spray'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">{t.schedule_mode || 'Mode'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-24">{t.schedule_dose || 'Dose'}</th>
                      <th className="p-3 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-28">{t.schedule_cost || 'Cost (₹)'}</th>
                      <th className="p-3 w-12 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {schedule.rows.map((row) => (
                      <tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-1.5 align-top">
                          <input
                            type="text"
                            value={row.day}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'day', e.target.value)}
                            placeholder="15"
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                          />
                        </td>
                        <td className="p-1.5 align-top">
                          <input
                            type="date"
                            value={row.date}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'date', e.target.value)}
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-slate-100"
                          />
                        </td>
                        <td className="p-1.5 align-top">
                          <textarea
                            value={row.fertilizer}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'fertilizer', e.target.value)}
                            placeholder="e.g. 19:19:19"
                            rows={1}
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 resize-none overflow-hidden"
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = target.scrollHeight + 'px';
                            }}
                          />
                        </td>
                        <td className="p-1.5 align-top">
                          <textarea
                            value={row.spray}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'spray', e.target.value)}
                            placeholder="e.g. Mancozeb"
                            rows={1}
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 resize-none overflow-hidden"
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = target.scrollHeight + 'px';
                            }}
                          />
                        </td>
                        <td className="p-1.5 align-top">
                          <select
                            value={row.mode}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'mode', e.target.value)}
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm text-slate-900 dark:text-slate-100 cursor-pointer"
                          >
                            {modeOptions.map(mode => (
                              <option key={mode} value={mode} className="dark:bg-slate-900">{mode}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-1.5 align-top">
                          <input
                            type="text"
                            value={row.dose}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'dose', e.target.value)}
                            placeholder="2 kg"
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                          />
                        </td>
                        <td className="p-1.5 align-top">
                          <input
                            type="number"
                            value={row.cost}
                            onChange={(e) => handleRowChange(schedule.id, row.id, 'cost', e.target.value)}
                            placeholder="1200"
                            className="w-full px-2 py-2 bg-transparent border-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg text-sm font-bold text-emerald-600 dark:text-emerald-400 placeholder:text-slate-400"
                          />
                        </td>
                        <td className="p-2 align-top text-center">
                          <button
                            onClick={() => deleteRow(schedule.id, row.id)}
                            className="p-1.5 mt-0.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Row"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Add Row Button */}
                <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-center bg-slate-50/50 dark:bg-slate-900/50">
                  <button
                    onClick={() => addRowToSchedule(schedule.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400 dark:hover:bg-indigo-900/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> {t.schedule_add_row || 'Add Application Row'}
                  </button>
                </div>
              </div>
              
              {/* Footer Stats for this specific schedule */}
              <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 px-5 py-3 flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-full bg-emerald-200 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <span className="font-black text-sm">₹</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wider mb-0.5">
                      {schedule.cropName} Total Cost
                    </p>
                    <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                      ₹ {calculateTotalCost(schedule.rows).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default ScheduleGeneratorView;
