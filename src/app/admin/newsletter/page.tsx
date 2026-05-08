import { requireAdmin } from "@/lib/admin";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Subscriber = {
  id: string;
  email: string;
  created_at: string;
};

export default async function NewsletterAdminPage() {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  let subs: Subscriber[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    subs = (data ?? []) as Subscriber[];
  }
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink-900">
        Newsletter Subscribers
      </h1>
      <p className="mt-1 text-sm text-ink-600">
        Total: {subs.length.toLocaleString("id-ID")} subscriber
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Tanggal Daftar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {subs.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 text-ink-900">{s.email}</td>
                <td className="px-4 py-3 text-ink-500">
                  {new Date(s.created_at).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {subs.length === 0 ? (
              <tr>
                <td colSpan={2} className="px-4 py-10 text-center text-ink-500">
                  Belum ada subscriber.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
