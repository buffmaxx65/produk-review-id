import { Breadcrumb } from "@/components/Breadcrumb";
import { ReviewCard } from "@/components/ReviewCard";
import { getAllReviews } from "@/lib/reviews";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cari Review",
  description: "Cari review produk berdasarkan nama atau brand.",
  path: "/cari",
});

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? "").trim().toLowerCase();
  const all = getAllReviews();
  const results = q
    ? all.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.productName.toLowerCase().includes(q) ||
          r.brand.toLowerCase().includes(q) ||
          (r.tags ?? []).some((t) => t.toLowerCase().includes(q)),
      )
    : all;

  return (
    <section className="section">
      <div className="container">
        <Breadcrumb items={[{ name: "Cari" }]} />
        <h1 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
          {q ? `Hasil pencarian: "${q}"` : "Cari Review"}
        </h1>

        <form className="mt-6" method="get">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Cari produk, brand, atau topik..."
            className="w-full max-w-lg rounded-lg border border-ink-200 bg-white px-4 py-3 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </form>

        <p className="mt-4 text-sm text-ink-500">
          {results.length} review ditemukan
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <ReviewCard key={r.slug} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
