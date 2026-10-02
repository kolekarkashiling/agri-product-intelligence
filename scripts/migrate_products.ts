import { createClient } from '@supabase/supabase-js';
import { AGRI_PRODUCTS } from '../src/data/products';
import { mapAgriProductToDb } from '../src/services/product.service';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log(`Starting migration of ${AGRI_PRODUCTS.length} products...`);
  
  const dbProducts = AGRI_PRODUCTS.map(mapAgriProductToDb);
  
  // Insert in chunks of 50 to avoid payload size issues
  const chunkSize = 50;
  for (let i = 0; i < dbProducts.length; i += chunkSize) {
    const chunk = dbProducts.slice(i, i + chunkSize);
    console.log(`Inserting chunk ${i / chunkSize + 1} (${chunk.length} products)...`);
    
    const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'id' });
    if (error) {
      console.error('Error during migration:', error);
      return;
    }
  }
  
  console.log('Migration completed successfully!');
}

migrate();
