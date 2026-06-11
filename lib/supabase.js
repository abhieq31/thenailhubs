import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client. Returns null when the project isn't
// configured yet — API routes then answer 503 and the chat receptionist
// falls back to WhatsApp booking, so the site never breaks.
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const NOT_CONFIGURED = {
  status: 503,
  body: { detail: 'Booking system is not configured yet. Please book via WhatsApp.' },
};
