import { TrendingUp, MousePointerClick, Mail, FileText } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getAllReviews } from "@/lib/reviews";

export const dynamic = "force-dynamic";

type Stats = {
  totalClicks: number;
  clicksLast7d: number;
  totalSubscribers: number;
  topAffiliates: { affiliate_id: string; clicks: number }[];
};

async function getStats(): Promise<Stats> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return {
      totalClicks: 0,
      clicksLast7d: 0,
      totalSubscribers: 0,
      topAffiliates: [],
    };
  }
  const [{ count: totalClicks }, { count: subs }, last7] = await Promise.all([
    supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true }),
    supabase.from("subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("affiliate_clicks")
      .select("*", { count: "exact", head: true })
      .gte(
        "created_at",
        new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      ),
  ]);
  const { data: groups } = await supabase
    .from("affiliate_clicks")
    .select("affiliate_id")
    .limit(1000);
  const counts = new Map<string, number>();
  (groups ?? []).forEach((row: { affiliate_id: string }) => {
    counts.set(row.affiliate_id, (counts.get(row.affiliate_id) ?? 0) + 1);
  });
  const topAffiliates = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([affiliate_id, clicks]) => ({ affiliate_id, clicks }));
  return {
    totalClicks: totalClicks ?? 0,
    clicksLast7d: last7.count ?? 0,
    totalSubscribers: subs ?? 0,
    topAffiliates,
  };
}

export default async function AdminDashboard() {
  const session = await requireAdmin();
  const stats = await getStats();
  const reviews = getAllReviews();

  return (
    <div>
      {session.mode === "demo" ? (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Mode Demo</strong>: Supabase belum dikonfigurasi. Atur{" "}
          <code>.env.local</code> dan jalankan migration SQL di
          <code> supabase/schema.sql</code> untuk mengaktifkan login dan
          tracking.
        </div>
      ) : null}

      <h1 className="font-serif text-3xl font-bold text-ink-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-600">
        Ringkasan performa affiliate dan konten kamu.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={MousePointerClick}
          label="Total klik affiliate"
          value={stats.totalClicks.toLocaleString("id-ID")}
        />
        <StatCard
          icon={TrendingUp}
          label="Klik 7 hari terakhir"
          value={stats.clicksLast7d.toLocaleString("id-ID")}
        />
        <StatCard
          icon={Mail}
          label="Subscribers"
          value={stats.totalSubscribers.toLocaleString("id-ID")}
        />
        <StatCard
          icon={FileText}
          label="Total review"
          value={reviews.length.toString()}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-ink-900">
            Top Affiliate Links
          </h2>
          <p className="text-xs text-ink-500">
            Link dengan jumlah klik terbanyak.
          </p>
          {stats.topAffiliates.length === 0 ? (
            <p className="mt-6 rounded-lg bg-ink-50 p-4 text-sm text-ink-500">
              Belum ada klik tercatat. Setelah Supabase aktif, data akan muncul
              di sini.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-ink-100">
              {stats.topAffiliates.map((a) => (
                <li
                  key={a.affiliate_id}
                  className="flex items-center justify-between py-3"
                >
                  <code className="text-sm text-ink-800">
                    {a.affiliate_id}
                  </code>
                  <span className="text-sm font-semibold text-brand-700">
                    {a.clicks} klik
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-ink-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-ink-900">
            Review Terbaru
          </h2>
          <ul className="mt-4 divide-y divide-ink-100">
            {reviews.slice(0, 5).map((r) => (
              <li
                key={r.slug}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="line-clamp-1 text-sm font-medium text-ink-900">
                    {r.title}
                  </p>
                  <p className="text-xs text-ink-500">{r.category}</p>
                </div>
                <span className="text-xs text-ink-500">{r.author}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-ink-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold text-ink-900">{value}</p>
    </div>
  );
}
