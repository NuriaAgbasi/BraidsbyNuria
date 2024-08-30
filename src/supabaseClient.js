

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dlwxcppypoesugpvbhdd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsd3hjcHB5cG9lc3VncHZiaGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2Mzg2MTUsImV4cCI6MjA0MDIxNDYxNX0.OGaBycD3vEO8wwvYX_4wsyNq8lu6TsFZLwtriD7ybxo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
