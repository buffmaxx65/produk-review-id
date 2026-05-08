import { Breadcrumb } from "@/components/Breadcrumb";
import { Newsletter } from "@/components/Newsletter";
import { ShieldCheck, Users, Award, BookOpen } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description:
    "Produk Review ID adalah tim editor independen yang menguji ratusan produk untuk memberikan rekomendasi terbaik.",
  path: "/tentang",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Independen",
    desc: "Kami tidak menerima bayaran untuk review positif. Semua opini editor.",
  },
  {
    icon: Users,
    title: "Tim Berpengalaman",
    desc: "Editor kami punya 5+ tahun pengalaman di industri masing-masing.",
  },
  {
    icon: Award,
    title: "Pengujian Nyata",
    desc: "Setiap produk diuji minimal 30 hari sebelum direkomendasikan.",
  },
  {
    icon: BookOpen,
    title: "Transparan",
    desc: "Kami menjelaskan metodologi dan disclosure di setiap artikel.",
  },
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <Breadcrumb items={[{ name: "Tentang" }]} />
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
          Tentang Produk Review ID
        </h1>
        <p className="mt-4 text-lg text-ink-700">
          Kami adalah tim editor independen Indonesia yang menguji produk
          teknologi, kecantikan, kesehatan, rumah tangga, dan fashion. Misi kami
          sederhana: bantu pembaca menemukan produk yang benar-benar layak
          dibeli, tanpa hype dan tanpa bias.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink-900">
                {v.title}
              </h3>
              <p className="mt-1 text-sm text-ink-600">{v.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-ink-900">
          Bagaimana kami menghasilkan uang?
        </h2>
        <p className="mt-3 text-ink-700">
          Sebagai bagian dari beberapa program afiliasi (Shopee, Tokopedia,
          Lazada, dan lainnya), kami mendapatkan komisi kecil setiap pembaca
          membeli produk melalui link kami — tanpa tambahan biaya untukmu.
          Komisi ini tidak mempengaruhi rating atau opini editor. Jika sebuah
          produk tidak kami rekomendasikan, kami akan jujur menyatakannya.
        </p>

        <div className="mt-12">
          <Newsletter variant="card" />
        </div>
      </div>
    </section>
  );
}
