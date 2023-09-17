import { createClient } from '@supabase/supabase-js';

const sburl = import.meta.env.VITE_SUPABASE_URL;
const sbanonkey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(sburl, sbanonkey);
