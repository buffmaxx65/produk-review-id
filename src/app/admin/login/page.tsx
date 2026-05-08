import Link from "next/link";
import { LoginForm } from "./login-form";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="container max-w-md py-16">
      <div className="rounded-2xl border border-ink-200 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-bold text-ink-900">Login Admin</h1>
        <p className="mt-1 text-sm text-ink-600">
          Masuk dengan akun Supabase yang ada di whitelist <code>ADMIN_EMAILS</code>.
        </p>
        {!isSupabaseConfigured() ? (
          <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
            Supabase belum dikonfigurasi. Atur env terlebih dahulu (lihat{" "}
            <code>.env.example</code>).
          </div>
        ) : null}
        {searchParams.error === "forbidden" ? (
          <div className="mt-4 rounded-lg border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900">
            Email kamu tidak terdaftar sebagai admin.
          </div>
        ) : null}
        <LoginForm />
        <p className="mt-6 text-center text-xs text-ink-500">
          <Link href="/" className="hover:text-brand-700">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
