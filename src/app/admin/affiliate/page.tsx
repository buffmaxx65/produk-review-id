import { requireAdmin } from "@/lib/admin";
import { affiliateLinks } from "@/data/affiliate.config";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getClickCounts(): Promise<Record<string, number>> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return {};
  const { data } = await supabase
    .from("affiliate_clicks")
    .select("affiliate_id");
  const counts: Record<string, number> = {};
  (data ?? []).forEach((row: { affiliate_id: string }) => {
    counts[row.affiliate_id] = (counts[row.affiliate_id] ?? 0) + 1;
  });
  return counts;
}

export default async function AffiliateAdminPage() {
  await requireAdmin();
  const counts = await getClickCounts();
  const list = Object.values(affiliateLinks);
  const totalClicks = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink-900">
        Manajemen Affiliate
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        Daftar link affiliate aktif. Untuk menambah/edit, ubah file{" "}
        <code>src/data/affiliate.config.ts</code> lalu push ke git.
      </p>

      <div className="mt-4 inline-flex rounded-lg bg-brand-100 px-3 py-1.5 text-sm font-semibold text-brand-800">
        Total klik tercatat: {totalClicks.toLocaleString("id-ID")}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Network
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Label
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Harga
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Klik
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Test
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {list.map((l) => (
              <tr key={l.id}>
                <td className="px-4 py-3 font-mono text-xs text-ink-800">
                  {l.id}
                </td>
                <td className="px-4 py-3 text-ink-700">{l.network}</td>
                <td className="px-4 py-3 text-ink-900">{l.label}</td>
                <td className="px-4 py-3 text-ink-700">{l.price ?? "-"}</td>
                <td className="px-4 py-3 font-semibold text-brand-700">
                  {(counts[l.id] ?? 0).toLocaleString("id-ID")}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`/api/track/${l.id}?source=admin-test`}
                    target="_blank"
                    rel="noopener nofollow"
                    className="text-xs text-brand-700 hover:underline"
                  >
                    Test redirect →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
