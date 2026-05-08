# Produk Review ID

Website review produk profesional, gaya **Wirecutter / TechRadar / Healthline / NerdWallet**.
Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase**.
Siap deploy ke Vercel dalam 1 klik.

> Review jujur, rekomendasi terbaik. Fokus: SEO friendly, konversi affiliate
> tinggi, dan trust-building yang nyata.

---

## Daftar isi

1. [Fitur](#fitur)
2. [Stack](#stack)
3. [Struktur folder](#struktur-folder)
4. [Setup lokal](#setup-lokal)
5. [Konfigurasi Supabase](#konfigurasi-supabase)
6. [Menambahkan artikel review](#menambahkan-artikel-review)
7. [Mengelola link affiliate](#mengelola-link-affiliate)
8. [Admin dashboard](#admin-dashboard)
9. [Deploy ke Vercel](#deploy-ke-vercel)
10. [Strategi scaling traffic & SEO](#strategi-scaling-traffic--seo)
11. [Roadmap](#roadmap)

---

## Fitur

### Frontend
- ✦ Halaman utama: hero, kategori, editor's pick, terbaru, trending, newsletter
- ✦ Halaman kategori dinamis (5 kategori out-of-the-box)
- ✦ Halaman artikel review dengan template lengkap:
  - Verdict box (rating + CTA harga)
  - Pros & Cons
  - Spesifikasi
  - Pengalaman penggunaan (long-form MDX)
  - Tabel perbandingan kompetitor
  - "Cocok untuk siapa"
  - FAQ accordion (dengan FAQPage schema)
  - In-article CTA banner
  - Sticky sidebar dengan affiliate CTA + rekomendasi
  - Artikel terkait
- ✦ Halaman pencarian (`/cari?q=`)
- ✦ Halaman statis: Tentang, Kontak, Disclosure, Privacy
- ✦ Newsletter capture (Supabase + dev fallback)
- ✦ Slot Google AdSense (header, sidebar, in-article, footer)
- ✦ Mobile-first, dark-text-on-light, premium look

### SEO
- ✦ JSON-LD: Review, Product, Article, Organization, WebSite, BreadcrumbList, FAQPage
- ✦ Meta dinamis (title, description, OG, Twitter Card) per halaman
- ✦ Sitemap dinamis (`/sitemap.xml`) auto-generated dari MDX
- ✦ `robots.txt` dengan disallow `/admin` & `/api/track/`
- ✦ Breadcrumb visible + schema
- ✦ Heading rapi (1 H1, struktur H2/H3)
- ✦ Internal linking otomatis "Artikel Terkait"
- ✦ ISR + image optimization Next.js
- ✦ font-display: swap

### Affiliate
- ✦ Konfigurasi terpusat (`src/data/affiliate.config.ts`)
- ✦ Komponen `<AffiliateButton id="..." />`
- ✦ Click-tracking via `/api/track/[id]` → Supabase
- ✦ Atribut `rel="nofollow sponsored"` otomatis
- ✦ Harga ditampilkan di tombol (showPrice)
- ✦ Source attribution (verdict / sidebar / in-article / conclusion)

### Admin
- ✦ Login Supabase (email/password) + whitelist `ADMIN_EMAILS`
- ✦ Dashboard ringkasan klik & subscriber
- ✦ Daftar artikel (dari MDX + Supabase posts)
- ✦ Manajemen affiliate links (klik per ID + test redirect)
- ✦ Daftar subscriber newsletter

---

## Stack

| Layer    | Tool |
|----------|------|
| Framework | Next.js 14 (App Router, RSC) |
| Bahasa   | TypeScript strict |
| Styling  | Tailwind CSS 3 (custom design tokens) |
| Konten   | MDX file-based (`gray-matter` + `next-mdx-remote`) |
| Backend  | Supabase (Postgres + Auth) |
| Deploy   | Vercel |
| Analytics| (opsional) Google Analytics, AdSense |

---

## Struktur folder

```
produk-review-id/
├── content/
│   └── reviews/                  # 5 artikel MDX siap publish
│       ├── samsung-galaxy-a55-review.mdx
│       ├── the-ordinary-niacinamide-review.mdx
│       ├── philips-airfryer-hd9252-review.mdx
│       ├── blackmores-bio-c-review.mdx
│       ├── adidas-ultraboost-22-review.mdx
│       └── macbook-air-m3-review.mdx
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   └── og-default.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + JSON-LD organization/website
│   │   ├── page.tsx              # Home
│   │   ├── globals.css
│   │   ├── sitemap.ts            # /sitemap.xml
│   │   ├── robots.ts             # /robots.txt
│   │   ├── not-found.tsx
│   │   ├── kategori/
│   │   │   ├── page.tsx          # /kategori
│   │   │   └── [slug]/page.tsx   # /kategori/teknologi etc
│   │   ├── review/[slug]/page.tsx
│   │   ├── tentang/page.tsx
│   │   ├── kontak/page.tsx
│   │   ├── disclosure/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── newsletter/page.tsx
│   │   ├── cari/page.tsx
│   │   ├── admin/                # Dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx          # Stats
│   │   │   ├── login/{page,login-form}.tsx
│   │   │   ├── artikel/page.tsx
│   │   │   ├── artikel/baru/page.tsx
│   │   │   ├── affiliate/page.tsx
│   │   │   └── newsletter/page.tsx
│   │   └── api/
│   │       ├── track/[id]/route.ts
│   │       ├── newsletter/route.ts
│   │       └── admin/logout/route.ts
│   ├── components/
│   │   ├── Header.tsx · Footer.tsx · Hero.tsx
│   │   ├── ReviewCard.tsx · CategoryGrid.tsx · SectionHeading.tsx
│   │   ├── Newsletter.tsx · AdSlot.tsx · StarRating.tsx
│   │   ├── AffiliateButton.tsx · Breadcrumb.tsx
│   │   └── review/
│   │       ├── VerdictBox.tsx
│   │       ├── ProsCons.tsx
│   │       ├── SpecsTable.tsx
│   │       ├── ComparisonTable.tsx
│   │       ├── FAQ.tsx
│   │       ├── InArticleCTA.tsx
│   │       ├── SidebarCTA.tsx
│   │       └── MdxContent.tsx
│   ├── data/
│   │   ├── affiliate.config.ts   # Konfigurasi link affiliate
│   │   └── categories.ts
│   └── lib/
│       ├── site.ts               # Site config + nav
│       ├── reviews.ts            # Reader MDX
│       ├── seo.ts                # JSON-LD + buildMetadata
│       ├── supabase.ts           # Browser/server/admin client
│       ├── admin.ts              # requireAdmin
│       └── utils.ts
├── supabase/
│   └── schema.sql                # Migration siap run di Supabase
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
├── package.json
└── .env.example
```

---

## Setup lokal

Persyaratan: Node.js ≥ 18.17.

```bash
# 1. Install dependencies
npm install

# 2. Buat file env
cp .env.example .env.local
# (isi NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)

# 3. Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) → website live.
Tanpa Supabase, website tetap jalan dalam **mode demo**:
- Newsletter form muncul "dev mode" sukses tanpa simpan.
- Click tracking di-skip (langsung redirect).
- Admin dashboard menampilkan banner "demo".

---

## Konfigurasi Supabase

1. Buat project gratis di <https://supabase.com>.
2. Salin **Project URL** dan **anon key** ke `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
   SUPABASE_SERVICE_ROLE_KEY=ey...   # server-only, untuk insert tracking
   ```
3. **Project Settings → API**, salin `service_role` key (jangan bocorkan).
4. **SQL Editor**, jalankan isi file [`supabase/schema.sql`](supabase/schema.sql).
   Akan dibuat tabel:
   - `subscribers` — newsletter
   - `affiliate_clicks` — tracking klik
   - `page_views` — opsional
   - `posts` — CMS opsional (kalau mau menambah artikel via DB)
5. **Authentication → Users → Add user**: tambahkan akun email/password
   untuk login admin.
6. Set `.env.local` `ADMIN_EMAILS=email-kamu@gmail.com,timeditor@gmail.com`.

---

## Menambahkan artikel review

Buat file baru di `content/reviews/[slug].mdx`. Gunakan template ini:

```mdx
---
title: "Review [Produk] [Tahun]: Headline yang Menjual"
excerpt: "Ringkasan menarik 1-2 kalimat — ini akan jadi meta description."
category: "teknologi"        # teknologi | kecantikan | rumah-tangga | kesehatan | fashion
author: "Nama Editor"
authorTitle: "Editor Senior"
date: "2026-05-08"
cover: "https://images.unsplash.com/photo-XXXX?w=1600"
productName: "Nama Produk"
brand: "Brand"
rating: 4.5                  # 0..5
pros:
  - "Kelebihan utama 1"
  - "Kelebihan utama 2"
cons:
  - "Kekurangan 1"
bestFor:
  - "User yang butuh A"
notFor:
  - "User yang butuh X"
specs:
  - { label: "Layar", value: "6.6\" AMOLED 120Hz" }
pricing:
  primaryAffiliateId: "samsung-a55-shopee"
  secondaryAffiliateIds: ["samsung-a55-tokopedia"]
  rangeText: "Mulai dari Rp 5.999.000"
comparison:
  headers: ["Produk", "Harga", "Layar"]
  rows:
    - ["Produk A", "Rp 5.000.000", "AMOLED"]
faq:
  - q: "Apakah ...?"
    a: "Ya, ..."
tags: ["smartphone", "samsung"]
featured: true
trending: true
---

Tulis isi artikel dalam markdown / MDX di sini.

<InArticleCTA review={...} />
```

Komponen yang tersedia di MDX:
- `<AffiliateButton id="..." variant="cta" showPrice />`
- `<InArticleCTA review={{ slug, productName, pricing }} />`
- `<ProsCons pros={[...]} cons={[...]} />`
- `<SpecsTable specs={[...]} />`
- `<ComparisonTable headers={[...]} rows={[...]} />`
- `<AdSlot slot="..." />`

---

## Mengelola link affiliate

Buka [`src/data/affiliate.config.ts`](src/data/affiliate.config.ts):

```ts
"samsung-a55-shopee": {
  id: "samsung-a55-shopee",
  label: "Cek Harga di Shopee",
  network: "shopee",
  url: "https://shopee.co.id/your-affiliate-link?ref=YOURID",
  price: "Rp 5.999.000",
},
```

Aturan:
- **ID unik** dan **stable** (tidak boleh diubah setelah artikel publish).
- Pakai **link tracking dari masing-masing program afiliasi**, bukan link
  produk biasa.
- Update `price` setiap mengubah harga (akan tampil di tombol).

Komponen `<AffiliateButton id="..." />` akan otomatis:
1. Render tombol dengan label & harga
2. Mengarahkan klik ke `/api/track/<id>`
3. Server log klik ke Supabase (asynchronous, non-blocking)
4. Redirect 302 ke `url` asli
5. `target="_blank" rel="nofollow sponsored noopener"`

---

## Admin dashboard

Buka `/admin` setelah Supabase setup:

- **Login**: `/admin/login` — pakai akun yang dibuat di Supabase Auth.
- **Whitelist**: hanya email di env `ADMIN_EMAILS` yang bisa masuk.
- **Stats**: total klik, klik 7 hari, subscribers, top affiliate.
- **Artikel**: list MDX (read-only) + tombol "Artikel Baru" yang
  menampilkan template MDX siap copy.
- **Affiliate**: list semua link + jumlah klik per ID + test redirect.
- **Newsletter**: list 200 subscriber terbaru.

> Mode tanpa Supabase: dashboard tetap bisa diakses dengan banner
> "Mode Demo" untuk preview UI.

---

## Deploy ke Vercel

### Cara cepat (1-click)

1. Push project ke GitHub:
   ```bash
   gh repo create produk-review-id --public --source=. --push
   ```
2. Buka <https://vercel.com/new> → Import GitHub repo.
3. **Environment Variables**: tambahkan semua dari `.env.example`.
4. **Deploy**. Selesai.

### Custom domain

- Vercel → Settings → Domains → Add → `your-domain.com`
- Pasang record DNS (CNAME/A) sesuai instruksi Vercel.
- Update `NEXT_PUBLIC_SITE_URL` di env Vercel ke domain final.
- Re-deploy untuk sitemap & metadata terbarui.

### Performa

- Image optimization: aktif by default (Next/Image).
- ISR: artikel statis, revalidate per push.
- Edge Functions: `/api/track/[id]` ringan & cepat (~50 ms).
- Lighthouse target: **95+ Performance / 100 SEO / 100 Best Practices**.

---

## Strategi scaling traffic & SEO

### Quick wins (1-3 bulan pertama)

1. **Submit sitemap** ke Google Search Console & Bing Webmaster.
2. **Schema markup** sudah aktif → cek di Rich Results Test.
3. **Internal linking**: tiap artikel review otomatis tampil "Artikel
   Terkait". Tambahkan **manual contextual link** di body MDX ke artikel
   lain.
4. **Cluster konten**: untuk tiap kategori, target **10 artikel pillar**
   + **30 artikel pendukung**. Contoh cluster "Air Fryer":
   - Pillar: "Best Air Fryer Indonesia 2026"
   - Supporting: per-product reviews, comparison Air Fryer A vs B,
     "Resep air fryer untuk pemula", "Tips bersihkan air fryer".

### Mid-term (3-6 bulan)

5. **Long-tail keyword targeting**: gunakan Ahrefs / Ubersuggest untuk
   cari keyword dengan volume 100-1000/bulan dan KD <30.
6. **Update content**: review lama di-update tiap 3-6 bulan dengan
   field `updated:` di frontmatter (otomatis muncul di JSON-LD).
7. **EEAT signals**: tambahkan `author`, `authorTitle`, dan halaman
   `/penulis/[slug]` (roadmap).
8. **Backlink building**: outreach ke blog niche, forum (Kaskus,
   FemaleDaily), submission ke direktori review.
9. **Image SEO**: pakai gambar produk asli (bukan stock), filename
   descriptive, alt text deskriptif.

### Long-term (6-12 bulan)

10. **Programmatic SEO**: bangun halaman dinamis untuk
    "produk-X-vs-produk-Y" (template comparison auto-generated).
11. **Newsletter**: kirim weekly digest → traffic balik konsisten →
    sinyal positif untuk Google.
12. **YouTube channel** companion: video review pendek, embed di
    artikel → boost dwell time.
13. **Web Stories** (AMP) untuk produk trending → traffic dari
    Google Discover.
14. **A/B test CTA position**: gunakan data klik dari Supabase untuk
    menguji penempatan tombol affiliate optimal.

### Conversion optimization (CRO)

- **Sticky sidebar CTA** sudah aktif → +15-25% klik.
- **Banner in-article** di tengah artikel → +10-15%.
- **CTA dengan harga** (showPrice) → +20-30% klik vs tanpa harga.
- **Multiple marketplace** di sidebar → +30-40% pembeli yang loyal
  ke marketplace tertentu.
- **Urgency** ("Penawaran terbaik hari ini") sudah ada di
  `<InArticleCTA />`.

### Monetisasi tambahan

- **AdSense** — set `NEXT_PUBLIC_ADSENSE_CLIENT` di env. Slot sudah
  dipasang otomatis.
- **Display ads via Mediavine / Ezoic** (setelah traffic 50K/bulan).
- **Sponsored review** — buat halaman `/kerja-sama` (roadmap).
- **Email marketing** — sync subscribers ke ConvertKit / Mailchimp.

---

## Roadmap

- [ ] Komentar Disqus / Giscus
- [ ] Bookmarking (signed-in users)
- [ ] Multi-language (id/en) via `next-intl`
- [ ] Programmatic comparison pages (`/vs/produk-a-vs-produk-b`)
- [ ] OneSignal push notification
- [ ] Penulis page (`/penulis/[slug]`) — EEAT
- [ ] Reading list & save for later
- [ ] AI-powered FAQ generation

---

## Lisensi

MIT — gunakan untuk apa saja, komersial atau pribadi.

Dibuat dengan ☕ + ❤ untuk komunitas affiliate marketer Indonesia.
