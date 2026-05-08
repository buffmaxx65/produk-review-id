import { requireAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function NewArtikelPage() {
  await requireAdmin();
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-ink-900">
        Artikel Baru
      </h1>
      <p className="mt-2 text-sm text-ink-600">
        Untuk performa SEO terbaik, artikel disimpan sebagai file MDX di{" "}
        <code>content/reviews/[slug].mdx</code>. Berikut template siap pakai —
        cukup salin, ubah, dan commit.
      </p>
      <pre className="mt-4 overflow-auto rounded-2xl border border-ink-200 bg-ink-900 p-5 text-xs text-ink-100">
{`---
title: "Review [Nama Produk] [Tahun]"
excerpt: "Ringkasan menarik 1-2 kalimat untuk SEO meta description."
category: "teknologi"      # teknologi | kecantikan | rumah-tangga | kesehatan | fashion
author: "Editor"
authorTitle: "Editor Senior"
date: "${new Date().toISOString().slice(0, 10)}"
cover: "https://images.unsplash.com/photo-XXXXXXX?w=1600"
productName: "Nama Produk"
brand: "Brand"
rating: 4.5
pros:
  - "Kelebihan utama 1"
  - "Kelebihan utama 2"
cons:
  - "Kekurangan 1"
bestFor:
  - "User yang butuh A"
specs:
  - { label: "Spesifikasi 1", value: "Nilai 1" }
pricing:
  primaryAffiliateId: "samsung-a55-shopee"
  secondaryAffiliateIds: ["samsung-a55-tokopedia"]
  rangeText: "Mulai dari Rp 5.999.000"
faq:
  - q: "Pertanyaan?"
    a: "Jawaban"
featured: true
---

Tulis isi artikel dalam markdown / MDX.

<InArticleCTA review={{ ... }} />  
<!-- Komponen tersedia: InArticleCTA, ProsCons, SpecsTable, ComparisonTable, AffiliateButton, AdSlot -->
`}
      </pre>
      <p className="mt-4 text-xs text-ink-500">
        Tip: Tambahkan link affiliate baru di <code>src/data/affiliate.config.ts</code>.
      </p>
    </div>
  );
}
