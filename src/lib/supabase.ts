import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables provided via Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-ref')
);

// Fallback dummy client if credentials are not yet supplied
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  }
);

export interface ConnectionStatus {
  connected: boolean;
  message: string;
  url?: string;
  latencyMs?: number;
}

/**
 * Checks the connection to the Supabase backend.
 */
export async function checkSupabaseConnection(): Promise<ConnectionStatus> {
  if (!isSupabaseConfigured) {
    return {
      connected: false,
      message: 'Supabase credentials missing or placeholder in .env'
    };
  }

  const start = performance.now();
  try {
    // Attempt a light ping by querying auth or health
    const { error } = await supabase.from('saved_tank_mixes').select('id').limit(1);
    const latencyMs = Math.round(performance.now() - start);

    if (error) {
      // If table doesn't exist yet (PGRST204 or PGRST116), the database connection itself still succeeded!
      if (
        error.code === 'PGRST204' ||
        error.code === 'PGRST205' ||
        error.code === '42P01' || // relation does not exist
        error.message?.includes('does not exist') ||
        error.message?.includes('schema cache')
      ) {
        return {
          connected: true,
          message: 'Connected to Supabase project! (Database tables need initialization - run supabase_schema.sql)',
          url: supabaseUrl,
          latencyMs
        };
      }

      // If invalid API key
      if (error.code === 'PGRST301' || error.message?.includes('JWT')) {
        return {
          connected: false,
          message: `Authentication error: ${error.message}`,
          url: supabaseUrl
        };
      }

      return {
        connected: true,
        message: `Connected (${error.message})`,
        url: supabaseUrl,
        latencyMs
      };
    }

    return {
      connected: true,
      message: 'Connected successfully to Supabase backend!',
      url: supabaseUrl,
      latencyMs
    };
  } catch (err: any) {
    return {
      connected: false,
      message: err?.message || 'Network error connecting to Supabase',
      url: supabaseUrl
    };
  }
}

// -------------------------------------------------------------
// Database Operations: Tank Mixes
// -------------------------------------------------------------
export interface SavedTankMixRecord {
  id?: string;
  mix_name: string;
  overall_status: string;
  safety_score: number;
  products: any[];
  critical_warnings?: string[];
  conditional_notes?: string[];
  notes?: string;
  created_at?: string;
}

export async function saveTankMixToSupabase(mix: SavedTankMixRecord) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('saved_tank_mixes')
    .insert([mix])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSavedTankMixesFromSupabase(): Promise<SavedTankMixRecord[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('saved_tank_mixes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Failed to load saved tank mixes from Supabase:', error.message);
    return [];
  }
  return data || [];
}

export async function deleteSavedTankMixFromSupabase(id: string) {
  if (!isSupabaseConfigured) return;

  const { error } = await supabase
    .from('saved_tank_mixes')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// -------------------------------------------------------------
// Database Operations: Crop Schedules
// -------------------------------------------------------------
export interface SavedCropScheduleRecord {
  id?: string;
  crop_name: string;
  rows: any[];
  total_cost?: number;
  created_at?: string;
}

export async function saveCropScheduleToSupabase(schedule: SavedCropScheduleRecord) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  const { data, error } = await supabase
    .from('saved_schedules')
    .insert([schedule])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSavedCropSchedulesFromSupabase(): Promise<SavedCropScheduleRecord[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('saved_schedules')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Failed to load schedules from Supabase:', error.message);
    return [];
  }
  return data || [];
}

// -------------------------------------------------------------
// Authentication Operations
// -------------------------------------------------------------
export async function signUpUser(email: string, password: string, fullName?: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || ''
      }
    }
  });
  if (error) throw error;
  return data;
}

export async function signInUser(email: string, password: string) {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

export async function signOutUser() {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

