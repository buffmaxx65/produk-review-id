import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "./supabase";
import { getSupabaseServer } from "./supabase-server";

export type AdminSession =
  | { mode: "supabase"; email: string }
  | { mode: "demo" };

/**
 * Pastikan user terautentikasi sebagai admin.
 *
 * Mode Supabase: cek session + email di whitelist ADMIN_EMAILS.
 * Mode Demo: jika Supabase tidak terkonfigurasi (mis. dev local), izinkan
 * akses agar bisa preview dashboard, tapi tampilkan banner peringatan.
 */
export async function requireAdmin(): Promise<AdminSession> {
  if (!isSupabaseConfigured()) {
    return { mode: "demo" };
  }
  const supabase = getSupabaseServer();
  if (!supabase) return { mode: "demo" };
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) {
    redirect("/admin/login");
  }
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const email = (user.email ?? "").toLowerCase();
  if (allowed.length && !allowed.includes(email)) {
    redirect("/admin/login?error=forbidden");
  }
  return { mode: "supabase", email };
}
