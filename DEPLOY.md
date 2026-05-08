# Deploy Produk Review ID

Panduan singkat untuk publish website ke GitHub + Vercel + Supabase.

---

## 1. Push ke GitHub (3 menit)

Repository sudah di-init dan di-commit secara lokal. Jalankan dari folder
project:

```bash
# Buat repo baru di GitHub (publik). Butuh GitHub CLI (gh).
gh repo create wendysdroid/produk-review-id --public --source=. --push

# Atau manual (kalau tidak pakai gh):
# 1) Buat repo kosong di https://github.com/new (nama: produk-review-id)
# 2) Lalu jalankan:
git remote add origin https://github.com/wendysdroid/produk-review-id.git
git branch -M main
git push -u origin main
```

> Branch saat ini: `devin/1778236309-product-review-website`. Saya pakai
> branch ini agar tidak push langsung ke `main`. Setelah push, kamu bisa
> merge ke `main` atau langsung rename branch ini menjadi `main`:
>
> ```bash
> git branch -M main
> git push -u origin main
> ```

---

## 2. Setup Supabase (5 menit)

1. Buat project gratis di <https://supabase.com>.
2. Buka **SQL Editor** → paste isi `supabase/schema.sql` → **Run**.
3. **Authentication → Users → Add user** untuk akun admin
   (email + password).
4. **Project Settings → API**, salin:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (rahasia, server-only)

---

## 3. Deploy ke Vercel (3 menit)

### Opsi A — 1-click (paling cepat)

1. Buka <https://vercel.com/new>.
2. Pilih **Import** dari repo `wendysdroid/produk-review-id`.
3. Tambahkan **Environment Variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ey...
   SUPABASE_SERVICE_ROLE_KEY=ey...
   ADMIN_EMAILS=anisusann@gmail.com
   NEXT_PUBLIC_SITE_URL=https://produk-review-id.vercel.app
   # opsional:
   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxx
   ```
4. **Deploy**. Tunggu ±2 menit. Selesai.

### Opsi B — via CLI

```bash
npm i -g vercel
vercel link            # link folder ini ke project Vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ADMIN_EMAILS production
vercel --prod
```

---

## 4. Custom domain (opsional)

1. Vercel → **Settings → Domains → Add** → `your-domain.com`
2. Pasang record DNS (CNAME `cname.vercel-dns.com` atau A `76.76.21.21`).
3. Update env `NEXT_PUBLIC_SITE_URL=https://your-domain.com` lalu
   re-deploy untuk meta-tag, sitemap, & canonical URL ikut update.

---

## 5. Verifikasi setelah deploy

```bash
# Sitemap
curl -I https://your-domain.com/sitemap.xml

# Robots
curl https://your-domain.com/robots.txt

# Track endpoint (cek redirect 302)
curl -I https://your-domain.com/api/track/samsung-a55-shopee
```

Submit ke Google:
- <https://search.google.com/search-console> → Add property
- Submit sitemap: `https://your-domain.com/sitemap.xml`
- Test schema: <https://search.google.com/test/rich-results>

---

## 6. Konten setelah deploy

- Tambah/edit artikel → buka `content/reviews/<slug>.mdx` → push commit
  → Vercel auto-deploy + sitemap auto-update.
- Tambah link affiliate → buka `src/data/affiliate.config.ts` →
  push commit.
- Login admin → `https://your-domain.com/admin/login` (pakai user
  Supabase yang dibuat di langkah 2).

Selamat — website kamu siap menerima traffic dan menghasilkan komisi
affiliate. Lihat README.md → bagian **Strategi scaling traffic & SEO**
untuk langkah selanjutnya.
