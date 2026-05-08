import { Breadcrumb } from "@/components/Breadcrumb";
import { Mail, MessageSquare } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontak",
  description: "Hubungi tim Produk Review ID untuk kerja sama atau pertanyaan.",
  path: "/kontak",
});

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container-prose">
        <Breadcrumb items={[{ name: "Kontak" }]} />
        <h1 className="mt-6 font-serif text-3xl font-bold sm:text-4xl">
          Hubungi Kami
        </h1>
        <p className="mt-3 text-ink-700">
          Punya pertanyaan, ide kerja sama, atau minta produk untuk diuji? Kirim
          pesan ke kami.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:hello@produk-review-id.com"
            className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-white p-5 shadow-card hover:shadow-cardHover"
          >
            <Mail className="h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold text-ink-900">Email</p>
              <p className="text-sm text-ink-600">hello@produk-review-id.com</p>
            </div>
          </a>
          <a
            href="https://wa.me/6280000000000"
            target="_blank"
            rel="noopener"
            className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-white p-5 shadow-card hover:shadow-cardHover"
          >
            <MessageSquare className="h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold text-ink-900">WhatsApp</p>
              <p className="text-sm text-ink-600">+62 800 0000 0000</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
