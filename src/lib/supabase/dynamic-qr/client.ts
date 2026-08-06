import { createBrowserClient } from "@supabase/ssr";

/** Dynamic QR — Supabase project: see supabase/dynamic-qr/ */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL or NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY",
    );
  }

  return createBrowserClient(url, key);
}

export function isDynamicQrSupabaseConfigured() {
  return (
    Boolean(process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY)
  );
}
