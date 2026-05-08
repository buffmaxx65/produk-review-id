import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StarRating } from "@/components/StarRating";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Newsletter } from "@/components/Newsletter";
import { AdSlot } from "@/components/AdSlot";
import { VerdictBox } from "@/components/review/VerdictBox";
import { ProsCons } from "@/components/review/ProsCons";
import { SpecsTable } from "@/components/review/SpecsTable";
import { ComparisonTable } from "@/components/review/ComparisonTable";
import { FAQ } from "@/components/review/FAQ";
import { InArticleCTA } from "@/components/review/InArticleCTA";
import { SidebarCTA } from "@/components/review/SidebarCTA";
import { MdxContent } from "@/components/review/MdxContent";
import { ReviewCard } from "@/components/ReviewCard";
import {
  getAllReviews,
  getRelatedReviews,
  getReviewBySlug,
} from "@/lib/reviews";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/utils";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  reviewJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return getAllReviews().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const r = getReviewBySlug(params.slug);
  if (!r) return {};
  return buildMetadata({
    title: r.title,
    description: r.excerpt,
    path: `/review/${r.slug}`,
    image: r.cover,
    type: "article",
    publishedTime: r.date,
    modifiedTime: r.updated ?? r.date,
    authors: [r.author],
  });
}

export default function ReviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const review = getReviewBySlug(params.slug);
  if (!review) notFound();
  const cat = getCategory(review.category);
  const related = getRelatedReviews(review.slug, 4);

  const breadcrumb = [
    { name: "Review", href: "/kategori" },
    cat
      ? { name: cat.name, href: `/kategori/${cat.slug}` }
      : { name: "Lainnya" },
    { name: review.productName },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewJsonLd(review)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(review)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumb)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(review.faq)),
        }}
      />

      <section className="border-b border-ink-200 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container py-8 sm:py-12">
          <Breadcrumb items={breadcrumb} />
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            {cat ? (
              <Link
                href={`/kategori/${cat.slug}`}
                className="badge badge-brand"
              >
                {cat.name}
              </Link>
            ) : null}
            <span className="badge">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Diuji
              editor
            </span>
            <span className="badge">
              <Clock className="h-3.5 w-3.5" />
              {review.readingTimeMinutes} menit baca
            </span>
            <span className="badge">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(review.date)}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            {review.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-ink-700">
            {review.excerpt}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-600">
            <span>
              Oleh{" "}
              <span className="font-semibold text-ink-900">
                {review.author}
              </span>
              {review.authorTitle ? `, ${review.authorTitle}` : null}
            </span>
            <span className="text-ink-300">•</span>
            <StarRating value={review.rating} size="md" showValue />
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="container grid gap-10 lg:grid-cols-[1fr_320px]">
          <article>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-100 shadow-card">
              <Image
                src={review.cover}
                alt={review.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>

            <VerdictBox review={review} />

            <ProsCons pros={review.pros} cons={review.cons} />

            <h2 id="fitur-utama" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Fitur Utama
            </h2>
            <ul className="my-4 list-disc space-y-2 pl-6 text-ink-800">
              {review.bestFor.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <h2 id="spesifikasi" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Spesifikasi
            </h2>
            <SpecsTable specs={review.specs} />

            <InArticleCTA review={review} />

            <h2 id="pengalaman" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Pengalaman Penggunaan
            </h2>
            <MdxContent source={review.body} />

            <AdSlot slot="article-mid" className="my-8 min-h-[120px]" />

            {review.comparison ? (
              <>
                <h2 id="perbandingan" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
                  Perbandingan dengan Kompetitor
                </h2>
                <ComparisonTable
                  headers={review.comparison.headers}
                  rows={review.comparison.rows}
                />
              </>
            ) : null}

            <h2 id="cocok-untuk" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Cocok untuk siapa?
            </h2>
            <div className="my-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <p className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                  Beli kalau kamu...
                </p>
                <ul className="mt-3 space-y-2 text-ink-800">
                  {review.bestFor.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {review.notFor && review.notFor.length ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                  <p className="text-sm font-bold uppercase tracking-wider text-rose-800">
                    Skip kalau kamu...
                  </p>
                  <ul className="mt-3 space-y-2 text-ink-800">
                    {review.notFor.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <h2 id="faq" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Pertanyaan yang sering ditanyakan
            </h2>
            <FAQ items={review.faq} />

            <h2 id="kesimpulan" className="mt-10 mb-3 text-2xl font-bold sm:text-3xl">
              Kesimpulan
            </h2>
            <p className="text-lg text-ink-800">
              <strong>{review.productName}</strong> adalah pilihan{" "}
              {review.rating >= 4.5
                ? "sangat direkomendasikan"
                : review.rating >= 4
                  ? "yang layak dibeli"
                  : "yang layak dipertimbangkan"}{" "}
              di kelasnya. Skor akhir editor:{" "}
              <strong>{review.rating.toFixed(1)} / 5</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AffiliateButton
                id={review.pricing.primaryAffiliateId}
                variant="cta"
                size="lg"
                showPrice
                source={`conclusion:${review.slug}`}
                label="Beli Sekarang"
              />
              {review.pricing.secondaryAffiliateIds?.[0] ? (
                <AffiliateButton
                  id={review.pricing.secondaryAffiliateIds[0]}
                  variant="outline"
                  size="lg"
                  source={`conclusion:${review.slug}`}
                />
              ) : null}
            </div>

            {related.length > 0 ? (
              <div className="mt-16">
                <h2 className="mb-6 text-2xl font-bold sm:text-3xl">
                  Artikel Terkait
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {related.slice(0, 4).map((r) => (
                    <ReviewCard key={r.slug} review={r} />
                  ))}
                </div>
                <Link
                  href={cat ? `/kategori/${cat.slug}` : "/"}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Lihat semua di {cat?.name ?? "kategori"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </article>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <SidebarCTA review={review} related={related.slice(0, 3)} />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <Newsletter />
        </div>
      </section>
    </>
  );
}
