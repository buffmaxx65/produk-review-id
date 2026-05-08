import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: { email?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }
  const email = (payload.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Email tidak valid" },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    // Tanpa Supabase, tetap return success (dev mode).
    return NextResponse.json({
      ok: true,
      message:
        "Berhasil! (Dev mode — Supabase belum dikonfigurasi, email tidak disimpan).",
    });
  }

  const { error } = await supabase
    .from("subscribers")
    .insert({ email })
    .select()
    .single();
  if (error) {
    // Code 23505 = unique violation
    if ((error as { code?: string }).code === "23505") {
      return NextResponse.json({
        ok: true,
        message: "Email kamu sudah terdaftar. Terima kasih!",
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    message: "Berhasil! Cek inbox kamu untuk konfirmasi.",
  });
}
