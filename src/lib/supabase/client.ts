import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing! Using placeholder for build.");
  }

  // Use placeholders to prevent build crash if env vars are missing
  const url = supabaseUrl || "https://placeholder.supabase.co";
  const key = supabaseKey || "placeholder-key";

  const client = createBrowserClient(url, key);
  
  return client
}
