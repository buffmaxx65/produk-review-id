import { Breadcrumb } from "@/components/Breadcrumb";
import { CategoryGrid } from "@/components/CategoryGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Semua Kategori",
  description: "Jelajahi semua kategori review produk dari Produk Review ID.",
  path: "/kategori",
});

export default function CategoryIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <Breadcrumb items={[{ name: "Kategori" }]} />
        <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Jelajahi semua kategori
        </h1>
        <p className="mt-2 max-w-2xl text-ink-600">
          Klik kategori untuk melihat review terbaru di niche yang kamu minati.
        </p>
        <div className="mt-8">
          <CategoryGrid />
        </div>
      </div>
    </section>
  );
}
