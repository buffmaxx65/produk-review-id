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

      <section className="border-b border-ink-200 bg-paper-100">
        <div className="container py-10 sm:py-14">
          <Breadcrumb items={breadcrumb} />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-kicker text-ink-500">
            {cat ? (
              <Link
                href={`/kategori/${cat.slug}`}
                className="text-accent transition-colors hover:text-accent-dark"
              >
                {cat.name}
              </Link>
            ) : null}
            <span className="h-px w-6 bg-ink-300" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-ink-700" /> Diuji editor
            </span>
            <span className="h-px w-6 bg-ink-300" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {review.readingTimeMinutes} menit baca
            </span>
            <span className="h-px w-6 bg-ink-300" aria-hidden />
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(review.date)}
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-[2rem] font-medium leading-[1.1] tracking-tight text-ink-900 sm:text-[2.75rem] lg:text-[3.5rem]">
            {review.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-600">
            {review.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-200 pt-5 text-sm text-ink-600">
            <span>
              Oleh{" "}
              <span className="font-semibold text-ink-900">
                {review.author}
              </span>
              {review.authorTitle ? (
                <span className="text-ink-500">, {review.authorTitle}</span>
              ) : null}
            </span>
            <span className="h-px w-6 bg-ink-300" aria-hidden />
            <StarRating value={review.rating} size="md" showValue />
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <article>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-100">
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

            <h2
              id="fitur-utama"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Fitur Utama
            </h2>
            <ul className="my-4 list-disc space-y-2 pl-6 text-ink-800 marker:text-accent">
              {review.bestFor.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <h2
              id="spesifikasi"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Spesifikasi
            </h2>
            <SpecsTable specs={review.specs} />

            <InArticleCTA review={review} />

            <h2
              id="pengalaman"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Pengalaman Penggunaan
            </h2>
            <MdxContent source={review.body} />

            <AdSlot slot="article-mid" className="my-10 min-h-[120px]" />

            {review.comparison ? (
              <>
                <h2
                  id="perbandingan"
                  className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
                >
                  Perbandingan dengan Kompetitor
                </h2>
                <ComparisonTable
                  headers={review.comparison.headers}
                  rows={review.comparison.rows}
                />
              </>
            ) : null}

            <h2
              id="cocok-untuk"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Cocok untuk siapa?
            </h2>
            <div className="my-4 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-accent bg-paper-200 p-6">
                <p className="kicker-accent">Beli kalau kamu...</p>
                <ul className="mt-4 space-y-2.5 text-ink-800">
                  {review.bestFor.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {review.notFor && review.notFor.length ? (
                <div className="border-l-2 border-ink-400 bg-paper-200 p-6">
                  <p className="kicker">Skip kalau kamu...</p>
                  <ul className="mt-4 space-y-2.5 text-ink-800">
                    {review.notFor.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <h2
              id="faq"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Pertanyaan yang sering ditanyakan
            </h2>
            <FAQ items={review.faq} />

            <h2
              id="kesimpulan"
              className="mt-12 mb-4 font-serif text-3xl font-medium tracking-tight text-ink-900 scroll-mt-28 sm:text-[2.125rem]"
            >
              Kesimpulan
            </h2>
            <p className="font-serif text-xl leading-relaxed text-ink-800">
              <strong className="font-semibold text-ink-900">
                {review.productName}
              </strong>{" "}
              adalah pilihan{" "}
              {review.rating >= 4.5
                ? "sangat direkomendasikan"
                : review.rating >= 4
                  ? "yang layak dibeli"
                  : "yang layak dipertimbangkan"}{" "}
              di kelasnya. Skor akhir editor:{" "}
              <strong className="font-semibold text-accent">
                {review.rating.toFixed(1)} / 5
              </strong>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
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
              <div className="mt-20 border-t border-ink-200 pt-10">
                <p className="kicker-accent">Lanjut baca</p>
                <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink-900 sm:text-[2.125rem]">
                  Artikel terkait
                </h2>
                <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2">
                  {related.slice(0, 4).map((r) => (
                    <ReviewCard key={r.slug} review={r} />
                  ))}
                </div>
                <Link
                  href={cat ? `/kategori/${cat.slug}` : "/"}
                  className="group mt-8 inline-flex items-center gap-1 text-sm font-medium text-ink-900 underline-offset-4 hover:underline hover:decoration-accent"
                >
                  Lihat semua di {cat?.name ?? "kategori"}{" "}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ) : null}
          </article>

          <div className="lg:sticky lg:top-24 lg:self-start">
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
