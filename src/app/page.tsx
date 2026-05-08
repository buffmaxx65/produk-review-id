import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        <h1 className="font-serif text-3xl font-medium">Belum ada review</h1>
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

      <section id="editor-pick" className="section bg-paper-200">
        <div className="container">
          <SectionHeading
            eyebrow="Editor's Pick"
            title="Pilihan terbaik dari editor kami"
            description="Setelah ratusan jam pengujian, ini adalah produk yang paling kami rekomendasikan."
            ctaHref="/kategori/teknologi"
            ctaLabel="Semua pilihan editor"
          />
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Terbaru"
              title="Review produk paling baru"
              description="Tinjauan mendalam dari editor kami, di-update mingguan."
              ctaHref="/kategori/teknologi"
              ctaLabel="Lihat semua review"
            />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {latest.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          </div>

          <aside className="space-y-10">
            <Newsletter variant="compact" />
            <div className="border-t border-ink-200 pt-6">
              <p className="kicker-accent">Trending sekarang</p>
              <ol className="mt-5 space-y-5">
                {trending.slice(0, 5).map((r, i) => (
                  <li key={r.slug} className="flex gap-4">
                    <span className="font-serif text-2xl font-medium italic leading-none text-accent tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Link
                      href={`/review/${r.slug}`}
                      className="line-clamp-3 text-[15px] font-medium leading-snug text-ink-900 underline-offset-4 hover:underline hover:decoration-accent"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            <AdSlot slot="home-sidebar" className="min-h-[260px]" />
          </aside>
        </div>
      </section>

      <section className="section bg-paper-200">
        <div className="container">
          <SectionHeading
            eyebrow="Trending"
            title="Sedang banyak dicari pembaca"
            description="Top review paling populer minggu ini berdasarkan klik dan share pembaca."
          />
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {trending.map((r) => (
              <ReviewCard key={r.slug} review={r} />
            ))}
          </div>
          <div className="mt-12 flex justify-center border-t border-ink-200 pt-8">
            <Link
              href="/kategori/teknologi"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:underline hover:decoration-accent"
            >
              Telusuri semua review{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <Newsletter variant="card" />
        </div>
      </section>
    </>
  );
}
