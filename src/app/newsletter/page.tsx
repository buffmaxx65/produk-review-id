import { Breadcrumb } from "@/components/Breadcrumb";
import { Newsletter } from "@/components/Newsletter";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Newsletter",
  description:
    "Daftar newsletter Produk Review ID untuk tips, deal terbaik, dan review eksklusif tiap minggu.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <section className="section">
      <div className="container-prose">
        <Breadcrumb items={[{ name: "Newsletter" }]} />
        <Newsletter variant="card" className="mt-6" />
      </div>
    </section>
  );
}
