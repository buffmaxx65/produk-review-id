import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReviewCard } from "@/components/ReviewCard";
import { Newsletter } from "@/components/Newsletter";
import { categories, getCategory } from "@/data/categories";
import { getReviewsByCategory } from "@/lib/reviews";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const cat = getCategory(params.slug);
  if (!cat) return {};
  return buildMetadata({
    title: `Review ${cat.name} terbaik`,
    description: `${cat.description} Update tiap minggu dari editor.`,
    path: `/kategori/${cat.slug}`,
  });
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const cat = getCategory(params.slug);
  if (!cat) notFound();
  const reviews = getReviewsByCategory(cat.slug);
  const Icon = cat.icon;
  const breadcrumb = [
    { name: "Kategori", href: "/kategori" },
    { name: cat.name, href: `/kategori/${cat.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumb)),
        }}
      />
      <section className="border-b border-ink-200 bg-paper-100">
        <div className="container py-12 sm:py-16">
          <Breadcrumb items={breadcrumb} />
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-ink-500">
                <span className="kicker-accent">Kategori</span>
                <span className="h-px w-8 bg-ink-300" aria-hidden />
                <span className="kicker">
                  {reviews.length} review tersedia
                </span>
              </div>
              <h1 className="mt-5 font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink-900 sm:text-[3.25rem] lg:text-[3.75rem]">
                Review{" "}
                <em className="font-serif font-medium italic text-accent">
                  {cat.name}
                </em>{" "}
                terbaik
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                {cat.description}
              </p>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <div className="ml-auto flex h-32 w-32 items-center justify-center border border-ink-300 bg-paper-200 text-ink-700">
                <Icon className="h-12 w-12" strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {reviews.length === 0 ? (
            <p className="border border-dashed border-ink-300 bg-paper-200 p-10 text-center text-ink-500">
              Belum ada review di kategori ini. Cek kembali nanti.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          )}
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
