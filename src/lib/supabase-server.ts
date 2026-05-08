import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** Server component / route handler client (membaca cookie session). */
export function getSupabaseServer() {
  if (!SUPABASE_URL || !SUPABASE_ANON) return null;
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set() {
        // RSC tidak bisa set cookie; biarkan no-op.
      },
      remove() {},
    },
  });
}
