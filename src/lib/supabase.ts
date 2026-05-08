// Aman digunakan dari client maupun server (tidak meng-import next/headers).
// Untuk server-only client (cookie session), gunakan @/lib/supabase-server.
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON);
}

/** Browser client (auth, sign in/out, dll). */
export function getSupabaseBrowser() {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase tidak terkonfigurasi. Atur env NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON);
}

/** Service-role client (server-only insert / admin queries). */
export function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });
}
