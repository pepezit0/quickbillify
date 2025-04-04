
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client - these would ideally be environment variables
export const supabaseUrl = 'https://supabase-project-url.supabase.co';
export const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
