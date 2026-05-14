---
name: testing-produk-review-id
description: End-to-end testing for the Produk Review ID app (Next.js 14 + Supabase). Covers editorial theme rendering, affiliate click tracking, newsletter signup, admin auth, and adversarial inputs. Use when verifying UI changes, Supabase integration, or admin dashboard data after edits.
---

# Testing Produk Review ID

Next.js 14 (App Router) + Tailwind + Supabase. Public-facing review site with admin dashboard.

## Prerequisites

- Node 20+, `npm install` already done
- `.env.local` configured with Supabase vars (see Devin Secrets Needed below)
- Dev server: `PORT=3000 npx next dev` (foreground or `&` background)

## Devin Secrets Needed

If the Supabase project is already set up, these are usually saved at org or user scope:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon JWT (RLS-safe)
- `SUPABASE_SERVICE_ROLE_KEY` — server-side secret (bypasses RLS, **never expose to client**)
- `SUPABASE_ACCESS_TOKEN` — Management API PAT (only needed for running raw SQL/admin verification queries)
- `ADMIN_EMAILS` (comma-separated) — whitelist of emails allowed to access `/admin`
- Admin login password — store at `/home/ubuntu/.admin_pass` (NOT `/tmp/`, which gets wiped on restart). If missing, reset via Supabase Auth Admin API.

If any are missing, request them via the secret prompt with `should_save=true, save_scope='user'`.

## Quick App URLs

- `/` — Homepage hero + editor picks + categories + newsletter
- `/review/{slug}` — Review article (e.g. `samsung-galaxy-a55-review`, `the-ordinary-niacinamide-review`)
- `/kategori/{slug}` — Category index (`teknologi`, `kecantikan`, `kesehatan`, `rumah-tangga`, `fashion`)
- `/admin/login` — Supabase Auth email/password login
- `/admin` — Dashboard (auth required)
- `POST /api/newsletter` — `{"email": "..."}` → inserts to `subscribers`
- `GET /api/track/{affiliate_id}?source=...` — 302 redirect + inserts to `affiliate_clicks`

## Affiliate IDs (in `src/data/affiliate.config.ts`)

Format: `{product}-{network}` e.g. `samsung-a55-shopee`, `ordinary-niacinamide-shopee`, `philips-airfryer-tokopedia`, `macbook-air-m3-iboxstore`. Invalid IDs return 404 (no DB row).

## Verifying Supabase state

Raw SQL via Management API (no psql needed):

```bash
python3 - <<'PY'
import json, os, urllib.request
ref = "<PROJECT_REF>"  # extract from NEXT_PUBLIC_SUPABASE_URL
sql = "SELECT count(*) FROM subscribers; SELECT count(*) FROM affiliate_clicks;"
req = urllib.request.Request(
    f"https://api.supabase.com/v1/projects/{ref}/database/query",
    data=json.dumps({"query": sql}).encode(), method="POST",
    headers={"Authorization": f"Bearer {os.environ['SUPABASE_ACCESS_TOKEN']}",
             "Content-Type": "application/json",
             "User-Agent": "produk-review-id-test/1.0"})
print(json.loads(urllib.request.urlopen(req).read()))
PY
```

The `User-Agent` header is **required** — Cloudflare returns 403 (code 1010) without it.
Quote literals in WHERE: `WHERE table_schema = 'public'` not `WHERE table_schema = public`.

## Golden-path tests (always run these)

1. **Click affiliate**: navigate to `/review/samsung-galaxy-a55-review` → click "Cek Harga Terbaru" in VerdictBox → new tab opens to actual marketplace URL → verify `SELECT * FROM affiliate_clicks ORDER BY created_at DESC LIMIT 1` matches.
2. **Newsletter signup**: bottom newsletter form on `/` or `/review/...` → submit → success message → verify `SELECT * FROM subscribers WHERE email = ...`.
3. **Admin login**: `/admin/login` with whitelisted email + password → redirect to `/admin` → 4 stat cards show non-zero counters.

## Adversarial tests (catches regressions)

- `GET /api/track/nonexistent-xyz` → 404 + `{"error":"Link tidak ditemukan"}` (no DB row)
- `POST /api/newsletter` with `Content-Type: text/plain` body `not-json` → 400 (NOT 500)
- `POST /api/newsletter {"email":"notanemail"}` → 400 + `{"error":"Email tidak valid"}`
- Login as user **not** in `ADMIN_EMAILS` → redirect to `/admin/login?error=forbidden` + banner text "Email kamu tidak terdaftar sebagai admin."
- Duplicate newsletter email → 200 + friendly message `"Email kamu sudah terdaftar. Terima kasih!"` (NOT 500 from unique constraint)

## Responsive testing

Use Playwright with explicit viewports instead of relying on Chrome DevTools device toolbar (Ctrl+Shift+M may collide with Chromium profile menu shortcut depending on flavour):

```python
ctx = browser.new_context(viewport={"width": 375, "height": 800}, device_scale_factor=2)
# or 768x900 for tablet, 1280x800 for laptop
```

Key checkpoints at 375px:
- Hero h1 must NOT clip viewport (text-[2.25rem])
- Stats grid stays 3-col with truncated kicker labels, numbers stay 1.5rem (no 3xl overflow)
- Hero kicker rule `<span class="hidden h-px w-8 ... sm:block">` hides on mobile
- Subscribe button hidden on mobile (`hidden sm:inline-flex`); search icon always visible

## Editorial theme markers (regression alarms)

If these change, the editorial redesign may have regressed:
- Body font should be Inter; h1/h2/h3 should be Fraunces serif (check rendered text in browser).
- Background paper cream `#FBF8F3`, body ink warm `#0F0E0C`, accent sienna `#C2351A`.
- All borders are 1px hairline. Look for stray `border-2` or `shadow-card` on review components — those are AI-tells from the original design.
- VerdictBox grid: `lg:grid-cols-5` with `lg:col-span-3` (verdict) / `lg:col-span-2` (purchase block). NOT 3-col 2/1.
- InArticleCTA: `sm:grid-cols-5` with `sm:col-span-3` (copy) / `sm:col-span-2` (buttons stacked fullWidth). Buttons must NOT float right with whitespace.
- Header search icon: NOT `hidden sm:flex` (must be visible at all widths).

## Cleanup after testing

```sql
DELETE FROM subscribers WHERE email LIKE '%test%' OR email LIKE '%e2e%';
DELETE FROM affiliate_clicks WHERE source LIKE 'verdict:%' OR source IN ('adversarial', 'e2e-test');
```

Also delete any temp Supabase Auth users created for forbidden tests (`DELETE {URL}/auth/v1/admin/users/{id}` with service_role key).

## Common gotchas

- Review slugs include `-review` suffix (e.g. `samsung-galaxy-a55-review`, NOT `samsung-galaxy-a55`). Hardcoding wrong slug → 404 page from Next.js.
- `/tmp/` is wiped on VM restart — store passwords/state under `/home/ubuntu/` instead.
- Port 3000 may have stale `next-server`: `pkill -9 -f 'next-server'` before starting dev.
- Git config in Devin's env has a URL rewrite to `git-manager.devin.ai/proxy` — for pushes to non-default GitHub accounts, bypass with `GIT_CONFIG_GLOBAL=/dev/null` + inline credential helper.
- Supabase Management API runs raw SQL but requires `User-Agent` header and proper quoting in WHERE clauses.
