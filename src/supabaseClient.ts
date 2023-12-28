import { createClient } from '@supabase/supabase-js';

if (!process.env.REACT_APP_SB_URL || !process.env.REACT_APP_SB_API_KEY) {
  throw new Error('환경 변수가 설정되지 않았습니다.');
}

const supabaseUrl = process.env.REACT_APP_SB_URL;
const supabaseKey = process.env.REACT_APP_SB_API_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
