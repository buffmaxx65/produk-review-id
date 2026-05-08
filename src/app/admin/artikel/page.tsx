import Link from "next/link";
import { Plus, ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getAllReviews } from "@/lib/reviews";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminArtikelPage() {
  await requireAdmin();
  const reviews = getAllReviews();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-900">
            Artikel Review
          </h1>
          <p className="text-sm text-ink-600">
            Sumber utama: file MDX di <code>content/reviews/</code>. Kamu juga
            bisa menambah dari Supabase (tabel <code>posts</code>).
          </p>
        </div>
        <Link href="/admin/artikel/baru" className="btn btn-primary">
          <Plus className="h-4 w-4" /> Artikel Baru
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-ink-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Judul
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Kategori
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Rating
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-ink-600">
                Tanggal
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-ink-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {reviews.map((r) => (
              <tr key={r.slug}>
                <td className="px-4 py-3">
                  <Link
                    href={`/review/${r.slug}`}
                    target="_blank"
                    className="font-medium text-ink-900 hover:text-brand-700"
                  >
                    {r.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-700">{r.category}</td>
                <td className="px-4 py-3 text-ink-700">
                  {r.rating.toFixed(1)} / 5
                </td>
                <td className="px-4 py-3 text-ink-500">
                  {formatDate(r.date)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/review/${r.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm text-brand-700 hover:underline"
                  >
                    Lihat
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
