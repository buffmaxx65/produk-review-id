-- ============================================================
-- Schema Supabase untuk Produk Review ID
-- Jalankan di SQL Editor Supabase (Dashboard > SQL Editor > New).
-- ============================================================

-- 1. Enable UUID
create extension if not exists "pgcrypto";

-- 2. Subscribers (newsletter)
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

-- 3. Affiliate clicks (tracking)
create table if not exists public.affiliate_clicks (
  id bigserial primary key,
  affiliate_id text not null,
  network text not null,
  source text,
  referer text,
  user_agent text,
  ip_country text,
  created_at timestamptz not null default now()
);

create index if not exists affiliate_clicks_affiliate_idx
  on public.affiliate_clicks (affiliate_id);

create index if not exists affiliate_clicks_created_at_idx
  on public.affiliate_clicks (created_at desc);

-- 4. Page views (opsional, optional analytics)
create table if not exists public.page_views (
  id bigserial primary key,
  path text not null,
  referer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists page_views_path_idx on public.page_views (path);
create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);

-- 5. Posts (CMS opsional - kalau mau menyimpan artikel di DB selain MDX)
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  category text,
  body_mdx text,
  cover text,
  rating numeric(2,1),
  pros jsonb default '[]'::jsonb,
  cons jsonb default '[]'::jsonb,
  specs jsonb default '[]'::jsonb,
  faq jsonb default '[]'::jsonb,
  primary_affiliate_id text,
  secondary_affiliate_ids text[] default '{}',
  status text not null default 'draft', -- draft | published
  author text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_idx on public.posts (status);
create index if not exists posts_category_idx on public.posts (category);
create index if not exists posts_published_at_idx on public.posts (published_at desc);

-- 6. Row Level Security
alter table public.subscribers enable row level security;
alter table public.affiliate_clicks enable row level security;
alter table public.page_views enable row level security;
alter table public.posts enable row level security;

-- Insert publik (subscribers, clicks, page_views) hanya via service-role.
-- Service role melewati RLS otomatis. Untuk anon key kita beri SELECT minimal.

-- Public bisa baca posts published only
drop policy if exists "Allow read published posts" on public.posts;
create policy "Allow read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

-- Authenticated user (admin) full access ke posts
drop policy if exists "Authenticated full access posts" on public.posts;
create policy "Authenticated full access posts"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- Authenticated user dapat melihat data dashboard
drop policy if exists "Authenticated read clicks" on public.affiliate_clicks;
create policy "Authenticated read clicks"
  on public.affiliate_clicks for select
  to authenticated
  using (true);

drop policy if exists "Authenticated read subscribers" on public.subscribers;
create policy "Authenticated read subscribers"
  on public.subscribers for select
  to authenticated
  using (true);

-- 7. Trigger untuk updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();
