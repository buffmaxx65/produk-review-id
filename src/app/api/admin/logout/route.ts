import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const supabase = getSupabaseServer();
  if (supabase) {
    await supabase.auth.signOut();
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}
