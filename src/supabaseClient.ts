import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';

type SupabaseConfig = {
  supabaseUrl: string;
  supabaseKey: string;
};

const supabaseConfig: SupabaseConfig = {
  supabaseUrl: process.env.REACT_APP_SB_URL || '',
  supabaseKey: process.env.REACT_APP_SB_API_KEY || ''
};

const supabase = createClient<Database>(supabaseConfig.supabaseUrl, supabaseConfig.supabaseKey);

export default supabase;
