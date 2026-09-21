import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...');
console.log('URL:', url);
console.log('Key prefix:', key ? key.substring(0, 20) + '...' : 'NONE');

if (!url || !key) {
  console.error('Missing Supabase URL or Key in environment variables.');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  try {
    const start = Date.now();
    const { data, error } = await supabase.from('saved_tank_mixes').select('*').limit(1);
    const latency = Date.now() - start;

    if (error) {
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        console.log(`[SUCCESS] Connected to Supabase in ${latency}ms!`);
        console.log('Note: "saved_tank_mixes" table does not exist yet. Please run supabase_schema.sql in the SQL editor.');
      } else {
        console.log(`[WARNING] Supabase responded with error (${error.code}): ${error.message}`);
      }
    } else {
      console.log(`[SUCCESS] Connected to Supabase in ${latency}ms! Found ${data.length} records in saved_tank_mixes.`);
    }
  } catch (err: any) {
    console.error('[ERROR] Failed to reach Supabase:', err.message);
  }
}

test();
