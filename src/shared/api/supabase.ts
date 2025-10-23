import { createClient } from '@supabase/supabase-js';

import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from 'shared/config/environment';
import { storage } from 'shared/model';

import { Cache } from './cache';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: new Cache(storage),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
