import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Newsletter } from "@/components/Newsletter";
import { AdSlot } from "@/components/AdSlot";
import {
  getAllReviews,
  getFeaturedReviews,
  getTrendingReviews,
} from "@/lib/reviews";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Produk Review ID — Review jujur, rekomendasi terbaik",
  description:
    "Temukan review produk teknologi, kecantikan, kesehatan, rumah tangga, dan fashion yang jujur, mendalam, dan terpercaya. Update setiap minggu dari editor kami.",
  path: "/",
});

export default function HomePage() {
  const all = getAllReviews();
  const featured = getFeaturedReviews(4);
  const trending = getTrendingReviews(6);
  const latest = all.slice(0, 6);
  const heroPick = featured[0] ?? all[0];

  if (!heroPick) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Belum ada review</h1>
        <p className="mt-2 text-ink-600">
          Tambahkan file MDX di /content/reviews untuk memulai.
        </p>
      </div>
    );
  }

  return (
    <>
      <Hero featured={heroPick} />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Jelajah"
            title="Pilih kategori favoritmu"
            description="Setiap kategori punya tim editor yang khusus menguji produknya. Pilih sesuai minatmu."
          />
          <CategoryGrid />
        </div>
      </section>

      <section id="editor-pick" className="section bg-ink-50/60">
        <div className="container">
          <SectionHeading
            eyebrow="Editor's Pick"
            title="Pilihan terbaik dari editor kami"
            description="Setelah ratusan jam pengujian, ini adalah produk yang paling kami rekomendasikan."
            ctaHref="/kategori/teknologi"
            ctaLabel="Semua pilihan editor"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <SectionHeading
              eyebrow="Terbaru"
              title="Review produk paling baru"
              description="Tinjauan mendalam dari editor kami, di-update mingguan."
              ctaHref="/kategori/teknologi"
              ctaLabel="Lihat semua review"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {latest.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Newsletter variant="card" />
            <div className="rounded-2xl border border-ink-200 bg-white p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-ink-500">
                Trending sekarang
              </h3>
              <ol className="mt-4 space-y-3">
                {trending.slice(0, 5).map((r, i) => (
                  <li key={r.slug} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                      {i + 1}
                    </span>
                    <a
                      href={`/review/${r.slug}`}
                      className="line-clamp-2 text-sm font-medium text-ink-900 hover:text-brand-700"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <AdSlot slot="home-sidebar" className="min-h-[260px]" />
          </aside>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-white to-ink-50/60">
        <div className="container">
          <SectionHeading
            eyebrow="Trending"
            title="Sedang banyak dicari pembaca"
            description="Top review paling populer minggu ini berdasarkan klik dan share pembaca."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Newsletter variant="card" />
        </div>
      </section>
    </>
  );
}
