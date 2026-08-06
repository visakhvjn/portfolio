import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Dynamic QR — Supabase project: see supabase/dynamic-qr/ */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_URL or NEXT_PUBLIC_DYNAMIC_QR_SUPABASE_ANON_KEY",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — safe to ignore when middleware refreshes sessions.
        }
      },
    },
  });
}
