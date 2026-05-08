import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
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
      <section className="bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container py-10 sm:py-14">
          <Breadcrumb items={breadcrumb} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span
              className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white shadow-sm`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
                Review {cat.name} terbaik
              </h1>
              <p className="mt-2 max-w-2xl text-ink-600">{cat.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title={`${reviews.length} review tersedia`}
            description="Diurutkan dari yang terbaru."
          />
          {reviews.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-ink-300 bg-ink-50 p-10 text-center text-ink-500">
              Belum ada review di kategori ini. Cek kembali nanti.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          )}
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
