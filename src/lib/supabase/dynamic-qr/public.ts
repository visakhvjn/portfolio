import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-less Supabase client for anonymous /r/[slug] redirects.
 * Avoids SSR session cookies so scanners always hit RLS as anon.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL;
  const serviceKey = process.env.DYNAMIC_QR_SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY;
  const key = serviceKey ?? anonKey;

  if (!url || !key) {
    throw new Error(
      "Missing Dynamic QR Supabase env (NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL and anon or service role key)",
    );
  }

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
